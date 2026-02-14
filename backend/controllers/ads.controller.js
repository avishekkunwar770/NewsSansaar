import { query } from '../config/database.js';

// Get active ads
export const getActiveAds = async (req, res) => {
    try {
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        const sql = `
            SELECT id, ad_image, redirect_link, start_time, end_time
            FROM ads
            WHERE start_time <= ? AND end_time >= ?
            ORDER BY RAND()
            LIMIT 3
        `;
        
        const ads = await query(sql, [now, now]);
        
        res.json({
            success: true,
            count: ads.length,
            data: ads
        });
    } catch (error) {
        console.error('Get active ads error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch active ads'
        });
    }
};

// Get all ads
export const getAllAds = async (req, res) => {
    try {
        const sql = 'SELECT * FROM ads ORDER BY start_time DESC';
        const ads = await query(sql);
        
        res.json({
            success: true,
            count: ads.length,
            data: ads
        });
    } catch (error) {
        console.error('Get all ads error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch ads'
        });
    }
};

// Create ad
export const createAd = async (req, res) => {
    try {
        const { ad_image, start_time, end_time, redirect_link } = req.body;
        
        if (!ad_image || !start_time || !end_time) {
            return res.status(400).json({
                success: false,
                error: 'Ad image, start time, and end time are required'
            });
        }
        
        const sql = `
            INSERT INTO ads (ad_image, start_time, end_time, redirect_link)
            VALUES (?, ?, ?, ?)
        `;
        
        const result = await query(sql, [ad_image, start_time, end_time, redirect_link]);
        
        res.status(201).json({
            success: true,
            message: 'Ad created successfully',
            data: {
                id: result.insertId
            }
        });
    } catch (error) {
        console.error('Create ad error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create ad'
        });
    }
};

// Update ad
export const updateAd = async (req, res) => {
    try {
        const { id } = req.params;
        const { ad_image, start_time, end_time, redirect_link } = req.body;
        
        const updates = [];
        const values = [];
        
        if (ad_image) {
            updates.push('ad_image = ?');
            values.push(ad_image);
        }
        if (start_time) {
            updates.push('start_time = ?');
            values.push(start_time);
        }
        if (end_time) {
            updates.push('end_time = ?');
            values.push(end_time);
        }
        if (redirect_link !== undefined) {
            updates.push('redirect_link = ?');
            values.push(redirect_link);
        }
        
        if (updates.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No fields to update'
            });
        }
        
        values.push(id);
        
        const sql = `UPDATE ads SET ${updates.join(', ')} WHERE id = ?`;
        const result = await query(sql, values);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: 'Ad not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Ad updated successfully'
        });
    } catch (error) {
        console.error('Update ad error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update ad'
        });
    }
};

// Delete ad
export const deleteAd = async (req, res) => {
    try {
        const { id } = req.params;
        
        const sql = 'DELETE FROM ads WHERE id = ?';
        const result = await query(sql, [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                error: 'Ad not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Ad deleted successfully'
        });
    } catch (error) {
        console.error('Delete ad error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete ad'
        });
    }
};
