import { motion } from "framer-motion";
import { FaArrowRight, FaClock, FaCheckCircle, FaTools } from "react-icons/fa";
import { Link } from "react-router-dom";
import { iconMap } from "../data/iconMap";

export default function ServiceCard({ service, index }) {
  const Icon = iconMap[service.icon] || FaTools;
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index % 3) * 0.1 }} className="glass-card flex flex-col p-6">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/15 text-2xl text-accent-400"><Icon /></div>
        {service.tag && <span className="rounded-full bg-glow-teal/15 px-3 py-1 text-[10px] font-semibold text-glow-teal">{service.tag}</span>}
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold">{service.title}</h3>
      <p className="mt-2 text-sm text-white/60">{service.description}</p>
      <ul className="mt-4 space-y-1.5">
        {(service.features || []).slice(0, 3).map((f) => (<li key={f} className="flex items-center gap-2 text-xs text-white/50"><FaCheckCircle className="text-accent-400" /> {f}</li>))}
      </ul>
      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <div>
          <div className="font-display text-lg font-bold text-white">{service.price}</div>
          <div className="flex items-center gap-1 text-[11px] text-white/40">{service.delivery}</div>
        </div>
        <Link to={`/contact?service=${encodeURIComponent(service.title)}`} className="flex items-center gap-1 text-sm font-medium text-accent-400 hover:text-accent-300">Order <FaArrowRight className="text-xs" /></Link>
      </div>
    </motion.div>
  );
}
