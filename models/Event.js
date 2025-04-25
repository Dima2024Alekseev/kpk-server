import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    place: { type: String, required: true },
    organizer: { type: String, required: true },
    image: { type: String, required: true }, 
    city: { type: String, required: true },
    responsiblePerson: { type: String, required: true },
    contactPerson: { type: String, required: true }, 
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
});

export default mongoose.model('Event', eventSchema);
