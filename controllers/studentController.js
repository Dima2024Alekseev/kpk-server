import Student from "../models/Student.js";
import Group from "../models/Group.js";
import Direction from "../models/Direction.js";

// Создать нового студента
export const createStudent = async (req, res) => {
  const { lastName, firstName, middleName, group, specialty, studentId } = req.body;

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
      lastName,
      firstName,
      middleName,
      group,
      specialty,
      studentId,
    });

    // Сохраняем студента в базу данных
    await newStudent.save();

    // Возвращаем успешный ответ с populate
    const populatedStudent = await Student.findById(newStudent._id)
      .populate("group")
      .populate("specialty");

    res.status(201).json(populatedStudent);
  } catch (error) {
    console.error("Ошибка при создании студента:", error);
    res.status(500).json({ message: "Ошибка при создании студента", error: error.message });
  }
};

// Получить всех студентов (остаётся без изменений)
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("group")
      .populate("specialty");
    res.status(200).json(students);
  } catch (error) {
    console.error("Ошибка при получении студентов:", error);
    res.status(500).json({ message: "Ошибка при получении студентов", error: error.message });
  }
};

// Обновить студента
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { lastName, firstName, middleName, group, specialty, studentId } = req.body;

  try {
    // Находим студента
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Студент не найден" });
    }

    // Проверяем группу
    if (group) {
      const existingGroup = await Group.findById(group);
      if (!existingGroup) {
        return res.status(404).json({ message: "Группа не найдена" });
      }
      student.group = group;
    }

    // Проверяем специальность
    if (specialty) {
      const existingSpecialty = await Direction.findById(specialty);
      if (!existingSpecialty) {
        return res.status(404).json({ message: "Направление не найдено" });
      }
      student.specialty = specialty;
    }

    // Проверяем номер студенческого билета
    if (studentId && studentId !== student.studentId) {
      const existingStudent = await Student.findOne({ studentId });
      if (existingStudent) {
        return res.status(400).json({ message: "Номер студенческого билета уже используется" });
      }
      student.studentId = studentId;
    }

    // Обновляем ФИО, если они были изменены
    if (lastName) student.lastName = lastName;
    if (firstName) student.firstName = firstName;
    if (middleName !== undefined) student.middleName = middleName;

    // Сохраняем изменения
    const updatedStudent = await student.save();

    // Возвращаем обновлённого студента с populate
    const populatedStudent = await Student.findById(updatedStudent._id)
      .populate("group")
      .populate("specialty");

    res.status(200).json(populatedStudent);
  } catch (error) {
    console.error("Ошибка при обновлении студента:", error);
    res.status(500).json({ message: "Ошибка при обновлении студента", error: error.message });
  }
};

// Удалить студента (остаётся без изменений)
export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: "Студент не найден" });
    }
    res.status(200).json({ message: "Студент успешно удалён" });
  } catch (error) {
    console.error("Ошибка при удалении студента:", error);
    res.status(500).json({ message: "Ошибка при удалении студента", error: error.message });
  }
};