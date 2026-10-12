import jwt from "jsonwebtoken";

// Single-admin site: a valid token just means "this request came from
// someone who logged in with the admin password". No user database needed.
export function protectAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ message: "Not authorized, no token" });
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    next();
  } catch {
    return res.status(401).json({ message: "Not authorized, invalid or expired token" });
  }
}
