import mongoose from "mongoose";

// Logos shown in the "Trusted by growing businesses" marquee on the homepage.
const partnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // used as alt text, not displayed
    logo: { type: String, required: true }, // Cloudinary URL
    link: String, // optional — clicking the logo can open the partner's site
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Partner", partnerSchema);
