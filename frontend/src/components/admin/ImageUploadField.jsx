import { useState } from "react";
import toast from "react-hot-toast";
import { FaUpload, FaSpinner } from "react-icons/fa";
import api from "../../services/api";

// Reusable image upload control used by Portfolio, Partners, Products and
// Banner admin forms. Uploads straight to the backend (which forwards to
// Cloudinary) and calls onChange(url) with the hosted image URL.
export default function ImageUploadField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const { data } = await api.post("/admin/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      onChange(data.url);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed — check Cloudinary keys in backend/.env");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      {label && <label className="mb-1 block text-xs text-white/50">{label}</label>}
      {value && <img src={value} alt="preview" className="mb-2 h-24 w-full rounded-lg object-cover ring-1 ring-white/10" />}
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10 hover:bg-white/10">
        {uploading ? <FaSpinner className="animate-spin" /> : <FaUpload />}
        {uploading ? "Uploading..." : value ? "Replace Image" : "Upload Image"}
        <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} className="hidden" />
      </label>
    </div>
  );
}
