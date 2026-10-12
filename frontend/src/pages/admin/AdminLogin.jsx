import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome to the admin panel");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-950 px-6">
      <div className="glass-card w-full max-w-sm p-8">
        <Link to="/" className="font-display text-lg font-bold tracking-tight">LOFA<span className="text-accent-400">.</span></Link>
        <h1 className="mt-4 font-display text-2xl font-bold">Admin Panel</h1>
        <p className="mt-1 text-sm text-white/60">Manage Services, Products, Launch Banner, Portfolio, Partners & Careers.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input required type="email" placeholder="Admin Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10 focus:ring-accent-500" />
          <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-lg bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10 focus:ring-accent-500" />
          <button disabled={loading} className="btn-primary w-full justify-center">{loading ? "Signing in..." : "Sign In"}</button>
        </form>
      </div>
    </div>
  );
}
