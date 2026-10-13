import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaChevronDown } from "react-icons/fa";
import useFetch from "../hooks/useFetch";

const HIRING_EMAIL = "careers@lofa.dev";

export default function Careers() {
  const { data: positions, loading } = useFetch("/positions", []);
  const [form, setForm] = useState({ name: "", email: "", position: "" });
  const [openId, setOpenId] = useState(null);
  const formRef = useRef(null);

  const selectPosition = (title) => {
    setForm((f) => ({ ...f, position: title }));
    toast.success(`Selected: ${title}`);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.position) {
      toast.error("Please fill your name, email, and the position.");
      return;
    }
    const subject = `Job Application: ${form.position} — ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Position: ${form.position}`,
      "",
      "(Please attach your resume before sending this email.)",
    ].join("\n");
    window.location.href = `mailto:${HIRING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast.success("Opening your email app — don't forget to attach your resume!");
  };

  return (
    <div className="pt-28">
      <div className="section text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-400">Careers</span>
        <h1 className="section-title mt-3">Build the future <span className="gradient-text">with us</span></h1>
      </div>
      <div className="section !pt-0 grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          {loading && (
            <>
              {Array.from({ length: 2 }).map((_, i) => (<div key={i} className="glass-card h-32 animate-pulse" />))}
            </>
          )}
          {!loading && positions.length === 0 && (<p className="text-sm text-white/40">No open positions right now — check back soon.</p>)}
          {positions.map((p, i) => {
            const requirements = p.requirements || [];
            const hasDetails = !!p.description || requirements.length > 0;
            const isOpen = openId === p._id;

            return (
              <motion.div key={p._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className={`glass-card p-5 ${form.position === p.title ? "border-accent-500/60" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
                      <span className="flex items-center gap-1"><FaBriefcase /> {p.type}</span>
                      <span className="flex items-center gap-1"><FaMapMarkerAlt /> {p.location}</span>
                      {p.experience && (<span className="flex items-center gap-1"><FaClock /> {p.experience}</span>)}
                    </div>
                  </div>
                  <button onClick={() => selectPosition(p.title)} className="btn-outline shrink-0 !px-4 !py-2 text-xs">Apply</button>
                </div>

                {p.description && (
                  <p className={`mt-4 whitespace-pre-line text-sm text-white/60 ${isOpen ? "" : "line-clamp-3"}`}>{p.description}</p>
                )}

                <AnimatePresence initial={false}>
                  {isOpen && requirements.length > 0 && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <h4 className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent-400">Requirements</h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/60">
                        {requirements.map((r) => (<li key={r}>{r}</li>))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                {hasDetails && (
                  <button onClick={() => setOpenId(isOpen ? null : p._id)} className="mt-3 flex items-center gap-1 text-xs font-medium text-accent-400 hover:text-accent-300">
                    {isOpen ? "Show less" : "View full details"}
                    <FaChevronDown className={`text-[10px] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        <form ref={formRef} onSubmit={submit} className="glass-card h-fit space-y-4 p-6 md:sticky md:top-28">
          <h3 className="font-display text-lg font-semibold">Apply Now</h3>
          <input required placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10 focus:ring-accent-500" />
          <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10 focus:ring-accent-500" />
          <select required value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className="w-full rounded-lg bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-white/10">
            <option value="" disabled>Select a position...</option>
            {positions.map((p) => (<option key={p._id} value={p.title}>{p.title}</option>))}
          </select>
          <button className="btn-primary w-full justify-center">Apply via Email</button>
          <p className="text-center text-xs text-white/40">This opens your email app — please attach your resume before sending.</p>
        </form>
      </div>
    </div>
  );
}