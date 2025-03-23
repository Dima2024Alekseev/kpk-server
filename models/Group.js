import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  direction: { type: mongoose.Schema.Types.ObjectId, ref: "Direction" }, // Связь с направлением
});

export default mongoose.model("Group", groupSchema);