import express from 'express';
import { getDailyQuote } from '../controllers/quoteController.js';

const router = express.Router();

// Маршрут для получения цитаты дня
router.get('/daily-quote', getDailyQuote);

export default router;