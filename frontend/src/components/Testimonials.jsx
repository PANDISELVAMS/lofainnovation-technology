import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  return (
    <section className="section">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-400">Testimonials</span>
        <h2 className="section-title mt-3">Loved by <span className="gradient-text">clients worldwide</span></h2>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
            <FaQuoteLeft className="text-2xl text-accent-500/40" />
            <p className="mt-4 text-sm text-white/70">{t.message}</p>
            <div className="mt-5 flex items-center gap-3">
              <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full" />
              <div><div className="text-sm font-semibold">{t.name}</div><div className="text-xs text-white/50">{t.role}</div></div>
            </div>
            <div className="mt-3 flex gap-1 text-yellow-400">{Array.from({ length: t.rating }).map((_, idx) => (<FaStar key={idx} className="text-xs" />))}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
