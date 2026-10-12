import mongoose from "mongoose";

// The "Product Launch Bar" shown on Home/Products. We keep it simple:
// the most recently updated active banner is what the site shows.
const bannerSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    description: String,
    bannerImage: String,
    launchDate: Date,
    buttonText: { type: String, default: "Notify Me" },
    externalLink: { type: String, default: "/products" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Banner", bannerSchema);
