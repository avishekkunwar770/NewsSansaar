import express from 'express';
import { getActiveAds, getAllAds, createAd, updateAd, deleteAd } from '../controllers/ads.controller.js';

const router = express.Router();

// Public routes
router.get('/active', getActiveAds);

// Admin routes
router.get('/', getAllAds);
router.post('/', createAd);
router.put('/:id', updateAd);
router.delete('/:id', deleteAd);

export default router;
