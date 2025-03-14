import express from 'express';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getEvents); // Получить все мероприятия
router.post('/', createEvent); // Создать мероприятие
router.put('/:id', updateEvent); // Обновить мероприятие
router.delete('/:id', deleteEvent); // Удалить мероприятие

export default router;