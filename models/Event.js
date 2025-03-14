import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    place: { type: String, required: true },
    organizer: { type: String, required: true },
    image: { type: String, required: true }, // URL изображения
});

export default mongoose.model('Event', eventSchema);