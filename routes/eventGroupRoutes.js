// routes/eventGroupRoutes.js
import express from "express";
import { getEventGroups } from "../controllers/eventGroupController.js";

const router = express.Router();

router.get("/", getEventGroups);

export default router;