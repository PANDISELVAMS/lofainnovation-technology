import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaSave } from "react-icons/fa";
import api from "../../services/api";
import ImageUploadField from "./ImageUploadField";

const emptyForm = { heading: "", description: "", bannerImage: "", launchDate: "", buttonText: "Notify Me", externalLink: "/products", isActive: true };

function toDateInputValue(iso) {
  if (!iso) return "";
  return new Date(iso).toISOString().slice(0, 16);
}

// This is the "Product Launch Bar" shown on Home & Products pages —
// there's only ever ONE, so this is a single edit form, not a list.
export default function AdminBannerManager() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get("/admin/banner").then((res) => {
      if (res.data) setForm({ ...emptyForm, ...res.data, launchDate: toDateInputValue(res.data.launchDate) });
    }).catch(() => toast.error("Could not load banner")).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.heading.trim()) { toast.error("Heading is required"); return; }
    try {
      await api.put("/admin/banner", form);
      toast.success("Launch banner saved — live on the site now");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not save banner");
    }
  };

  if (loading) return <p className="text-white/40">Loading banner...</p>;

  return (
    <div>
      <h2 className="mb-4 font-display text-xl font-semibold">Product Launch Bar</h2>
      <p className="mb-4 text-sm text-white/50">This banner shows on the Home and Products pages, with a live countdown if you set a launch date.</p>
      <form onSubmit={submit} className="glass-card grid gap-3 p-5 sm:grid-cols-2">
        <input required placeholder="Heading" value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })} className="sm:col-span-2 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="sm:col-span-2 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10" />
        <div className="sm:col-span-2">
          <ImageUploadField label="Banner Image" value={form.bannerImage} onChange={(url) => setForm({ ...form, bannerImage: url })} />
        </div>
        <div>
          <label className="mb-1 block text-xs text-white/50">Launch Date & Time (optional — shows a countdown)</label>
          <input type="datetime-local" value={form.launchDate} onChange={(e) => setForm({ ...form, launchDate: e.target.value })} className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10" />
        </div>
        <input placeholder="Button Text" value={form.buttonText} onChange={(e) => setForm({ ...form, buttonText: e.target.value })} className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10" />
        <input placeholder="Button Link" value={form.externalLink} onChange={(e) => setForm({ ...form, externalLink: e.target.value })} className="sm:col-span-2 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10" />
        <label className="flex items-center gap-2 text-sm text-white/60 sm:col-span-2">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Show on the live site
        </label>
        <button className="btn-primary sm:col-span-2 justify-center"><FaSave /> Save Launch Banner</button>
      </form>
    </div>
  );
}
