import cloudinary from "../utils/cloudinary.js";

export async function testCloudinaryUpload(req, res) {
  try {
    console.log("========== UNSIGNED CLOUDINARY TEST ==========");

    const result = await cloudinary.uploader.unsigned_upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      "lofa_uploads"
    );

    console.log("✅ UNSIGNED UPLOAD SUCCESS");
    console.log(result.secure_url);

    return res.json({
      success: true,
      message: "Unsigned Cloudinary upload working",
      url: result.secure_url,
      public_id: result.public_id,
    });

  } catch (error) {
    console.error("❌ UNSIGNED UPLOAD FAILED");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
      http_code: error.http_code || null,
      name: error.name || null,
    });
  }
}