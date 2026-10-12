import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import api from "../../services/api";
import ImageUploadField from "./ImageUploadField";

const emptyForm = {
  client: "",
  type: "",
  technologies: "",
  duration: "",
  image: "",
  liveLink: "",
  githubLink: "",
  isFeatured: false,
};

const toCsv = (arr) => (arr || []).join(", ");

const fromCsv = (str) =>
  str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

// Portfolio items support a real uploaded image (Cloudinary), full
// add/edit/delete — this is the "project image" the person asked for.
export default function AdminPortfolioManager() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const load = async () => {
    try {
      const res = await api.get("/admin/portfolio");
      setItems(res.data);
    } catch (error) {
      console.error("Failed to load portfolio:", error);
      toast.error("Could not load portfolio");
    }
  };

  // FIXED: Don't pass load directly to useEffect
  useEffect(() => {
    load();
  }, []);

  const startAdd = () => {
    setAdding(true);
    setEditingId(null);
    setForm(emptyForm);
  };

  const startEdit = (p) => {
    setEditingId(p._id);
    setAdding(false);

    setForm({
      ...p,
      technologies: toCsv(p.technologies),
    });
  };

  const cancel = () => {
    setAdding(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.client.trim()) {
      toast.error("Client name is required");
      return;
    }

    const payload = {
      ...form,
      technologies: fromCsv(form.technologies),
    };

    try {
      if (editingId) {
        await api.put(`/admin/portfolio/${editingId}`, payload);
        toast.success("Project updated");
      } else {
        await api.post("/admin/portfolio", payload);
        toast.success("Project added");
      }

      cancel();
      load();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Could not save"
      );
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this portfolio project?")) return;

    try {
      await api.delete(`/admin/portfolio/${id}`);
      toast.success("Project deleted");
      load();
    } catch {
      toast.error("Could not delete");
    }
  };

  const formOpen = adding || editingId;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold">
          Portfolio ({items.length})
        </h2>

        {!formOpen && (
          <button
            onClick={startAdd}
            className="btn-primary !px-4 !py-2 text-sm"
          >
            <FaPlus /> Add Project
          </button>
        )}
      </div>

      {formOpen && (
        <form
          onSubmit={submit}
          className="glass-card mb-6 grid gap-3 p-5 sm:grid-cols-2"
        >
          <input
            required
            placeholder="Client Name"
            value={form.client}
            onChange={(e) =>
              setForm({
                ...form,
                client: e.target.value,
              })
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <input
            placeholder="Project Type (e.g. E-Commerce Platform)"
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value,
              })
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <div className="sm:col-span-2">
            <ImageUploadField
              label="Project Image"
              value={form.image}
              onChange={(url) =>
                setForm({
                  ...form,
                  image: url,
                })
              }
            />
          </div>

          <input
            placeholder="Duration (e.g. 8 weeks)"
            value={form.duration}
            onChange={(e) =>
              setForm({
                ...form,
                duration: e.target.value,
              })
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <input
            placeholder="Technologies, comma separated"
            value={form.technologies}
            onChange={(e) =>
              setForm({
                ...form,
                technologies: e.target.value,
              })
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <input
            placeholder="Live Link"
            value={form.liveLink}
            onChange={(e) =>
              setForm({
                ...form,
                liveLink: e.target.value,
              })
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <input
            placeholder="GitHub Link"
            value={form.githubLink}
            onChange={(e) =>
              setForm({
                ...form,
                githubLink: e.target.value,
              })
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <label className="flex items-center gap-2 text-sm text-white/60 sm:col-span-2">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) =>
                setForm({
                  ...form,
                  isFeatured: e.target.checked,
                })
              }
            />{" "}
            Featured project
          </label>

          <div className="flex gap-2 sm:col-span-2">
            <button
              type="submit"
              className="btn-primary flex-1 justify-center"
            >
              <FaSave />{" "}
              {editingId ? "Save Changes" : "Add Project"}
            </button>

            <button
              type="button"
              onClick={cancel}
              className="btn-outline flex-1 justify-center"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Client</th>
              <th className="p-4">Type</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((p) => (
              <tr
                key={p._id}
                className="border-t border-white/10"
              >
                <td className="p-4">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.client}
                      className="h-10 w-16 rounded object-cover"
                    />
                  ) : (
                    <span className="text-white/30">—</span>
                  )}
                </td>

                <td className="p-4">{p.client}</td>

                <td className="p-4">{p.type}</td>

                <td className="flex gap-3 p-4 text-white/60">
                  <button
                    onClick={() => startEdit(p)}
                    className="hover:text-accent-400"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => remove(p._id)}
                    className="hover:text-red-400"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td
                  className="p-4 text-white/40"
                  colSpan={4}
                >
                  No portfolio projects yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}