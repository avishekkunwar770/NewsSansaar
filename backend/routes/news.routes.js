import express from 'express';
import {
    getAllNews,
    getNewsById,
    getNewsByCategory,
    getLatestNews,
    createNews,
    updateNews,
    deleteNews,
    incrementViews
} from '../controllers/news.controller.js';

const router = express.Router();

// Public routes
router.get('/', getAllNews);
router.get('/latest', getLatestNews);
router.get('/:id', getNewsById);
router.get('/category/:category', getNewsByCategory);
router.patch('/:id/views', incrementViews);

// Admin routes (add authentication middleware later)
router.post('/', createNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

export default router;
