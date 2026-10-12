import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import api from "../../services/api";
import ImageUploadField from "./ImageUploadField";

const emptyForm = {
  name: "",
  logo: "",
  link: "",
  order: 0,
};

// These logos are what shows in the "Trusted by growing businesses"
// scrolling marquee on the homepage — upload a logo image, not text.
export default function AdminPartnersManager() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const load = async () => {
    try {
      const res = await api.get("/admin/partners");
      setItems(res.data);
    } catch (error) {
      console.error("Failed to load partners:", error);
      toast.error("Could not load partners");
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
    setForm(p);
  };

  const cancel = () => {
    setAdding(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Company name is required");
      return;
    }

    if (!form.logo) {
      toast.error("Please upload a logo image");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/admin/partners/${editingId}`, form);
        toast.success("Partner updated");
      } else {
        await api.post("/admin/partners", form);
        toast.success("Partner added");
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
    try {
      await api.delete(`/admin/partners/${id}`);
      toast.success("Partner removed");
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
          Partner Logos ({items.length})
        </h2>

        {!formOpen && (
          <button
            onClick={startAdd}
            className="btn-primary !px-4 !py-2 text-sm"
          >
            <FaPlus /> Add Partner
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
            placeholder="Company Name (used as alt text)"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <input
            type="number"
            placeholder="Order (lower shows first)"
            value={form.order}
            onChange={(e) =>
              setForm({
                ...form,
                order: Number(e.target.value),
              })
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <div className="sm:col-span-2">
            <ImageUploadField
              label="Logo Image *"
              value={form.logo}
              onChange={(url) =>
                setForm({
                  ...form,
                  logo: url,
                })
              }
            />
          </div>

          <input
            placeholder="Website Link (optional)"
            value={form.link}
            onChange={(e) =>
              setForm({
                ...form,
                link: e.target.value,
              })
            }
            className="sm:col-span-2 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <div className="flex gap-2 sm:col-span-2">
            <button
              type="submit"
              className="btn-primary flex-1 justify-center"
            >
              <FaSave />{" "}
              {editingId ? "Save Changes" : "Add Partner"}
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
              <th className="p-4">Logo</th>
              <th className="p-4">Name</th>
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
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="h-8 w-auto object-contain"
                  />
                </td>

                <td className="p-4">{p.name}</td>

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
                  colSpan={3}
                >
                  No partner logos yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}