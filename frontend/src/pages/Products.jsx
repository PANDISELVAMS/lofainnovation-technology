import ProductCard from "../components/ProductCard";
import LaunchBanner from "../components/LaunchBanner";
import useFetch from "../hooks/useFetch";

export default function Products() {
  const { data: products, loading } = useFetch("/products", []);

  return (
    <div className="pt-28">
      <div className="section !pb-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent-400">Products</span>
        <h1 className="section-title mt-3">Software built <span className="gradient-text">by LOFA</span></h1>
      </div>
      <LaunchBanner />
      <div className="section !pt-0">
        {loading ? (
          <p className="text-center text-white/40">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-white/40">No products published yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => (<ProductCard key={p._id} product={p} index={i} />))}
          </div>
        )}
      </div>
    </div>
  );
}
