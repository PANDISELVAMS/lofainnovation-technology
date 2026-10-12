import useFetch from "../hooks/useFetch";

export default function ClientShowcase() {
  const { data: partners, loading } = useFetch("/partners", []);
  if (!loading && partners.length === 0) return null;

  const track = loading ? [] : [...partners, ...partners];

  return (
    <section className="section !py-14">
      <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-white/40">Trusted by growing businesses</p>
      {loading ? (
        <div className="flex justify-center gap-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 w-24 animate-pulse rounded bg-white/10 sm:h-12 sm:w-28" />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,white_10%,white_90%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-16">
            {track.map((p, i) => {
              const logo = (
                <img key={`${p._id}-${i}`} src={p.logo} alt={p.name} title={p.name} className="h-10 w-auto shrink-0 object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-12" />
              );
              return p.link ? (<a key={`${p._id}-${i}-link`} href={p.link} target="_blank" rel="noreferrer">{logo}</a>) : logo;
            })}
          </div>
        </div>
      )}
    </section>
  );
}