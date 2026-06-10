import express from "express";
import {
  createRazorpayOrder,
  verifyPayment,
  getPaymentStatus,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-order", protect, createRazorpayOrder);
router.post("/verify", protect, verifyPayment);
router.get("/status/:orderId", protect, getPaymentStatus);
r;

export default router;
