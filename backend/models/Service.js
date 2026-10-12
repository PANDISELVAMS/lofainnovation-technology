import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    icon: { type: String, default: "FaTools" }, // string key, resolved on the frontend via iconMap
    description: String,
    features: [String],
    price: String,
    delivery: String,
    technology: [String],
    tag: String,
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
