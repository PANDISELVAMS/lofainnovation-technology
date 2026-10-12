import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    if (!target) return;
    const interval = setInterval(() => {
      const diff = new Date(target).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);
  return timeLeft;
}

export default function LaunchBanner() {
  const { data: banner, loading, error } = useFetch("/banner", null);
  const time = useCountdown(banner?.launchDate);

  if (error || (!loading && !banner)) return null;

  if (loading) {
    return (
      <section className="section">
        <div className="glass-card h-56 w-full animate-pulse md:h-48" />
      </section>
    );
  }

  return (
    <section className="section">
      <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-card relative overflow-hidden bg-gradient-to-r from-accent-600/30 via-transparent to-glow-pink/20 p-8 md:p-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">🚀 Product Launch</span>
            <h3 className="mt-4 font-display text-2xl font-bold md:text-3xl">{banner.heading}</h3>
            <p className="mt-2 max-w-md text-white/60">{banner.description}</p>
            {banner.launchDate && (
              <div className="mt-6 flex justify-center gap-3 md:justify-start">
                {["d", "h", "m", "s"].map((unit) => (
                  <div key={unit} className="glass w-16 rounded-xl py-2 text-center">
                    <div className="font-display text-xl font-bold">{time[unit]}</div>
                    <div className="text-[10px] uppercase text-white/40">{unit}</div>
                  </div>
                ))}
              </div>
            )}
            <a href={banner.externalLink} className="btn-primary mt-6 inline-flex">{banner.buttonText}</a>
          </div>
          {banner.bannerImage && <img src={banner.bannerImage} alt="Launch banner" className="w-full max-w-sm rounded-2xl md:w-1/2" />}
        </div>
      </motion.div>
    </section>
  );
}