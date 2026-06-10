// ============================================
// WHY: Handles all /api/reviews/* requests.
//      Users can leave reviews on products they purchased.
//      Admins can manage all reviews.
// ============================================

import express from "express";
import {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  markHelpful,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/product/:productId", getProductReviews);

router.post("/", protect, createReview);
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);
router.post("/:id/helpful", protect, markHelpful);

export default router;
