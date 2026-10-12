import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-base-900">
      <div className="section grid gap-10 py-16 md:grid-cols-4">
        <div>
          <h3 className="font-display text-xl font-bold">LOFA<span className="text-accent-400">.</span></h3>
          <p className="mt-3 text-sm text-white/60">Logic Focus in Code — building enterprise software, products & AI solutions.</p>
          <div className="mt-5 flex gap-4 text-lg text-white/70">
            <a href="https://www.linkedin.com/in/lofa-innovation-technology" className="hover:text-accent-400"><FaLinkedin /></a>
            <a href="https://www.instagram.com/lofa_code?mdxt=cTgwbG1rYjB3dDA5" className="hover:text-accent-400"><FaInstagram /></a>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
            <li><Link to="/portfolio" className="hover:text-white">Portfolio</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Services</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/services" className="hover:text-white">Web & App Development</Link></li>
            <li><Link to="/services" className="hover:text-white">ERP / CRM Systems</Link></li>
            <li><Link to="/services" className="hover:text-white">AI Solutions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Get in touch</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><a href="mailto:lofainnovaationtechnology@gmail.com" className="hover:text-white">hello@lofa.dev</a></li>
            <li><Link to="/contact" className="hover:text-white">Contact Form</Link></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 border-t border-white/10 py-6 text-center text-xs text-white/40 sm:flex-row sm:justify-between sm:px-6 md:px-10">
        <span>© {new Date().getFullYear()} LOFA. All rights reserved.</span>
        <Link to="/admin" className="hover:text-white/70">Admin</Link>
      </div>
    </footer>
  );
}
