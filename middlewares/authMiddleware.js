import jwt from 'jsonwebtoken';
import logger from '../logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authenticate = (req, res, next) => {
    const accessToken = req.header('Authorization')?.replace('Bearer ', '');

    if (!accessToken) {
        logger.warn('Попытка доступа без токена');
        return res.status(401).json({ error: 'Требуется авторизация' });
    }

    try {
        const decoded = jwt.verify(accessToken, JWT_SECRET);
        req.user = decoded;
        logger.info(`Успешная аутентификация пользователя ID: ${decoded.id}`);
        next();
    } catch (error) {
        logger.error(`Ошибка верификации токена: ${error.message}`);
        res.status(401).json({ error: 'Недействительный токен' });
    }
};

export const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            logger.warn(`Попытка несанкционированного доступа пользователем ID: ${req.user.id}`);
            return res.status(403).json({ error: 'Доступ запрещен' });
        }
        next();
    };
};
