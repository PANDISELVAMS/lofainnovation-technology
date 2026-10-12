import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import useFetch from "../hooks/useFetch";

const LOFA_EMAIL = "lofainnovationtechnology@gmail.com";
const initial = { name: "", email: "", phone: "", company: "", budget: "", enquiryType: "", message: "" };

export default function Contact() {
  const { data: services } = useFetch("/services", []);
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("service") || "";
  const [form, setForm] = useState({ ...initial, enquiryType: preselected });

  const enquiryOptions = [...services.map((s) => s.title), "Something else / Not sure yet"];

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.enquiryType) {
      toast.error("Please fill your name, email, and what you're enquiring about.");
      return;
    }
    const subject = `New enquiry: ${form.enquiryType} — from ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      form.company && `Company: ${form.company}`,
      form.budget && `Budget: ${form.budget}`,
      `Enquiring about: ${form.enquiryType}`,
      "",
      "Message:",
      form.message || "(no message provided)",
    ].filter(Boolean).join("\n");
    window.location.href = `mailto:${LOFA_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast.success("Opening your email app to send this enquiry...");
  };

  const field = (key, placeholder, type = "text") => (
    <input type={type} placeholder={placeholder} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full rounded-lg bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10 focus:ring-accent-500" />
  );

  return (
    <div className="pt-28">
      <div className="section text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-400">Contact</span>
        <h1 className="section-title mt-3">Let's build something <span className="gradient-text">great together</span></h1>
      </div>
      <div className="section !pt-0 grid gap-10 md:grid-cols-5">
        <div className="space-y-5 md:col-span-2">
          {[{ icon: FaEnvelope, label: LOFA_EMAIL }, { icon: FaPhone, label: "+91 93448 81590" }, { icon: FaMapMarkerAlt, label: "Tiruppur-641652, India" }].map((c) => (
            <div key={c.label} className="glass-card flex items-center gap-4 p-5"><c.icon className="text-xl text-accent-400" /><span className="text-sm text-white/70">{c.label}</span></div>
          ))}
        </div>
        <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onSubmit={submit} className="glass-card space-y-4 p-6 md:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">{field("name", "Full Name")}{field("email", "Email Address", "email")}</div>
          <div className="grid gap-4 sm:grid-cols-2">{field("phone", "Phone Number")}{field("company", "Company Name")}</div>
          <div>
            <label className="mb-1 block text-xs text-white/50">What are you enquiring about? *</label>
            <select required value={form.enquiryType} onChange={(e) => setForm({ ...form, enquiryType: e.target.value })} className="w-full rounded-lg bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10 focus:ring-accent-500">
              <option value="" disabled>Select the type of work...</option>
              {enquiryOptions.map((opt) => (<option key={opt} value={opt}  className="bg-black">{opt}</option>))}
            </select>
          </div>
          {field("budget", "Budget (₹) — optional")}
          <textarea rows={4} placeholder="Tell us about your project..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-lg bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10 focus:ring-accent-500" />
          <button className="btn-primary w-full justify-center">Send Enquiry</button>
          <p className="text-center text-xs text-white/40">This opens your email app with the details pre-filled — just hit send.</p>
        </motion.form>
      </div>
    </div>
  );
}
