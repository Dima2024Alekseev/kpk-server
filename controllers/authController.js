import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import logger from '../logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export const register = async (req, res) => {
    const { username, password, role = 'user' } = req.body;

    try {
        logger.info(`Регистрация пользователя: ${username}`);

        if (await User.findOne({ username })) {
            return res.status(400).json({ error: 'Пользователь уже существует' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role });
        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: EXPIRES_IN,
        });

        logger.info(`Пользователь ${username} успешно зарегистрирован`);
        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
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
            return res.status(400).json({ error: 'Неверные учетные данные' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            logger.warn(`Неверный пароль для пользователя: ${username}`);
            return res.status(400).json({ error: 'Неверные учетные данные' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: EXPIRES_IN,
        });

        logger.info(`Пользователь ${username} успешно авторизован`);
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        logger.error(`Ошибка при авторизации: ${error.message}`);
        res.status(500).json({ error: 'Ошибка при авторизации' });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Требуется авторизация' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        const newToken = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: EXPIRES_IN,
        });

        res.status(200).json({ token: newToken });
    } catch (error) {
        res.status(401).json({ error: 'Недействительный токен' });
    }
};