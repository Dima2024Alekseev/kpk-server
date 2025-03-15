import Quote from '../models/Quote.js';

// Получить цитату дня
export const getDailyQuote = async (req, res) => {
  try {
    // Получаем общее количество цитат в базе
    const totalQuotes = await Quote.countDocuments();

    // Если цитат нет, возвращаем ошибку
    if (totalQuotes === 0) {
      return res.status(404).json({ message: 'Цитаты не найдены' });
    }

    // Вычисляем индекс цитаты на основе текущей даты
    const now = new Date();
    const dayOfYear = Math.floor(
      (now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
    );
    const quoteIndex = dayOfYear % totalQuotes;

    // Находим цитату по индексу
    const dailyQuote = await Quote.findOne().skip(quoteIndex);

    res.status(200).json(dailyQuote);
  } catch (error) {
    console.error('Ошибка при получении цитаты:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};