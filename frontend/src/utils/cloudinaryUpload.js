export async function uploadToCloudinary(file) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "lofa_uploads");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/ojjftioz/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error?.message || "Cloudinary upload failed"
    );
  }

  return {
    url: data.secure_url,
    public_id: data.public_id,
  };
}