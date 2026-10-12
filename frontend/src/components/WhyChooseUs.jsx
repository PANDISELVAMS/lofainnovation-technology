import { motion } from "framer-motion";
import { FaLaptopCode, FaBullseye, FaHandHoldingUsd, FaHeadset } from "react-icons/fa";

const points = [
  {
    icon: FaLaptopCode,
    title: "Modern Tech Stack",
    description: "We use the latest tools and frameworks to ensure fast, scalable, and future-proof websites.",
  },
  {
    icon: FaBullseye,
    title: "Business-First Approach",
    description: "Our designs focus on conversion, user experience, and real business goals — not just visuals.",
  },
  {
    icon: FaHandHoldingUsd,
    title: "Transparent Pricing",
    description: "Clear communication, no hidden costs, and honest timelines. What we promise is what we deliver.",
  },
  {
    icon: FaHeadset,
    title: "Dedicated Support",
    description: "We support you even after launch — updates, fixes, and guidance whenever you need it.",
  },
];

// Duplicated for a seamless infinite loop, same pattern as the logo
// marquee in Hero.jsx / ClientShowcase.jsx.
const track = [...points, ...points];

export default function WhyChooseUs() {
  return (
    <section className="section">
      <div className="mx-auto  max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-400">Why Choose LOFA</span>
        <h2 className="section-title mt-3">
          Built for <span className="gradient-text">modern businesses</span>
        </h2>
        <p className="mt-4 text-white/60">
          We focus on quality, clarity, and long-term value — not just delivering
          websites, but building digital foundations.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,white_8%,white_92%,transparent)]"
      >
        <div className="flex w-max p-3 animate-marquee gap-6 hover:[animation-play-state:paused]">
          {track.map((p, i) => (
            <div
              key={`${p.title}-${i}`}
              className="glass-card w-72 shrink-0 p-6 sm:w-80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/15 text-2xl text-accent-400">
                <p.icon />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-white/60">{p.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}