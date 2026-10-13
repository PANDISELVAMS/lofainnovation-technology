
import { useState } from "react";
import toast from "react-hot-toast";
import { FaUpload, FaSpinner } from "react-icons/fa";
import api from "../../services/api";

export default function ImageUploadField({
  label = "Image",
  value = "",
  onChange,
}) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (event) => {
    const input = event.target;
    const file = input.files?.[0];

    if (!file) return;

    if (typeof onChange !== "function") {
      toast.error("Image field is not configured correctly");
      input.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      input.value = "";
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      // Let Axios/browser set the multipart boundary automatically.
      const response = await api.post(
        "/admin/upload",
        formData
      );

      const imageUrl = response?.data?.url;

      if (typeof imageUrl !== "string" || !imageUrl.trim()) {
        throw new Error("The server did not return an image URL");
      }

      onChange(imageUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload failed:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Image upload failed"
      );
    } finally {
      setUploading(false);
      input.value = "";
    }
  };

  return (
    <div className="w-full min-w-0">
      {label && (
        <label className="mb-1 block text-xs text-white/50">
          {label}
        </label>
      )}

      {value && (
        <img
          src={value}
          alt={`${label} preview`}
          className="mb-2 h-24 w-full rounded-lg object-cover ring-1 ring-white/10"
        />
      )}

      <label
        className={`flex items-center justify-center gap-2 rounded-lg bg-white/5 px-3 py-3 text-sm ring-1 ring-white/10 ${
          uploading
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:bg-white/10"
        }`}
      >
        {uploading ? (
          <FaSpinner className="animate-spin" />
        ) : (
          <FaUpload />
        )}

        <span>
          {uploading
            ? "Uploading..."
            : value
              ? "Replace Image"
              : "Upload Image"}
        </span>

        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          disabled={uploading}
          className="hidden"
        />
      </label>
    </div>
  );
}
