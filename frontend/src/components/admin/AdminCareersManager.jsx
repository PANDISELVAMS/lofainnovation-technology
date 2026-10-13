import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import api from "../../services/api";

const emptyForm = { title: "", type: "Full-time", location: "Remote", experience: "", description: "", requirements: "", isActive: true };

// Requirements are typed one per line in the admin form, stored as an array.
const linesToArray = (str) => str.split("\n").map((s) => s.trim()).filter(Boolean);
const arrayToLines = (arr) => (arr || []).join("\n");

export default function AdminCareersManager() {
  const [positions, setPositions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const load = () => api.get("/admin/positions").then((res) => setPositions(res.data)).catch(() => toast.error("Could not load positions"));
  useEffect(load, []);

  const startAdd = () => { setAdding(true); setEditingId(null); setForm(emptyForm); };
  const startEdit = (p) => { setEditingId(p._id); setAdding(false); setForm({ ...emptyForm, ...p, requirements: arrayToLines(p.requirements) }); };
  const cancel = () => { setAdding(false); setEditingId(null); setForm(emptyForm); };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("Position title is required"); return; }
    const payload = { ...form, requirements: linesToArray(form.requirements) };
    try {
      if (editingId) { await api.put(`/admin/positions/${editingId}`, payload); toast.success("Position updated"); }
      else { await api.post("/admin/positions", payload); toast.success("Position added"); }
      cancel(); load();
    } catch (err) { toast.error(err.response?.data?.message || "Could not save"); }
  };

  const remove = async (id) => {
    try { await api.delete(`/admin/positions/${id}`); toast.success("Position removed"); load(); }
    catch { toast.error("Could not delete"); }
  };

  const formOpen = adding || editingId;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">Careers ({positions.length})</h2>
        {!formOpen && (<button onClick={startAdd} className="btn-primary !px-4 !py-2 text-sm"><FaPlus /> Add Position</button>)}
      </div>

      {formOpen && (
        <form onSubmit={submit} className="glass-card mb-6 grid gap-3 p-5 sm:grid-cols-3">
          <input required placeholder="Position Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="sm:col-span-3 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10" />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10">
            <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
          </select>
          <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10">
            <option>Remote</option><option>Hybrid</option><option>On-site</option>
          </select>
          <input placeholder="Experience (e.g. 1-3 years / Fresher)" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10" />
          <div className="sm:col-span-3">
            <label className="mb-1 block text-xs text-white/50">Job Description</label>
            <textarea rows={4} placeholder="Describe the role, responsibilities, what the person will work on..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10" />
          </div>
          <div className="sm:col-span-3">
            <label className="mb-1 block text-xs text-white/50">Requirements (one per line)</label>
            <textarea rows={4} placeholder={"Strong knowledge of React\nExperience with REST APIs\nGood communication skills"} value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10" />
          </div>
          <label className="flex items-center gap-2 text-sm text-white/60 sm:col-span-3">
            <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Published (visible on the Careers page)
          </label>
          <div className="flex gap-2 sm:col-span-3">
            <button className="btn-primary flex-1 justify-center"><FaSave /> {editingId ? "Save Changes" : "Add Position"}</button>
            <button type="button" onClick={cancel} className="btn-outline flex-1 justify-center"><FaTimes /> Cancel</button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5"><tr><th className="p-4">Title</th><th className="p-4">Type</th><th className="p-4">Location</th><th className="p-4">Experience</th><th className="p-4">Actions</th></tr></thead>
          <tbody>
            {positions.map((p) => (
              <tr key={p._id} className="border-t border-white/10">
                <td className="p-4">{p.title}</td>
                <td className="p-4">{p.type}</td>
                <td className="p-4">{p.location}</td>
                <td className="p-4">{p.experience || "—"}</td>
                <td className="p-4 flex gap-3 text-white/60">
                  <button onClick={() => startEdit(p)} className="hover:text-accent-400"><FaEdit /></button>
                  <button onClick={() => remove(p._id)} className="hover:text-red-400"><FaTrash /></button>
                </td>
              </tr>
            ))}
            {positions.length === 0 && (<tr><td className="p-4 text-white/40" colSpan={5}>No open positions.</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}