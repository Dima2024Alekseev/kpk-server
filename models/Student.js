import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true }, // ФИО студента
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true }, // Ссылка на группу
  specialty: { type: mongoose.Schema.Types.ObjectId, ref: "Direction", required: true }, // Ссылка на направление (специальность)
  studentId: { type: String, required: true, unique: true }, // Номер студенческого билета
});

export default mongoose.model("Student", studentSchema);