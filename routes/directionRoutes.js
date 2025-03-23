import express from "express";
import { createDirection, getDirections } from "../controllers/directionController.js";

const router = express.Router();

// Создать новое направление
router.post("/", createDirection);

// Получить все направления
router.get("/", getDirections);

export default router;