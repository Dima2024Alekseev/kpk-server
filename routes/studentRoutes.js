import express from "express";
import {
    createStudent,
    getStudents,
    updateStudent,
    deleteStudent
} from "../controllers/studentController.js";

const router = express.Router();

// Создать нового студента
router.post("/", createStudent);

// Получить всех студентов
router.get("/", getStudents);

// Обновить студента
router.put("/:id", updateStudent);

// Удалить студента
router.delete("/:id", deleteStudent);

export default router;