import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import directionRoutes from "./routes/directionRoutes.js"; // Новый роут
import groupRoutes from "./routes/groupRoutes.js"; // Новый роут
import studentRoutes from "./routes/studentRoutes.js"; // Новый роут
import config from "./config/config.js";

const { MONGODB_URI, PORT } = config;

const app = express();

// Middleware для обработки JSON
app.use(express.json());

// Настройка CORS
app.use(cors());

// Подключение к MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Подключение к БД успешно установлено.");
  })
  .catch((err) => {
    console.error("Ошибка подключения к MongoDB:", err);
  });

// Роуты
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/directions", directionRoutes); // Подключаем роуты для направлений
app.use("/api/groups", groupRoutes); // Подключаем роуты для групп
app.use("/api/students", studentRoutes); // Подключаем роуты для студентов

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});