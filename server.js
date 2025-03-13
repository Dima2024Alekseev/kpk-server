import express from 'express';
import mongoose from 'mongoose';
import config from './config/config.js'; // Импортируем конфигурацию

// Создаем экземпляр приложения Express
const app = express();

// Получаем переменные из конфигурации
const { MONGODB_URI, PORT } = config;

// Подключение к MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Подключение к MongoDB успешно установлено.');
    })
    .catch((err) => {
        console.error('Ошибка подключения к MongoDB:', err);
    });

// Простой маршрут для проверки работы сервера
app.get('/', (req, res) => {
    res.send('Сервер работает!');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});