// ============================================
// WHY: Users need to pay for orders.
//      Razorpay is the payment gateway – we create an order on Razorpay,
//      then verify the payment signature to ensure authenticity.
// ============================================

import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";

// Initialize Razorpay instance with API keys from .env
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create a Razorpay order
// @route   POST /api/payments/create-order
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise (multiply by 100)
      currency,
      receipt: receipt || `order_${Date.now()}`,
      payment_capture: 1, // Auto capture payment
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay error:", error);
    res
      .status(500)
      .json({
        message: "Failed to create payment order",
        error: error.message,
      });
  }
};

// @desc    Verify Razorpay payment signature
// @route   POST /api/payments/verify
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    // Create HMAC SHA256 signature to verify
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update order in database
      const order = await Order.findById(orderId);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          paidAt: Date.now(),
        };
        order.orderStatus = "Processing";
        await order.save();
      }

      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        orderId,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Payment verification failed", error: error.message });
  }
};

// @desc    Get payment status
// @route   GET /api/payments/status/:orderId
export const getPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      isPaid: order.isPaid,
      paidAt: order.paidAt,
      orderStatus: order.orderStatus,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
