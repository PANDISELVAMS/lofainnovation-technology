import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard";
import useFetch from "../hooks/useFetch";

const pricingPlans = [
  { name: "Basic Website", price: "Custom" },
  { name: "Business Website", price: "Custom" },
  { name: "E-Commerce", price: "Custom" },
  { name: "Custom Software", price: "Custom" },
  { name: "ERP", price: "Custom" },
  { name: "CRM", price: "Custom" },
  { name: "Mobile App", price: "Custom"},
];

export default function Services() {
  const { data: services, loading } = useFetch("/services", []);

  return (
    <div className="pt-28">
      <div className="section !pb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-400">Services</span>
        <h1 className="section-title mt-3">Everything you need to <span className="gradient-text">build & scale</span></h1>
      </div>
      <div className="section !pt-0">
        {loading ? (
          <p className="text-center text-white/40">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-center text-white/40">No services published yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (<ServiceCard key={s._id} service={s} index={i} />))}
          </div>
        )}
      </div>
      <div className="section">
        <h2 className="section-title text-center">Service Overvieww</h2>
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5"><tr><th className="p-4 font-semibold">Package</th><th className="p-4 font-semibold">Price</th></tr></thead>
            <tbody>
              {pricingPlans.map((p, i) => (
                <motion.tr key={p.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="border-t border-white/10 hover:bg-white/5">
                  <td className="p-4">{p.name}</td><td className="p-4 font-semibold text-accent-400">{p.price}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
