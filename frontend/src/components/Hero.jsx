import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const stats = [
  { label: "Projects Delivered", value: 20 },
  { label: "Happy Clients", value: 20 },
  { label: "Experience", value: 5 },
  { label: "Success Rate %", value: 98 },
];
const logos = ["Jeeva Beauty Saloon", "Ps Technology", "Ethical Info Tech", "6 Step Dance Studio"];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-24 text-center">
      <div className="aurora-bg">
        <motion.div className="aurora-blob left-[-10%] top-[-10%] bg-accent-500" animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity }} />
        <motion.div className="aurora-blob right-[-10%] top-[10%] bg-glow-pink" animate={{ x: [0, -50, 0], y: [0, 60, 0] }} transition={{ duration: 16, repeat: Infinity }} />
        <motion.div className="aurora-blob bottom-[-15%] left-[30%] bg-glow-teal" animate={{ x: [0, 40, 0], y: [0, -40, 0] }} transition={{ duration: 18, repeat: Infinity }} />
      </div>
      <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass mb-6 rounded-full px-4 py-1.5 text-xs font-medium text-white/80">✦ Logic Focus in Code — Enterprise Software Studio</motion.span>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight md:text-7xl">
        We build software that <span className="gradient-text">moves your business</span> forward
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 max-w-2xl text-base text-white/60 md:text-lg">
        Websites, mobile apps, ERP/CRM systems, AI solutions and cloud infrastructure — designed and engineered end-to-end by LOFA.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link to="/contact" className="btn-primary">Start a Project <FaArrowRight /></Link>
        <Link to="/products" className="btn-outline"><FaPlay className="text-xs" /> Watch Demo</Link>
      </motion.div>
      <div className="mt-20 grid w-full max-w-4xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
            <div className="font-display text-3xl font-bold text-accent-400"><CountUp end={s.value} duration={2} />+</div>
            <div className="mt-1 text-xs text-white/60">{s.label}</div>
          </motion.div>
        ))}
      </div>
      <div className="mt-16 w-full overflow-hidden py-6 opacity-70 [mask-image:linear-gradient(90deg,transparent,white,transparent)]">
        <div className="flex w-max animate-marquee gap-16">
          {[...logos, ...logos].map((logo, i) => (<span key={i} className="font-display text-xl font-semibold text-white/50">{logo}</span>))}
        </div>
      </div>
    </section>
  );
}
