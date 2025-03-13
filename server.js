// Подключаем dotenv для работы с переменными окружения
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Создаем экземпляр приложения Express
const app = express();

// Получаем переменные окружения
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5001; // Если PORT не указан, используем 5000

// Подключение к MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
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