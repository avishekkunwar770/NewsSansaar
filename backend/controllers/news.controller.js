import { query } from '../config/database.js';

// Get all news (with optional filters)
export const getAllNews = async (req, res) => {
    try {
        const status = req.query.status || 'published';
        const limit = parseInt(req.query.limit) || 50;
        const offset = parseInt(req.query.offset) || 0;
        
        let sql;
        let params;
        
        if (status === 'all') {
            sql = `
                SELECT id, title, description, date, category, thumbnail, admin, status, views
                FROM news
                ORDER BY date DESC
                LIMIT ? OFFSET ?
            `;
            params = [limit, offset];
        } else {
            sql = `
                SELECT id, title, description, date, category, thumbnail, admin, status, views
                FROM news
                WHERE status = ?
                ORDER BY date DESC
                LIMIT ? OFFSET ?
            `;
            params = [status, limit, offset];
        }
        
        const news = await query(sql, params);
        
        res.json({
            success: true,
            count: news.length,
            data: news
        });
    } catch (error) {
        console.error('Get all news error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch news'
        });
    }
};

// Get latest news
export const getLatestNews = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 20;
        
        const sql = `
            SELECT id, title, description, date, category, thumbnail, admin, status, views
            FROM news
            WHERE status = 'published'
            ORDER BY date DESC
            LIMIT ?
        `;
        
        const news = await query(sql, [limit]);
        
        res.json({
            success: true,
            count: news.length,
            data: news
        });
    } catch (error) {
        console.error('Get latest news error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch latest news'
        });
    }
};

// Get news by ID
export const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const sql = `
            SELECT id, title, description, date, category, thumbnail, admin, status, views
            FROM news
            WHERE id = ?
        `;
        
        const news = await query(sql, [id]);
        
        if (news.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'News not found'
            });
        }
        
        res.json({
            success: true,
            data: news[0]
        });
    } catch (error) {
        console.error('Get news by ID error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch news'
        });
    }
};

// Get news by category
export const getNewsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const status = req.query.status || 'published';
        const limit = parseInt(req.query.limit) || 50;
        
        const sql = `
            SELECT id, title, description, date, category, thumbnail, admin, status, views
            FROM news
            WHERE LOWER(category) = LOWER(?) AND status = ?
            ORDER BY date DESC
            LIMIT ?
        `;
        
        const news = await query(sql, [category, status, limit]);
        
        res.json({
            success: true,
            category: category,
            count: news.length,
            data: news
        });
    } catch (error) {
        console.error('Get news by category error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch news by category'
        });
    }
};

// Create news
export const createNews = async (req, res) => {
    try {
        const { title, description, category, thumbnail, admin = 'Admin', status = 'draft' } = req.body;
        
        if (!title || !description || !category) {
            return res.status(400).json({
                success: false,
                error: 'Title, description, and category are required'
            });
        }
        
        const sql = `
            INSERT INTO news (title, description, category, thumbnail, admin, status)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        const result = await query(sql, [title, description, category, thumbnail, admin, status]);
        
        res.status(201).json({
            success: true,
            message: 'News created successfully',
            data: {
                id: result.insertId,
                title,
                category,
                status
            }
        });
    } catch (error) {
        console.error('Create news error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create news'
        });
    }
};

// Update news
export const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category, thumbnail, status } = req.body;
        
        // Build dynamic update query
        const updates = [];
        const values = [];
        
        if (title) {
            updates.push('title = ?');
            values.push(title);
        }
        if (description) {
            updates.push('description = ?');
            values.push(description);
        }
        if (category) {
            updates.push('category = ?');
            values.push(category);
        }
        if (thumbnail) {
            updates.push('thumbnail = ?');
            values.push(thumbnail);
        }
        if (status) {
            updates.push('status = ?');
            values.push(status);
        }
        
        if (updates.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No fields to update'
            });
        }
        
        values.push(id);
        
        const sql = `UPDATE news SET ${updates.join(', ')} WHERE id = ?`;
        const result = await query(sql, values);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: 'News not found'
            });
        }
        
        res.json({
            success: true,
            message: 'News updated successfully'
        });
    } catch (error) {
        console.error('Update news error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update news'
        });
    }
};

// Delete news
export const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        
        const sql = 'DELETE FROM news WHERE id = ?';
        const result = await query(sql, [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: 'News not found'
            });
        }
        
        res.json({
            success: true,
            message: 'News deleted successfully'
        });
    } catch (error) {
        console.error('Delete news error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete news'
        });
    }
};

// Increment views
export const incrementViews = async (req, res) => {
    try {
        const { id } = req.params;
        
        const sql = 'UPDATE news SET views = views + 1 WHERE id = ?';
        await query(sql, [id]);
        
        res.json({
            success: true,
            message: 'Views incremented'
        });
    } catch (error) {
        console.error('Increment views error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to increment views'
        });
    }
};
