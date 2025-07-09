import express from "express";
import {
  getCollectionProducts,
  getAllCollections,
  getCollectionDetails,
} from "../controllers/collections";

const router = express.Router();

router.get("/", getAllCollections);
router.get("/:collectionHandle", getCollectionDetails);
router.get("/:collectionHandle/products", getCollectionProducts);


export default router;