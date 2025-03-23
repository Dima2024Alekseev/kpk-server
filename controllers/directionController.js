import Direction from "../models/Direction.js";

// Создать новое направление
export const createDirection = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newDirection = new Direction({ name, description });
    await newDirection.save();
    res.status(201).json(newDirection);
  } catch (error) {
    res.status(400).json({ message: "Ошибка при создании направления", error: error.message });
  }
};

// Получить все направления
export const getDirections = async (req, res) => {
  try {
    const directions = await Direction.find();
    res.json(directions);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении направлений", error: error.message });
  }
};