import express from "express";
import { protectAdmin } from "../middleware/auth.js";
import { upload } from "../utils/cloudinary.js";
import { uploadImage } from "../controllers/uploadController.js";
import { getBannerForAdmin, saveBanner } from "../controllers/bannerController.js";
import crudController from "../controllers/crudController.js";
import { testCloudinaryUpload } from "../controllers/cloudinaryTestController.js";
import Service from "../models/Service.js";
import Product from "../models/Product.js";
import Portfolio from "../models/Portfolio.js";
import Partner from "../models/Partner.js";
import Position from "../models/Position.js";

const router = express.Router();

// Every admin route requires the admin JWT
// TEMPORARY CLOUDINARY TEST
router.get("/cloudinary-test", testCloudinaryUpload);

router.use(protectAdmin);

router.post("/upload", upload.single("image"), uploadImage);
// Launch Banner — single-record edit
router.get("/banner", getBannerForAdmin);
router.put("/banner", saveBanner);

// Generic CRUD for the rest
const modelMap = { services: Service, products: Product, portfolio: Portfolio, partners: Partner, positions: Position };

router.param("entity", (req, res, next, entity) => {
  const Model = modelMap[entity];
  if (!Model) return res.status(404).json({ message: `Unknown entity: ${entity}` });
  req.Model = Model;
  next();
});

router.get("/:entity", (req, res) => crudController(req.Model).getAll(req, res));
router.post("/:entity", (req, res) => crudController(req.Model).create(req, res));
router.put("/:entity/:id", (req, res) => crudController(req.Model).update(req, res));
router.delete("/:entity/:id", (req, res) => crudController(req.Model).remove(req, res));

export default router;
