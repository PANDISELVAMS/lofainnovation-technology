import mongoose from "mongoose";

const positionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["Full-time", "Part-time", "Contract", "Internship"], default: "Full-time" },
    location: { type: String, enum: ["Remote", "Hybrid", "On-site"], default: "Remote" },
    experience: String,        // e.g. "1-3 years" or "Fresher"
    description: String,       // job description shown on the Careers page
    requirements: [String],    // bullet list: skills / qualifications
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Position", positionSchema);