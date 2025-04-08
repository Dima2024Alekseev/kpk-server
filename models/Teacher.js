import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String, default: "" },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
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

teacherSchema.virtual('fullName').get(function () {
    return `${this.lastName} ${this.firstName} ${this.middleName}`.trim();
});

export default mongoose.model("Teacher", teacherSchema);