import Teacher from "../models/Teacher.js";
import Department from "../models/Department.js";

// Создать нового преподавателя
export const createTeacher = async (req, res) => {
    const { lastName, firstName, middleName, department } = req.body;

    try {
        // Проверяем, существует ли ПЦК (кафедра)
        const existingDepartment = await Department.findById(department);
        if (!existingDepartment) {
            return res.status(404).json({ message: "ПЦК не найдена" });
        }

        // Создаем нового преподавателя
        const newTeacher = new Teacher({
            lastName,
            firstName,
            middleName,
            department,
        });

        // Сохраняем преподавателя в базу данных
        await newTeacher.save();

        // Возвращаем успешный ответ с populate
        const populatedTeacher = await Teacher.findById(newTeacher._id)
            .populate("department");

        res.status(201).json(populatedTeacher);
    } catch (error) {
        console.error("Ошибка при создании преподавателя:", error);
        res.status(500).json({ message: "Ошибка при создании преподавателя", error: error.message });
    }
};

// Получить всех преподавателей
export const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find()
            .populate("department");
        res.status(200).json(teachers);
    } catch (error) {
        console.error("Ошибка при получении преподавателей:", error);
        res.status(500).json({ message: "Ошибка при получении преподавателей", error: error.message });
    }
};

// Обновить преподавателя
export const updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { lastName, firstName, middleName, department } = req.body;

    try {
        // Находим преподавателя
        const teacher = await Teacher.findById(id);
        if (!teacher) {
            return res.status(404).json({ message: "Преподаватель не найден" });
        }

        // Проверяем ПЦК
        if (department) {
            const existingDepartment = await Department.findById(department);
            if (!existingDepartment) {
                return res.status(404).json({ message: "ПЦК не найдена" });
            }
            teacher.department = department;
        }

        // Обновляем ФИО, если они были изменены
        if (lastName) teacher.lastName = lastName;
        if (firstName) teacher.firstName = firstName;
        if (middleName !== undefined) teacher.middleName = middleName;

        // Сохраняем изменения
        const updatedTeacher = await teacher.save();

        // Возвращаем обновлённого преподавателя с populate
        const populatedTeacher = await Teacher.findById(updatedTeacher._id)
            .populate("department");

        res.status(200).json(populatedTeacher);
    } catch (error) {
        console.error("Ошибка при обновлении преподавателя:", error);
        res.status(500).json({ message: "Ошибка при обновлении преподавателя", error: error.message });
    }
};

// Удалить преподавателя
export const deleteTeacher = async (req, res) => {
    const { id } = req.params;

    try {
        const teacher = await Teacher.findByIdAndDelete(id);
        if (!teacher) {
            return res.status(404).json({ message: "Преподаватель не найден" });
        }
        res.status(200).json({ message: "Преподаватель успешно удалён" });
    } catch (error) {
        console.error("Ошибка при удалении преподавателя:", error);
        res.status(500).json({ message: "Ошибка при удалении преподавателя", error: error.message });
    }
};