import jwt from "jsonwebtoken";

export default function generateAdminToken() {
  return jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
}
