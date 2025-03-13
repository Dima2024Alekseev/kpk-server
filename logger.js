import winston from 'winston';
import path from 'path';

// Настройка формата логов
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Создаем логгер
const logger = winston.createLogger({
  level: 'info', // Уровень логирования
  format: winston.format.combine(
    winston.format.timestamp(), // Добавляем временную метку
    logFormat
  ),
  transports: [
    // Логи в консоль
    new winston.transports.Console(),
    // Логи в файл
    new winston.transports.File({
      filename: path.join('logs', 'error.log'), // Файл для ошибок
      level: 'error', // Логировать только ошибки
    }),
    new winston.transports.File({
      filename: path.join('logs', 'combined.log'), // Файл для всех логов
    }),
  ],
});

export default logger;