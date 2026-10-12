export async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file received",
      });
    }

    console.log("📸 Image received:", req.file.originalname);

    const formData = new FormData();

    const blob = new Blob([req.file.buffer], {
      type: req.file.mimetype,
    });

    formData.append("file", blob, req.file.originalname);

    // New Cloudinary unsigned preset
    formData.append(
      "upload_preset",
      process.env.CLOUDINARY_UPLOAD_PRESET || "lofa_uploads"
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Cloudinary upload failed:");
      console.error(data);

      return res.status(response.status).json({
        success: false,
        message:
          data.error?.message || "Cloudinary upload failed",
        error: data.error || null,
      });
    }

    console.log("✅ Cloudinary upload success");
    console.log("URL:", data.secure_url);
    console.log("Public ID:", data.public_id);

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      url: data.secure_url,
      public_id: data.public_id,
    });

  } catch (error) {
    console.error("❌ Upload controller error:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Image upload failed",
    });
  }
}