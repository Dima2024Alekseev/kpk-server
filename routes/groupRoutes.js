import express from "express";
import { createGroup, getGroups } from "../controllers/groupController.js";

const router = express.Router();

// Создать новую группу
router.post("/", createGroup);

// Получить все группы
router.get("/", getGroups);

export default router;