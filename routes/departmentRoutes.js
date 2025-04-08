import express from "express";
import {
    createDepartment,
    getDepartments,
    updateDepartment,
    deleteDepartment
} from "../controllers/departmentController.js";

const router = express.Router();

// Создать новую ПЦК
router.post("/", createDepartment);

// Получить все ПЦК
router.get("/", getDepartments);

// Обновить ПЦК
router.put("/:id", updateDepartment);

// Удалить ПЦК
router.delete("/:id", deleteDepartment);

export default router;