import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import api from "../../services/api";
import { iconOptions } from "../../data/iconMap";

const emptyForm = {
  title: "",
  description: "",
  price: "",
  delivery: "",
  tag: "",
  icon: "FaTools",
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

export default function AdminServicesManager() {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const load = () => {
    api
      .get("/admin/services")
      .then((res) => {
        setServices(res.data);
      })
      .catch(() => {
        toast.error("Could not load services");
      });
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

  const startEdit = (s) => {
    setEditingId(s._id);
    setAdding(false);

    setForm({
      ...s,
      features: toCsv(s.features),
      technology: toCsv(s.technology),
    });
  };

  const cancel = () => {
    setAdding(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    const payload = {
      ...form,
      features: fromCsv(form.features),
      technology: fromCsv(form.technology),
    };

    try {
      if (editingId) {
        await api.put(`/admin/services/${editingId}`, payload);
        toast.success("Service updated");
      } else {
        await api.post("/admin/services", payload);
        toast.success("Service added");
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
      await api.delete(`/admin/services/${id}`);
      toast.success("Service deleted");
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
          Services ({services.length})
        </h2>

        {!formOpen && (
          <button
            onClick={startAdd}
            className="btn-primary !px-4 !py-2 text-sm"
          >
            <FaPlus /> Add Service
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
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <select
            value={form.icon}
            onChange={(e) =>
              setForm({
                ...form,
                icon: e.target.value,
              })
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          >
            {iconOptions.map((opt) => (
              <option className="bg-black" key={opt} value={opt}>
                {opt}
              </option>
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

          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <input
            placeholder="Delivery"
            value={form.delivery}
            onChange={(e) =>
              setForm({
                ...form,
                delivery: e.target.value,
              })
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <input
            placeholder="Tag (optional)"
            value={form.tag}
            onChange={(e) =>
              setForm({
                ...form,
                tag: e.target.value,
              })
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

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
            className="sm:col-span-2 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
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
            />

            Published (visible on the live site)
          </label>

          <div className="flex gap-2 sm:col-span-2">
            <button
              type="submit"
              className="btn-primary flex-1 justify-center"
            >
              <FaSave />{" "}
              {editingId ? "Save Changes" : "Add Service"}
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
              <th className="p-4">Title</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((s) => (
              <tr
                key={s._id}
                className="border-t border-white/10"
              >
                <td className="p-4">{s.title}</td>

                <td className="p-4">{s.price}</td>

                <td className="p-4">
                  {s.isActive ? (
                    <span className="text-green-400">
                      Published
                    </span>
                  ) : (
                    <span className="text-white/40">
                      Hidden
                    </span>
                  )}
                </td>

                <td className="flex gap-3 p-4 text-white/60">
                  <button
                    onClick={() => startEdit(s)}
                    className="hover:text-accent-400"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => remove(s._id)}
                    className="hover:text-red-400"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {services.length === 0 && (
              <tr>
                <td
                  className="p-4 text-white/40"
                  colSpan={4}
                >
                  No services yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}