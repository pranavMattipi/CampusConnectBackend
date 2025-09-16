import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  domain: { type: String, required: true }, // e.g., "iitd.ac.in"
  acquired: { type: Boolean, default: false },
});

export default mongoose.model("College", collegeSchema);
