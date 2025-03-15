import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';
import config from './config/config.js';

const { MONGODB_URI, PORT } = config;

const app = express();

// Middleware для обработки JSON
app.use(express.json());

// Настройка CORS
app.use(cors());

// Подключение к MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Подключение к БД успешно установлено.');
    })
    .catch((err) => {
        console.error('Ошибка подключения к MongoDB:', err);
    });

// Роуты
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/quotes', quoteRoutes); // Подключаем роуты для цитат

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});