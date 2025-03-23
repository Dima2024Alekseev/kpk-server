import Group from "../models/Group.js";
import Direction from "../models/Direction.js";

// Создать новую группу
export const createGroup = async (req, res) => {
  const { name, directionId } = req.body;

  try {
    const direction = await Direction.findById(directionId);
    if (!direction) {
      return res.status(404).json({ message: "Направление не найдено" });
    }

    const newGroup = new Group({ name, direction: directionId });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(400).json({ message: "Ошибка при создании группы", error: error.message });
  }
};

// Получить все группы
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate("direction");
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении групп", error: error.message });
  }
};