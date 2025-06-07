import Department from "../models/Department.js";
import Teacher from "../models/Teacher.js";

// Создать новую ПЦК
export const createDepartment = async (req, res) => {
    const { name, description } = req.body;

    try {
        // Проверяем, существует ли ПЦК с таким названием
        const existingDepartment = await Department.findOne({ name });
        if (existingDepartment) {
            return res.status(400).json({ message: "ПЦК с таким названием уже существует" });
        }

        // Создаем новую ПЦК
        const newDepartment = new Department({
            name,
            description: description || "",
        });

        // Сохраняем в базу данных
        await newDepartment.save();

        res.status(201).json(newDepartment);
    } catch (error) {
        console.error("Ошибка при создании ПЦК:", error);
        res.status(500).json({ message: "Ошибка при создании ПЦК", error: error.message });
    }
};

// Получить все ПЦК
export const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (error) {
        console.error("Ошибка при получении ПЦК:", error);
        res.status(500).json({ message: "Ошибка при получении ПЦК", error: error.message });
    }
};

// Обновить ПЦК
// Обновить ПЦК
export const updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Идентификатор ПЦК не предоставлен" });
    }

    try {
        // Находим ПЦК
        const department = await Department.findById(id);
        if (!department) {
            return res.status(404).json({ message: "ПЦК не найдена" });
        }

        // Проверяем название на уникальность
        if (name && name !== department.name) {
            const existingDepartment = await Department.findOne({ name });
            if (existingDepartment) {
                return res.status(400).json({ message: "ПЦК с таким названием уже существует" });
            }
            department.name = name;
        }

        // Обновляем описание
        if (description !== undefined) {
            department.description = description;
        }

        // Сохраняем изменения
        const updatedDepartment = await department.save();

        res.status(200).json(updatedDepartment);
    } catch (error) {
        console.error("Ошибка при обновлении ПЦК:", error.stack);
        res.status(500).json({ message: "Ошибка при обновлении ПЦК", error: error.message });
    }
};


// Удалить ПЦК
export const deleteDepartment = async (req, res) => {
    const { id } = req.params;

    try {
        // Проверяем, есть ли преподаватели, связанные с этой ПЦК
        const teachersCount = await Teacher.countDocuments({ department: id });
        if (teachersCount > 0) {
            return res.status(400).json({
                message: "Невозможно удалить ПЦК, так как с ней связаны преподаватели",
                teachersCount
            });
        }

        const department = await Department.findByIdAndDelete(id);
        if (!department) {
            return res.status(404).json({ message: "ПЦК не найдена" });
        }
        res.status(200).json({ message: "ПЦК успешно удалена" });
    } catch (error) {
        console.error("Ошибка при удалении ПЦК:", error);
        res.status(500).json({ message: "Ошибка при удалении ПЦК", error: error.message });
    }
};
