import mongoose from "mongoose";

const directionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }], // Связь с группами
});

export default mongoose.model("Direction", directionSchema);