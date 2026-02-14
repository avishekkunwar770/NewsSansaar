import express from 'express';
import { getAllCategories, getCategoryStats } from '../controllers/category.controller.js';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/stats', getCategoryStats);

export default router;
