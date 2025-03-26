import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, default: "" },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
  specialty: { type: mongoose.Schema.Types.ObjectId, ref: "Direction", required: true },
  studentId: { type: String, required: true, unique: true },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.fullName = `${ret.lastName} ${ret.firstName} ${ret.middleName}`.trim();
      delete ret.__v;
      return ret;
    }
  }
});

studentSchema.virtual('fullName').get(function () {
  return `${this.lastName} ${this.firstName} ${this.middleName}`.trim();
});

export default mongoose.model("Student", studentSchema);