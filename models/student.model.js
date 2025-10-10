import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    studentId: {
      type: String,
      unique: true,
      default: () => "S" + Date.now(), // auto-generated ID like S1738943853084
    },
    branch: { type: String, required: true },
    year: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    college: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
