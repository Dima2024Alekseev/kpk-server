import express from 'express';
import { register, login, refreshToken } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

// Пример защищенного роута
router.get('/profile', authenticate, (req, res) => {
    res.json({ user: req.user });
});

export default router;