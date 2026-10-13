import { motion } from "framer-motion";
import { FaRocket, FaPlayCircle } from "react-icons/fa";

const statusStyles = {
  Live: "bg-green-500/15 text-green-400",
  Beta: "bg-yellow-500/15 text-yellow-400",
  New: "bg-glow-teal/15 text-glow-teal",
  "Coming Soon": "bg-white/10 text-white/60",
};

// Admin might type "example.com" without https:// — add it so the link
// opens the external site instead of a broken relative URL.
const normalizeUrl = (url) => {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

export default function ProductCard({ product, index }) {
  const launchHref = normalizeUrl(product.launchUrl);
  const demoHref = normalizeUrl(product.demoUrl);

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index % 3) * 0.1 }} className="glass-card overflow-hidden">
      <div className="relative">
        <img src={product.image || "https://placehold.co/600x400/12141f/6d5bff?text=" + encodeURIComponent(product.name)} alt={product.name} className="h-48 w-full object-cover" />
        <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold ${statusStyles[product.status]}`}>{product.status}</span>
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold">{product.name}</h3>
        <p className="mt-2 text-sm text-white/60">{product.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {(product.technology || []).map((t) => (<span key={t} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/50">{t}</span>))}
        </div>
        <div className="mt-5 flex gap-3">
          {launchHref ? (
            <a href={launchHref} target="_blank" rel="noreferrer" className="btn-primary flex-1 justify-center !py-2 text-sm">
              <FaRocket className="text-xs" /> Launch
            </a>
          ) : (
            <span title="Link not added yet" className="btn-primary pointer-events-none flex-1 justify-center !py-2 text-sm opacity-40">
              <FaRocket className="text-xs" /> Launch
            </span>
          )}
          {demoHref ? (
            <a href={demoHref} target="_blank" rel="noreferrer" className="btn-outline flex-1 justify-center !py-2 text-sm">
              <FaPlayCircle className="text-xs" /> Demo
            </a>
          ) : (
            <span title="Demo not available yet" className="btn-outline pointer-events-none flex-1 justify-center !py-2 text-sm opacity-40">
              <FaPlayCircle className="text-xs" /> Demo
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}