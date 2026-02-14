import { query } from '../config/database.js';

// Get all categories
export const getAllCategories = async (req, res) => {
    try {
        const sql = 'SELECT * FROM categories ORDER BY name';
        const categories = await query(sql);
        
        res.json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch categories'
        });
    }
};

// Get category statistics
export const getCategoryStats = async (req, res) => {
    try {
        const sql = `
            SELECT 
                category,
                COUNT(*) as total_articles,
                SUM(views) as total_views,
                AVG(views) as avg_views
            FROM news
            WHERE status = 'published'
            GROUP BY category
            ORDER BY total_articles DESC
        `;
        
        const stats = await query(sql);
        
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Get category stats error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch category statistics'
        });
    }
};
