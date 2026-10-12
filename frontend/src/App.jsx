import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CursorFollower from "./components/CursorFollower";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RequireAdminAuth from "./components/admin/RequireAdminAuth";

// Marketing site backed by a real Node/Express/MongoDB API. Admin panel at
// /admin manages Launch Banner, Services, Products, Portfolio, Partners
// (logo marquee) and Careers — see backend/ for the API.
function SiteLayout({ children }) {
  return (
    <>
      <CursorFollower />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
        <Route path="/services" element={<SiteLayout><Services /></SiteLayout>} />
        <Route path="/products" element={<SiteLayout><Products /></SiteLayout>} />
        <Route path="/portfolio" element={<SiteLayout><Portfolio /></SiteLayout>} />
        <Route path="/about" element={<SiteLayout><About /></SiteLayout>} />
        <Route path="/careers" element={<SiteLayout><Careers /></SiteLayout>} />
        <Route path="/contact" element={<SiteLayout><Contact /></SiteLayout>} />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<RequireAdminAuth><AdminDashboard /></RequireAdminAuth>} />

        <Route path="*" element={<SiteLayout><NotFound /></SiteLayout>} />
      </Routes>
    </AnimatePresence>
  );
}
