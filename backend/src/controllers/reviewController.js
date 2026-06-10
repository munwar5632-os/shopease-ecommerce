// ============================================
// WHY: Users share feedback about products.
//      This controller manages reviews, ratings, and helpful votes.
// ============================================

import Review from "../models/Review.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// @desc    Get all reviews for a product
// @route   GET /api/reviews/product/:productId
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "name avatar")
      .sort("-createdAt");

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a review for a product
// @route   POST /api/reviews
export const createReview = async (req, res) => {
  try {
    const { productId, rating, title, comment } = req.body;

    // Check if user has purchased this product
    const hasPurchased = await Order.findOne({
      user: req.user.id,
      isPaid: true,
      "orderItems.product": productId,
    });

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      user: req.user.id,
      product: productId,
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You already reviewed this product" });
    }

    const review = await Review.create({
      user: req.user.id,
      product: productId,
      rating,
      title,
      comment,
      isVerifiedPurchase: !!hasPurchased,
    });

    // Update product's average rating and review count
    const reviews = await Review.find({ product: productId });
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = totalRating / reviews.length;

    await Product.findByIdAndUpdate(productId, {
      rating: avgRating.toFixed(1),
      numReviews: reviews.length,
    });

    const populatedReview = await Review.findById(review._id).populate(
      "user",
      "name avatar",
    );
    res.status(201).json({ success: true, review: populatedReview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
export const updateReview = async (req, res) => {
  try {
    const { rating, title, comment } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    review.rating = rating || review.rating;
    review.title = title || review.title;
    review.comment = comment || review.comment;
    await review.save();

    // Recalculate product rating
    const reviews = await Review.find({ product: review.product });
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = totalRating / reviews.length;
    await Product.findByIdAndUpdate(review.product, {
      rating: avgRating.toFixed(1),
      numReviews: reviews.length,
    });

    res.status(200).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await review.deleteOne();

    // Recalculate product rating
    const reviews = await Review.find({ product: review.product });
    let avgRating = 0;
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
      avgRating = totalRating / reviews.length;
    }
    await Product.findByIdAndUpdate(review.product, {
      rating: avgRating.toFixed(1),
      numReviews: reviews.length,
    });

    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark review as helpful
// @route   POST /api/reviews/:id/helpful
export const markHelpful = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.helpful += 1;
    await review.save();

    res.status(200).json({ success: true, helpful: review.helpful });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
