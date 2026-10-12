import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import useFetch from "../hooks/useFetch";

function ProductCardSkeleton() {
  return (
    <div className="glass-card animate-pulse overflow-hidden">
      <div className="h-48 w-full bg-white/10" />
      <div className="p-6">
        <div className="h-5 w-2/3 rounded bg-white/10" />
        <div className="mt-2 h-4 w-full rounded bg-white/5" />
        <div className="mt-2 h-4 w-5/6 rounded bg-white/5" />
        <div className="mt-5 h-9 w-full rounded-lg bg-white/5" />
      </div>
    </div>
  );
}

export default function ProductsGrid() {
  const { data: products, loading } = useFetch("/products", []);
  if (!loading && products.length === 0) return null;

  const preview = products.slice(0, 2);

  return (
    <section className="section">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-400">Our Products</span>
        <h2 className="section-title mt-3">Built by LOFA, <span className="gradient-text">used by teams</span></h2>
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {loading
          ? Array.from({ length: 2 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : preview.map((p, i) => (<ProductCard key={p._id} product={p} index={i} />))}
      </div>
      {!loading && products.length > 2 && (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 text-center">
          <Link to="/products" className="btn-outline">View All Products</Link>
        </motion.div>
      )}
    </section>
  );
}