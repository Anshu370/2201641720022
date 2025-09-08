import express from 'express';
import {
  createShortUrl,
  redirectToOriginal,
  getUrlStats
} from '../controllers/shorturl.controller.js';

const router = express.Router();

router.post('/shorturls', createShortUrl);
router.get('/shorturls/:shortcode', redirectToOriginal);
router.get('/shorturls/:shortcode/stats', getUrlStats);


export default router;
