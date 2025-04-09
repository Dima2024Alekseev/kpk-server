import Event from '../models/Event.js';

// Получить все мероприятия
export const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('students teachers');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении мероприятий' });
    }
};

// Создать мероприятие
export const createEvent = async (req, res) => {
    const { title, date, time, place, organizer, image, students, teachers } = req.body;

    try {
        const newEvent = new Event({ title, date, time, place, organizer, image, students, teachers });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании мероприятия' });
    }
};

// Обновить мероприятие
export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, date, time, place, organizer, image, students, teachers } = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { title, date, time, place, organizer, image, students, teachers },
            { new: true }
        ).populate('students teachers');
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении мероприятия' });
    }
};

// Удалить мероприятие
export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: 'Мероприятие успешно удалено' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении мероприятия' });
    }
};
