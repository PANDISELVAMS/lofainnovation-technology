import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTools, FaBoxOpen, FaBriefcase, FaBullhorn, FaImages, FaHandshake, FaSignOutAlt } from "react-icons/fa";
import { useAdminAuth } from "../../context/AdminAuthContext";
import AdminServicesManager from "../../components/admin/AdminServicesManager";
import AdminProductsManager from "../../components/admin/AdminProductsManager";
import AdminBannerManager from "../../components/admin/AdminBannerManager";
import AdminPortfolioManager from "../../components/admin/AdminPortfolioManager";
import AdminPartnersManager from "../../components/admin/AdminPartnersManager";
import AdminCareersManager from "../../components/admin/AdminCareersManager";

const tabs = [
  { key: "banner", label: "Launch Banner", icon: FaBullhorn, Component: AdminBannerManager },
  { key: "services", label: "Services", icon: FaTools, Component: AdminServicesManager },
  { key: "products", label: "Products", icon: FaBoxOpen, Component: AdminProductsManager },
  { key: "portfolio", label: "Portfolio", icon: FaImages, Component: AdminPortfolioManager },
  { key: "partners", label: "Partners", icon: FaHandshake, Component: AdminPartnersManager },
  { key: "careers", label: "Careers", icon: FaBriefcase, Component: AdminCareersManager },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState("banner");
  const { logout } = useAdminAuth();

  const Active = tabs.find((t) => t.key === tab).Component;

  return (
    <div className="min-h-screen bg-base-950">
      <header className="glass fixed top-0 z-50 w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <Link to="/" className="font-display text-lg font-bold tracking-tight">LOFA<span className="text-accent-400">.</span> <span className="text-sm font-normal text-white/50">Admin</span></Link>
          <button onClick={logout} className="btn-outline !px-4 !py-2 text-sm"><FaSignOutAlt /> Logout</button>
        </div>
      </header>

      <main className="p-6 pt-28 md:p-10 md:pt-28">
        <div className="mb-6 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${tab === t.key ? "bg-accent-500 text-white" : "text-white/60 hover:bg-white/5"}`}>
              <t.icon /> {t.label}
            </button>
          ))}
        </div>
        <Active />
      </main>
    </div>
  );
}
