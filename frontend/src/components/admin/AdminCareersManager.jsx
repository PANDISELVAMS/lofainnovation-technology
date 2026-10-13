
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

const emptyForm = {
  title: "",
  type: "Full-time",
  location: "Remote",
  experience: "",
  description: "",
  requirements: "",
  isActive: true,
};

const linesToArray = (str) =>
  (str || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const arrayToLines = (arr) =>
  (Array.isArray(arr) ? arr : []).join("\n");

export default function AdminCareersManager() {
  const [positions, setPositions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });

  // Load positions without returning a Promise from useEffect.
  const load = async () => {
    try {
      const res = await api.get("/admin/positions");

      setPositions(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to load positions:", error);
      toast.error("Could not load positions");
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

  const startEdit = (position) => {
    setEditingId(position._id);
    setAdding(false);

    setForm({
      ...emptyForm,
      ...position,
      requirements: arrayToLines(position.requirements),
    });
  };

  const cancel = () => {
    setAdding(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      toast.error("Position title is required");
      return;
    }

    const payload = {
      ...form,
      requirements: linesToArray(form.requirements),
    };

    try {
      if (editingId) {
        await api.put(`/admin/positions/${editingId}`, payload);
        toast.success("Position updated");
      } else {
        await api.post("/admin/positions", payload);
        toast.success("Position added");
      }

      cancel();
      await load();
    } catch (error) {
      console.error("Failed to save position:", error);

      toast.error(
        error.response?.data?.message || "Could not save position"
      );
    }
  };

  const remove = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this position?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/admin/positions/${id}`);

      toast.success("Position removed");
      await load();
    } catch (error) {
      console.error("Failed to remove position:", error);
      toast.error("Could not delete position");
    }
  };

  const formOpen = adding || Boolean(editingId);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold">
          Careers / Positions ({positions.length})
        </h2>

        {!formOpen && (
          <button
            type="button"
            onClick={startAdd}
            className="btn-primary !px-4 !py-2 text-sm"
          >
            <FaPlus /> Add Position
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
            placeholder="Position Title"
            value={form.title}
            onChange={(event) =>
              updateField("title", event.target.value)
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <select
            value={form.type}
            onChange={(event) =>
              updateField("type", event.target.value)
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          >
            {["Full-time", "Part-time", "Internship", "Contract", "Freelance"].map(
              (type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              )
            )}
          </select>

          <input
            placeholder="Location (e.g. Remote)"
            value={form.location}
            onChange={(event) =>
              updateField("location", event.target.value)
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <input
            placeholder="Experience (e.g. Fresher)"
            value={form.experience}
            onChange={(event) =>
              updateField("experience", event.target.value)
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10"
          />

          <textarea
            placeholder="Job Description"
            value={form.description}
            onChange={(event) =>
              updateField("description", event.target.value)
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10 sm:col-span-2"
          />

          <textarea
            rows={5}
            placeholder={"Requirements (one per line)\nExample:\nReact basics\nJavaScript knowledge"}
            value={form.requirements}
            onChange={(event) =>
              updateField("requirements", event.target.value)
            }
            className="rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10 sm:col-span-2"
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
              {editingId ? "Save Changes" : "Add Position"}
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
              <th className="p-4">Position</th>
              <th className="p-4">Type</th>
              <th className="p-4">Location</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {positions.map((position) => (
              <tr
                key={position._id}
                className="border-t border-white/10"
              >
                <td className="p-4">{position.title}</td>
                <td className="p-4">{position.type}</td>
                <td className="p-4">{position.location}</td>
                <td className="p-4">
                  {position.isActive ? "Published" : "Draft"}
                </td>
                <td className="p-4">
                  <div className="flex gap-3 text-white/60">
                    <button
                      type="button"
                      aria-label={`Edit ${position.title}`}
                      onClick={() => startEdit(position)}
                      className="hover:text-accent-400"
                    >
                      <FaEdit />
                    </button>

                    <button
                      type="button"
                      aria-label={`Delete ${position.title}`}
                      onClick={() => remove(position._id)}
                      className="hover:text-red-400"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {positions.length === 0 && (
              <tr>
                <td
                  className="p-4 text-white/40"
                  colSpan={5}
                >
                  No positions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
