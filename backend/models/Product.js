import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    image: String,
    features: [String],
    technology: [String],
    status: { type: String, enum: ["Coming Soon", "Live", "Beta", "New"], default: "Coming Soon" },
    launchUrl: String, // opens when the "Launch" button is clicked (live product link)
    demoUrl: String,   // opens when the "Demo" button is clicked
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);