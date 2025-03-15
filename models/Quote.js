import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  text: { type: String, required: true }, // Текст цитаты
  author: { type: String, default: "Неизвестный автор" }, // Автор цитаты
});

const Quote = mongoose.model('Quote', quoteSchema);

export default Quote;