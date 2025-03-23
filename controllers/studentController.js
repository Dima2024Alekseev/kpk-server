import Student from "../models/Student.js";
import Group from "../models/Group.js";
import Direction from "../models/Direction.js";

// Создать нового студента
export const createStudent = async (req, res) => {
  const { fullName, group, specialty, studentId } = req.body;

  try {
    // Проверяем, существует ли группа
    const existingGroup = await Group.findById(group);
    if (!existingGroup) {
      return res.status(404).json({ message: "Группа не найдена" });
    }

    // Проверяем, существует ли направление (специальность)
    const existingSpecialty = await Direction.findById(specialty);
    if (!existingSpecialty) {
      return res.status(404).json({ message: "Направление не найдено" });
    }

    // Проверяем, существует ли студент с таким номером студенческого билета
    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return res.status(400).json({ message: "Студент с таким номером билета уже существует" });
    }

    // Создаем нового студента
    const newStudent = new Student({
      fullName,
      group,
      specialty,
      studentId,
    });

    // Сохраняем студента в базу данных
    await newStudent.save();

    // Возвращаем успешный ответ
    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Ошибка при создании студента:", error);
    res.status(500).json({ message: "Ошибка при создании студента", error: error.message });
  }
};

// Получить всех студентов
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("group").populate("specialty");
    res.status(200).json(students);
  } catch (error) {
    console.error("Ошибка при получении студентов:", error);
    res.status(500).json({ message: "Ошибка при получении студентов", error: error.message });
  }
};