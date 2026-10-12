import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    image: String, // Cloudinary URL, set via the admin image upload
    client: { type: String, required: true },
    type: String,
    technologies: [String],
    duration: String,
    liveLink: String,
    githubLink: String,
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Portfolio", portfolioSchema);
