
import { useCallback, useEffect, useState } from "react";
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

const toCsv = (value) => {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "string") {
    return value;
  }

  return "";
};

const fromCsv = (value) => {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const normalizeProduct = (product) => ({
  ...product,
  name: product?.name ?? "",
  description: product?.description ?? "",
  image: product?.image ?? "",
  status: statusOptions.includes(product?.status)
    ? product.status
    : "Coming Soon",
  features: toCsv(product?.features),
  technology: toCsv(product?.technology),
  launchUrl: product?.launchUrl ?? "",
  demoUrl: product?.demoUrl ?? "",
  isActive: product?.isActive ?? true,
});

export default function AdminProductsManager() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api.get("/admin/products");

      // Avoid crashing if the API response is not an array.
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.products)
          ? res.data.products
          : [];

      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
      toast.error(
        error.response?.data?.message ||
          "Could not load products"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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
    if (!product?._id) {
      toast.error("Invalid product selected");
      return;
    }

    setEditingId(product._id);
    setAdding(false);
    setForm(normalizeProduct(product));
  };

  const cancel = () => {
    setAdding(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  const submit = async (event) => {
    event.preventDefault();

    if (saving) return;

    if (!form.name.trim()) {
      toast.error("Product name is required");
      return;
    }

    const payload = {
      ...form,
      name: form.name.trim(),
      features: fromCsv(form.features),
      technology: fromCsv(form.technology),
    };

    setSaving(true);

    try {
      if (editingId) {
        await api.put(
          `/admin/products/${editingId}`,
          payload
        );
        toast.success("Product updated successfully");
      } else {
        await api.post("/admin/products", payload);
        toast.success("Product added successfully");
      }

      cancel();
      await load();
    } catch (error) {
      console.error("Failed to save product:", error);

      toast.error(
        error.response?.data?.message ||
          "Could not save product"
      );
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!id || deletingId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setDeletingId(id);

    try {
      await api.delete(`/admin/products/${id}`);

      toast.success("Product deleted successfully");

      setProducts((previous) =>
        previous.filter((product) => product._id !== id)
      );

      if (editingId === id) {
        cancel();
      }
    } catch (error) {
      console.error("Failed to delete product:", error);

      toast.error(
        error.response?.data?.message ||
          "Could not delete product"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const formOpen = adding || Boolean(editingId);

  return (
    <section className="w-full min-w-0">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold">
            Products ({products.length})
          </h2>

          <p className="mt-1 text-sm text-white/50">
            Manage products, images, demos and launch links.
          </p>
        </div>

        {!formOpen && (
          <button
            type="button"
            onClick={startAdd}
            className="btn-primary !px-4 !py-2 text-sm"
          >
            <FaPlus />
            <span>Add Product</span>
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {formOpen && (
        <form
          onSubmit={submit}
          className="glass-card mb-6 grid min-w-0 gap-4 p-5 sm:grid-cols-2"
        >
          <div className="min-w-0">
            <label className="mb-1 block text-xs text-white/60">
              Product Name *
            </label>

            <input
              required
              value={form.name}
              onChange={(event) =>
                updateField("name", event.target.value)
              }
              placeholder="Enter product name"
              className="w-full min-w-0 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
            />
          </div>

          <div className="min-w-0">
            <label className="mb-1 block text-xs text-white/60">
              Status
            </label>

            <select
              value={form.status}
              onChange={(event) =>
                updateField("status", event.target.value)
              }
              className="w-full min-w-0 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs text-white/60">
              Description
            </label>

            <textarea
              rows={3}
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              placeholder="Describe your product"
              className="w-full min-w-0 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
            />
          </div>

          <div className="min-w-0 sm:col-span-2">
            <ImageUploadField
              label="Product Image"
              value={form.image}
              onChange={(url) => updateField("image", url)}
            />
          </div>

          <div className="min-w-0">
            <label className="mb-1 block text-xs text-white/60">
              Launch Link
            </label>

            <input
              type="url"
              value={form.launchUrl}
              onChange={(event) =>
                updateField("launchUrl", event.target.value)
              }
              placeholder="https://yourproduct.com"
              className="w-full min-w-0 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
            />
          </div>

          <div className="min-w-0">
            <label className="mb-1 block text-xs text-white/60">
              Demo Link
            </label>

            <input
              type="url"
              value={form.demoUrl}
              onChange={(event) =>
                updateField("demoUrl", event.target.value)
              }
              placeholder="https://demo.yourproduct.com"
              className="w-full min-w-0 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
            />
          </div>

          <div className="min-w-0">
            <label className="mb-1 block text-xs text-white/60">
              Features (comma separated)
            </label>

            <input
              value={form.features}
              onChange={(event) =>
                updateField("features", event.target.value)
              }
              placeholder="Dashboard, Analytics, Security"
              className="w-full min-w-0 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
            />
          </div>

          <div className="min-w-0">
            <label className="mb-1 block text-xs text-white/60">
              Technology (comma separated)
            </label>

            <input
              value={form.technology}
              onChange={(event) =>
                updateField("technology", event.target.value)
              }
              placeholder="React, Node.js, MongoDB"
              className="w-full min-w-0 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-white/70 sm:col-span-2">
            <input
              type="checkbox"
              checked={Boolean(form.isActive)}
              onChange={(event) =>
                updateField("isActive", event.target.checked)
              }
            />
            Published (visible on the live site)
          </label>

          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex-1 justify-center disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaSave />
              <span>
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Save Changes"
                    : "Add Product"}
              </span>
            </button>

            <button
              type="button"
              onClick={cancel}
              disabled={saving}
              className="btn-outline flex-1 justify-center disabled:opacity-60"
            >
              <FaTimes />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      )}

      {/* Products Table */}
      <div className="w-full min-w-0 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Launch Link</th>
              <th className="p-4">Published</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  className="p-4 text-white/50"
                  colSpan={5}
                >
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td
                  className="p-4 text-white/40"
                  colSpan={5}
                >
                  No products yet.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t border-white/10"
                >
                  <td className="p-4 font-medium">
                    {product.name || "Untitled"}
                  </td>

                  <td className="p-4">
                    {product.status || "Coming Soon"}
                  </td>

                  <td className="max-w-[220px] p-4 text-xs text-white/50">
                    {product.launchUrl ? (
                      <a
                        href={product.launchUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="break-all text-accent-400 hover:underline"
                      >
                        {product.launchUrl}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td className="p-4">
                    {product.isActive ? "Yes" : "No"}
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-3 text-white/60">
                      <button
                        type="button"
                        onClick={() => startEdit(product)}
                        aria-label={`Edit ${product.name || "product"}`}
                        title="Edit product"
                        className="hover:text-accent-400"
                      >
                        <FaEdit />
                      </button>

                      <button
                        type="button"
                        disabled={deletingId === product._id}
                        onClick={() => remove(product._id)}
                        aria-label={`Delete ${product.name || "product"}`}
                        title="Delete product"
                        className="hover:text-red-400 disabled:opacity-50"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
