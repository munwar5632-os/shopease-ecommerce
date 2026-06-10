// ============================================
// WHY: Admins need to create discount coupons.
//      Users need to validate coupon codes at checkout.
// ============================================

import Coupon from "../models/Coupon.js";

// @desc    Validate a coupon code (public)
// @route   POST /api/coupons/validate
export const validateCoupon = async (req, res) => {
  try {
    const { code, cartTotal } = req.body;

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({ message: "Invalid coupon code" });
    }

    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) {
      return res.status(400).json({ message: "Coupon has expired" });
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ message: "Coupon usage limit reached" });
    }

    if (cartTotal < coupon.minOrderAmount) {
      return res
        .status(400)
        .json({ message: `Minimum order amount is ₹${coupon.minOrderAmount}` });
    }

    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = (cartTotal * coupon.discountValue) / 100;
      if (coupon.maxDiscountAmount && discount > coupon.maxDiscountAmount) {
        discount = coupon.maxDiscountAmount;
      }
    } else {
      discount = coupon.discountValue;
    }

    res.status(200).json({
      success: true,
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount: discount,
        finalAmount: cartTotal - discount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============ ADMIN ONLY CONTROLLERS ============

// @desc    Get all coupons (Admin)
// @route   GET /api/coupons
export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort("-createdAt");
    res.status(200).json({ success: true, coupons });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new coupon (Admin)
// @route   POST /api/coupons
export const createCoupon = async (req, res) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscountAmount,
      validFrom,
      validUntil,
      usageLimit,
      perUserLimit,
      applicableCategories,
    } = req.body;

    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      minOrderAmount: minOrderAmount || 0,
      maxDiscountAmount: maxDiscountAmount || null,
      validFrom: validFrom || Date.now(),
      validUntil,
      usageLimit: usageLimit || 1,
      perUserLimit: perUserLimit || 1,
      applicableCategories: applicableCategories || [],
    });

    res.status(201).json({ success: true, coupon });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a coupon (Admin)
// @route   PUT /api/coupons/:id
export const updateCoupon = async (req, res) => {
  try {
    let coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    const {
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscountAmount,
      validFrom,
      validUntil,
      usageLimit,
      perUserLimit,
      isActive,
      applicableCategories,
    } = req.body;

    coupon.discountType = discountType || coupon.discountType;
    coupon.discountValue =
      discountValue !== undefined ? discountValue : coupon.discountValue;
    coupon.minOrderAmount =
      minOrderAmount !== undefined ? minOrderAmount : coupon.minOrderAmount;
    coupon.maxDiscountAmount =
      maxDiscountAmount !== undefined
        ? maxDiscountAmount
        : coupon.maxDiscountAmount;
    coupon.validFrom = validFrom || coupon.validFrom;
    coupon.validUntil = validUntil || coupon.validUntil;
    coupon.usageLimit =
      usageLimit !== undefined ? usageLimit : coupon.usageLimit;
    coupon.perUserLimit =
      perUserLimit !== undefined ? perUserLimit : coupon.perUserLimit;
    coupon.isActive = isActive !== undefined ? isActive : coupon.isActive;
    coupon.applicableCategories =
      applicableCategories || coupon.applicableCategories;

    await coupon.save();
    res.status(200).json({ success: true, coupon });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a coupon (Admin)
// @route   DELETE /api/coupons/:id
export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    await coupon.deleteOne();
    res.status(200).json({ success: true, message: "Coupon deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
