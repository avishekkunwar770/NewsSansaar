import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/database.js';

// Login
export const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!password || (!username && !email)) {
            return res.status(400).json({
                success: false,
                error: 'Username/email and password are required'
            });
        }
        
        // Check admin login
        let sql = 'SELECT * FROM adminlogin WHERE username = ? OR email = ?';
        let users = await query(sql, [username || email, email || username]);
        
        // If not found in admin, check staff
        if (users.length === 0) {
            sql = 'SELECT * FROM staffLoginCredential WHERE email = ?';
            users = await query(sql, [email || username]);
        }
        
        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
        
        const user = users[0];
        
        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username || user.email,
                role: user.role || 'staff'
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                user: {
                    id: user.id,
                    username: user.username || user.name,
                    email: user.email,
                    role: user.role || 'staff'
                }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Login failed'
        });
    }
};

// Register (admin only - add middleware later)
export const register = async (req, res) => {
    try {
        const { username, email, password, role = 'staff' } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Username, email, and password are required'
            });
        }
        
        // Check if user exists
        const existingUser = await query(
            'SELECT * FROM adminlogin WHERE username = ? OR email = ?',
            [username, email]
        );
        
        if (existingUser.length > 0) {
            return res.status(409).json({
                success: false,
                error: 'User already exists'
            });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert user
        const sql = `
            INSERT INTO adminlogin (username, email, password, role)
            VALUES (?, ?, ?, ?)
        `;
        
        const result = await query(sql, [username, email, hashedPassword, role]);
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                id: result.insertId,
                username,
                email,
                role
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            error: 'Registration failed'
        });
    }
};

// Verify token
export const verifyToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'No token provided'
            });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        res.json({
            success: true,
            data: decoded
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            error: 'Invalid token'
        });
    }
};
