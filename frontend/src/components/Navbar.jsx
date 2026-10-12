import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const links = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Products", path: "/products" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "About", path: "/about" },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "glass py-3" : "bg-transparent py-5"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        <Link to="/" className="font-display text-xl font-bold tracking-tight">LOFA<span className="text-accent-400">.</span></Link>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.path}>
              <NavLink to={l.path} className={({ isActive }) => `text-sm font-medium transition-colors hover:text-accent-400 ${isActive ? "text-accent-400" : "text-white/80"}`}>{l.name}</NavLink>
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/contact" className="btn-primary !px-5 !py-2 text-sm">Get a Quote</Link>
        </div>
        <button className="text-2xl md:hidden" onClick={() => setOpen(!open)}>{open ? <HiX /> : <HiMenuAlt3 />}</button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="glass mx-4 mt-3 overflow-hidden rounded-2xl md:hidden">
            <ul className="flex flex-col gap-1 p-4">
              {links.map((l) => (
                <li key={l.path}><NavLink to={l.path} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-white/80 hover:bg-white/5">{l.name}</NavLink></li>
              ))}
              <li className="mt-2">
                <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary block w-full justify-center !py-2 text-sm">Get a Quote</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
