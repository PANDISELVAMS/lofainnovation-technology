import mongoose from "mongoose";

const positionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["Full-time", "Part-time", "Contract", "Internship"], default: "Full-time" },
    location: { type: String, enum: ["Remote", "Hybrid", "On-site"], default: "Remote" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Position", positionSchema);
