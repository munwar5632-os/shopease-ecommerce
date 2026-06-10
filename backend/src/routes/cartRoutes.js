import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.delete("/clear", protect, clearCart);
router.post("/apply-coupon", protect, applyCoupon);
router.put("/:productId", protect, updateCartItem);
router.delete("/:productId", protect, removeFromCart);

export default router;
