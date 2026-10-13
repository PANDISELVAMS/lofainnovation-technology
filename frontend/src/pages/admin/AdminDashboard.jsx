import { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaTools,
  FaBoxOpen,
  FaBriefcase,
  FaBullhorn,
  FaImages,
  FaHandshake,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAdminAuth } from "../../context/AdminAuthContext";

import AdminServicesManager from "../../components/admin/AdminServicesManager";
import AdminProductsManager from "../../components/admin/AdminProductsManager";
import AdminBannerManager from "../../components/admin/AdminBannerManager";
import AdminPortfolioManager from "../../components/admin/AdminPortfolioManager";
import AdminPartnersManager from "../../components/admin/AdminPartnersManager";
import AdminCareersManager from "../../components/admin/AdminCareersManager";

const TABS = [
  {
    key: "banner",
    label: "Launch Banner",
    icon: FaBullhorn,
    Component: AdminBannerManager,
  },
  {
    key: "services",
    label: "Services",
    icon: FaTools,
    Component: AdminServicesManager,
  },
  {
    key: "products",
    label: "Products",
    icon: FaBoxOpen,
    Component: AdminProductsManager,
  },
  {
    key: "portfolio",
    label: "Portfolio",
    icon: FaImages,
    Component: AdminPortfolioManager,
  },
  {
    key: "partners",
    label: "Partners",
    icon: FaHandshake,
    Component: AdminPartnersManager,
  },
  {
    key: "careers",
    label: "Careers",
    icon: FaBriefcase,
    Component: AdminCareersManager,
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("banner");
  const { logout } = useAdminAuth();

  const selectedTab = TABS.find(
    (item) => item.key === activeTab
  );

  const ActiveComponent = selectedTab?.Component;

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleLogout = () => {
    if (typeof logout === "function") {
      logout();
    } else {
      console.error("Admin logout function is unavailable.");
    }
  };

  return (
    <div className="min-h-screen bg-base-950 text-white">
      {/* Header */}
      <header className="glass fixed inset-x-0 top-0 z-50 w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-10">
          <Link
            to="/"
            className="shrink-0 font-display text-lg font-bold tracking-tight"
          >
            LOFA
            <span className="text-accent-400">.</span>
            <span className="ml-2 text-sm font-normal text-white/50">
              Admin
            </span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="btn-outline flex shrink-0 items-center gap-2 !px-4 !py-2 text-sm"
          >
            <FaSignOutAlt aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Dashboard content */}
      <main className="mx-auto w-full max-w-7xl px-4 pb-10 pt-28 sm:px-6 md:px-10">
        <section
          aria-label="Admin sections"
          className="mb-6 border-b border-white/10 pb-4"
        >
          <div className="flex flex-wrap gap-2">
            {TABS.map(({ key, label, icon: Icon }) => {
              const isActive = activeTab === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleTabChange(key)}
                  aria-pressed={isActive}
                  className={[
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm",
                    "transition-colors duration-200",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400",
                    isActive
                      ? "bg-accent-500 text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white",
                  ].join(" ")}
                >
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Active tab */}
        <section
          key={activeTab}
          aria-label={`${selectedTab?.label || "Admin"} content`}
          className="min-w-0"
        >
          {ActiveComponent ? (
            <ActiveComponent />
          ) : (
            <p className="rounded-xl border border-white/10 p-5 text-white/60">
              Unable to load this admin section. Please select another tab.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
