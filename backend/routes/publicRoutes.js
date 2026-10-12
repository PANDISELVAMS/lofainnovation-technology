import express from "express";
import Service from "../models/Service.js";
import Product from "../models/Product.js";
import Portfolio from "../models/Portfolio.js";
import Partner from "../models/Partner.js";
import Position from "../models/Position.js";
import crudController from "../controllers/crudController.js";
import { getActiveBanner } from "../controllers/bannerController.js";

const router = express.Router();

router.get("/services", crudController(Service, { publicFilter: { isActive: true } }).getPublic);
router.get("/products", crudController(Product, { publicFilter: { isActive: true } }).getPublic);
router.get("/portfolio", crudController(Portfolio).getPublic);
router.get("/partners", crudController(Partner).getPublic);
router.get("/positions", crudController(Position, { publicFilter: { isActive: true } }).getPublic);
router.get("/banner", getActiveBanner);

export default router;
