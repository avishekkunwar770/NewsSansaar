// Update admin passwords to known values
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function updatePasswords() {
    let connection;
    
    try {
        console.log('🔐 Updating admin passwords...\n');
        
        const password = (process.env.DB_PASSWORD || '').replace(/^["']|["']$/g, '');
        
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || 'root',
            password: password,
            database: process.env.DB_NAME || 'nepnews'
        });
        
        console.log('✅ Connected to database\n');
        
        // Hash passwords
        const adminPassword = await bcrypt.hash('admin123', 10);
        const staffPassword = await bcrypt.hash('staff123', 10);
        
        // Update admin users
        await connection.query(
            'UPDATE adminlogin SET password = ? WHERE username = ?',
            [adminPassword, 'admin']
        );
        console.log('✅ Updated admin password');
        
        await connection.query(
            'UPDATE adminlogin SET password = ? WHERE username = ?',
            [adminPassword, 'editor']
        );
        console.log('✅ Updated editor password');
        
        // Update staff users
        await connection.query(
            'UPDATE staffLoginCredential SET password = ? WHERE email = ?',
            [staffPassword, 'staff@nepnews.com']
        );
        console.log('✅ Updated staff password\n');
        
        console.log('🎉 All passwords updated successfully!\n');
        console.log('Login Credentials:');
        console.log('  Admin:  admin / admin123');
        console.log('  Editor: editor / admin123');
        console.log('  Staff:  staff@nepnews.com / staff123\n');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

updatePasswords();
