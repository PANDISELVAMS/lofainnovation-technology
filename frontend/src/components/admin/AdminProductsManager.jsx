import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import api from "../../services/api";
import ImageUploadField from "./ImageUploadField";

const statusOptions = ["Coming Soon", "Live", "Beta", "New"];

const emptyForm = {
  name: "",
  description: "",
  image: "",
  status: "Coming Soon",
  features: "",
  technology: "",
  isActive: true,
};

const toCsv = (arr) => (arr || []).join(", ");

const fromCsv = (str) =>
  str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

export default function AdminProductsManager() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const load = async () => {
    try {
      const res = await api.get("/admin/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to load products:", error);
      toast.error("Could not load products");
    }
  };

  // FIXED: Don't pass async/promise-returning function directly
  // to useEffect as the effect callback.
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
      features: toCsv(p.features),
      technology: toCsv(p.technology),
    });
  };

  const cancel = () => {
    setAdding(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    const payload = {
      ...form,
      features: fromCsv(form.features),
      technology: fromCsv(form.technology),
    };

    try {
      if (editingId) {
        await api.put(`/admin/products/${editingId}`, payload);
        toast.success("Product updated");
      } else {
        await api.post("/admin/products", payload);
        toast.success("Product added");
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
      await api.delete(`/admin/products/${id}`);
      toast.success("Product deleted");
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
          Products ({products.length})
        </h2>

        {!formOpen && (
          <button
            onClick={startAdd}
            className="btn-primary !px-4 !py-2 text-sm"
          >
            <FaPlus /> Add Product
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
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          >
            {statusOptions.map((s) => (
              <option className="bg-black" key={s}>{s}</option>
            ))}
          </select>

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="sm:col-span-2 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <div className="sm:col-span-2">
            <ImageUploadField
              label="Product Image"
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
            placeholder="Features, comma separated"
            value={form.features}
            onChange={(e) =>
              setForm({
                ...form,
                features: e.target.value,
              })
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <input
            placeholder="Technology, comma separated"
            value={form.technology}
            onChange={(e) =>
              setForm({
                ...form,
                technology: e.target.value,
              })
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <label className="flex items-center gap-2 text-sm text-white/60 sm:col-span-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm({
                  ...form,
                  isActive: e.target.checked,
                })
              }
            />{" "}
            Published (visible on the live site)
          </label>

          <div className="flex gap-2 sm:col-span-2">
            <button
              type="submit"
              className="btn-primary flex-1 justify-center"
            >
              <FaSave />{" "}
              {editingId ? "Save Changes" : "Add Product"}
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
              <th className="p-4">Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-t border-white/10"
              >
                <td className="p-4">{p.name}</td>

                <td className="p-4">{p.status}</td>

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

            {products.length === 0 && (
              <tr>
                <td
                  className="p-4 text-white/40"
                  colSpan={3}
                >
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}