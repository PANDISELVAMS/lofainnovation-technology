import express from "express";
import rateLimit from "express-rate-limit";
import { adminLogin } from "../controllers/authController.js";

const router = express.Router();
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: { message: "Too many login attempts, try again later." } });

router.post("/admin-login", loginLimiter, adminLogin);

export default router;
