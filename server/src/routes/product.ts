import express from "express";
import { getProductDetails, getAllProducts } from "../controllers/product";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:productHandle", getProductDetails);

export default router;
