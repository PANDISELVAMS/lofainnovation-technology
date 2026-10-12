import { useEffect, useState } from "react";
import api from "../services/api";

// In-memory cache shared across the whole browser tab session (resets on
// a full page reload). This is what fixes the "feels slow every time"
// problem: once a page's data has loaded once, switching back to it shows
// the cached data INSTANTLY while quietly re-fetching fresh data in the
// background (stale-while-revalidate).
const cache = new Map();

export default function useFetch(endpoint, fallback) {
  const cached = cache.get(endpoint);
  const [data, setData] = useState(cached ?? fallback);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    if (!cache.has(endpoint)) setLoading(true);

    api.get(endpoint)
      .then((res) => {
        if (!active) return;
        cache.set(endpoint, res.data);
        setData(res.data);
        setError(false);
      })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  const reload = () => {
    cache.delete(endpoint);
    setLoading(true);
    api.get(endpoint)
      .then((res) => { cache.set(endpoint, res.data); setData(res.data); setError(false); })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  return { data, loading, error, reload };
}