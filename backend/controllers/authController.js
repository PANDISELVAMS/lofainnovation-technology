import generateAdminToken from "../utils/generateToken.js";

// Single admin login, checked directly against .env — no User model needed.
export async function adminLogin(req, res) {
  const { email, password } = req.body;

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = generateAdminToken();
    return res.json({ token, admin: { email } });
  }

  res.status(401).json({ message: "Invalid admin email or password" });
}
