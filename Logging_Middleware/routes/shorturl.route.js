import express from 'express';
import {
  createShortUrl,
  redirectToOriginal,
  getUrlStats
} from '../controllers/shorturlController.js';

const router = express.Router();

router.post('/shorturls', createShortUrl);
router.get('/shorturls/:shortcode', redirectToOriginal);
router.get('/shorturls/:shortcode/stats', getUrlStats);

export default router;
