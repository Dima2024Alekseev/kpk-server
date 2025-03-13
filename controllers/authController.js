import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import logger from '../logger.js'; // Импортируем логгер

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        logger.info(`Регистрация пользователя: ${username}`);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        logger.info(`Пользователь ${username} успешно зарегистрирован`);
        res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
        logger.error(`Ошибка при регистрации пользователя: ${error.message}`);
        res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        logger.info(`Попытка авторизации пользователя: ${username}`);
        const user = await User.findOne({ username });

        if (!user) {
            logger.warn(`Пользователь ${username} не найден`);
            return res.status(400).json({ error: 'Пользователь не найден' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            logger.warn(`Неверный пароль для пользователя: ${username}`);
            return res.status(400).json({ error: 'Неверный пароль' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: '1h',
        });

        logger.info(`Пользователь ${username} успешно авторизован`);
        res.status(200).json({ token, user: { id: user._id, username: user.username, role: user.role } });
    } catch (error) {
        logger.error(`Ошибка при авторизации: ${error.message}`);
        res.status(500).json({ error: 'Ошибка при авторизации' });
    }
};