import { motion } from "framer-motion";

const timeline = [
  { year: "2019", text: "LOFA founded as a freelance dev collective." },
  { year: "2021", text: "Expanded into full product teams; first ERP client." },
  { year: "2023", text: "Launched in-house SaaS products & AI practice." },
  { year: "2026", text: "Serving clients across 14 countries." },
];
const values = ["Engineering Craft", "Radical Transparency", "Client Obsession", "Ship Fast, Ship Right"];

export default function About() {
  return (
    <div className="pt-28">
      <div className="section text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-400">About Us</span>
        <h1 className="section-title mt-3">Logic Focus in Code — <span className="gradient-text">that's LOFA</span></h1>
      </div>
      <div className="section grid gap-6 !pt-0 md:grid-cols-2">
        <div className="glass-card p-8"><h3 className="font-display text-xl font-semibold text-accent-400">Mission</h3><p className="mt-3 text-white/60">To make enterprise-grade software accessible to businesses of every size.</p></div>
        <div className="glass-card p-8"><h3 className="font-display text-xl font-semibold text-accent-400">Vision</h3><p className="mt-3 text-white/60">To become the most trusted software partner for ambitious teams globally.</p></div>
      </div>
      <div className="section">
        <h2 className="section-title text-center">Our Journey</h2>
        <div className="mx-auto mt-12 max-w-2xl border-l border-white/10 pl-8">
          {timeline.map((t, i) => (
            <motion.div key={t.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative mb-10">
              <span className="absolute -left-[38px] flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 ring-4 ring-base-950" />
              <div className="font-display text-lg font-bold text-accent-400">{t.year}</div>
              <p className="mt-1 text-white/60">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="section">
        <h2 className="section-title text-center">Company Values</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {values.map((v, i) => (
            <motion.div key={v} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card p-6 text-center font-medium">{v}</motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
