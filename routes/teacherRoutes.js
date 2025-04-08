import express from "express";
import {
    createTeacher,
    getTeachers,
    updateTeacher,
    deleteTeacher
} from "../controllers/teacherController.js";

const router = express.Router();

// Создать нового преподавателя
router.post("/", createTeacher);

// Получить всех преподавателей
router.get("/", getTeachers);

// Обновить преподавателя
router.put("/:id", updateTeacher);

// Удалить преподавателя
router.delete("/:id", deleteTeacher);

export default router;