import express from "express";
import productRouter from "./product";
import collectionsRouter from "./collections";
import authRouter from "./auth";
import cartRouter from "./cart";
import adminRouter from "./admin";
import {
  adminlimiter,
  authedlimiter,
  publiclimiter,
} from "../middleware/rateLimiters";
const router = express.Router();

router.use("/auth", authedlimiter, authRouter);
router.use("/products", publiclimiter, productRouter);
router.use("/collections", publiclimiter, collectionsRouter);
router.use("/cart", authedlimiter, cartRouter);
router.use("/admin", adminlimiter, adminRouter);

export default router;
