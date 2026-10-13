
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

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
  launchUrl: "",
  demoUrl: "",
  isActive: true,
};

const toCsv = (arr) => (Array.isArray(arr) ? arr : []).join(", ");

const fromCsv = (str) =>
  (str || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export default function AdminProductsManager() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });

  // Load products without returning a Promise from useEffect.
  const load = async () => {
    try {
      const res = await api.get("/admin/products");

      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to load products:", error);
      toast.error("Could not load products");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const startAdd = () => {
    setAdding(true);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setAdding(false);

    setForm({
      ...emptyForm,
      ...product,
      features: toCsv(product.features),
      technology: toCsv(product.technology),
    });
  };

  const cancel = () => {
    setAdding(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  const submit = async (event) => {
    event.preventDefault();

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
      await load();
    } catch (error) {
      console.error("Failed to save product:", error);

      toast.error(
        error.response?.data?.message || "Could not save product"
      );
    }
  };

  const remove = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/admin/products/${id}`);

      toast.success("Product deleted");
      await load();
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Could not delete product");
    }
  };

  const formOpen = adding || Boolean(editingId);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold">
          Products ({products.length})
        </h2>

        {!formOpen && (
          <button
            type="button"
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
            onChange={(event) =>
              updateField("name", event.target.value)
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <select
            value={form.status}
            onChange={(event) =>
              updateField("status", event.target.value)
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(event) =>
              updateField("description", event.target.value)
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10 sm:col-span-2"
          />

          <div className="sm:col-span-2">
            <ImageUploadField
              label="Product Image"
              value={form.image}
              onChange={(url) => updateField("image", url)}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-white/50">
              Launch Link
            </label>
            <input
              type="url"
              placeholder="https://yourproduct.com"
              value={form.launchUrl}
              onChange={(event) =>
                updateField("launchUrl", event.target.value)
              }
              className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-white/50">
              Demo Link
            </label>
            <input
              type="url"
              placeholder="https://demo.yourproduct.com"
              value={form.demoUrl}
              onChange={(event) =>
                updateField("demoUrl", event.target.value)
              }
              className="w-full rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
            />
          </div>

          <input
            placeholder="Features, comma separated"
            value={form.features}
            onChange={(event) =>
              updateField("features", event.target.value)
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <input
            placeholder="Technology, comma separated"
            value={form.technology}
            onChange={(event) =>
              updateField("technology", event.target.value)
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <label className="flex items-center gap-2 text-sm text-white/60 sm:col-span-2">
            <input
              type="checkbox"
              checked={Boolean(form.isActive)}
              onChange={(event) =>
                updateField("isActive", event.target.checked)
              }
            />
            Published (visible on the live site)
          </label>

          <div className="flex gap-2 sm:col-span-2">
            <button
              type="submit"
              className="btn-primary flex-1 justify-center"
            >
              <FaSave />
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

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Launch Link</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t border-white/10"
              >
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.status}</td>
                <td className="p-4 text-xs text-white/50">
                  {product.launchUrl || "—"}
                </td>
                <td className="p-4">
                  <div className="flex gap-3 text-white/60">
                    <button
                      type="button"
                      aria-label={`Edit ${product.name}`}
                      onClick={() => startEdit(product)}
                      className="hover:text-accent-400"
                    >
                      <FaEdit />
                    </button>

                    <button
                      type="button"
                      aria-label={`Delete ${product.name}`}
                      onClick={() => remove(product._id)}
                      className="hover:text-red-400"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td
                  className="p-4 text-white/40"
                  colSpan={4}
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
