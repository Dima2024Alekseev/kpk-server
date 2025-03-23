import express from "express";
import { createStudent, getStudents } from "../controllers/studentController.js";

const router = express.Router();

// Создать нового студента
router.post("/", createStudent);

// Получить всех студентов
router.get("/", getStudents);

export default router;