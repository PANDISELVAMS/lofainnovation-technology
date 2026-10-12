import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    image: String,
    features: [String],
    technology: [String],
    status: { type: String, enum: ["Coming Soon", "Live", "Beta", "New"], default: "Coming Soon" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
