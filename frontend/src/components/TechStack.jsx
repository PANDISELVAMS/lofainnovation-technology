import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaFigma, FaJava, FaPython } from "react-icons/fa";

// Small inline SVG for MongoDB — Font Awesome's free icon set doesn't
// include a MongoDB brand icon, so this avoids pulling in any extra
// icon package (which is what caused the earlier build errors).
function MongoDBIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#47A248">
      <path d="M12 2c-.3 0-.6.15-.78.4C9.7 5 7 9.2 7 13c0 3.6 2.3 6.4 4.4 7.8.35.25.85.25 1.2 0C14.7 19.4 17 16.6 17 13c0-3.8-2.7-8-4.22-10.6-.18-.25-.48-.4-.78-.4z" />
      <path d="M12 22v-8" stroke="#3FA037" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const technologies = [
  { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
  { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Node.js", icon: FaNodeJs, color: "#3C873A" },
  { name: "MongoDB", icon: MongoDBIcon, color: "#47A248" },
  { name: "Java", icon: FaJava, color: "#ff265c" },
  { name: "Python", icon: FaPython, color: "#2696ff" },
  { name: "Git", icon: FaGitAlt, color: "#F05032" },
  { name: "Figma", icon: FaFigma, color: "#F24E1E" },
];

const track = [...technologies, ...technologies];

export default function TechStack() {
  return (
    <section className="section">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-400">Our Stack</span>
        <h2 className="section-title mt-3">
          Technologies we <span className="gradient-text">work with</span>
        </h2>
        <p className="mt-4 text-white/60">
          We use modern, reliable, and industry-proven technologies to build
          high-quality digital products.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,white_8%,white_92%,transparent)]"
      >
        <div className="flex w-max p-3 animate-marquee gap-6 hover:[animation-play-state:paused]">
          {track.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="glass-card flex w-32 shrink-0 flex-col items-center gap-3 p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <t.icon className="h-9 w-9" style={{ color: t.color }} />
              <span className="text-xs font-medium text-white/70">{t.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}