import Banner from "../models/Banner.js";

export async function getActiveBanner(req, res) {
  const banner = await Banner.findOne({ isActive: true }).sort({ updatedAt: -1 });
  if (!banner) return res.status(404).json({ message: "No active banner set" });
  res.json(banner);
}

export async function getBannerForAdmin(req, res) {
  const banner = await Banner.findOne().sort({ updatedAt: -1 });
  res.json(banner || null);
}

// Admin always edits "the one banner" — if none exists yet, create it;
// otherwise update the existing one. Keeps the admin UI to a single form.
export async function saveBanner(req, res) {
  const existing = await Banner.findOne().sort({ updatedAt: -1 });
  let banner;
  if (existing) {
    banner = await Banner.findByIdAndUpdate(existing._id, req.body, { new: true, runValidators: true });
  } else {
    banner = await Banner.create(req.body);
  }
  res.json(banner);
}
