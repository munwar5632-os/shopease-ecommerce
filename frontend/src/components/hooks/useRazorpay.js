// ============================================
// WHY: Integrate Razorpay payment gateway.
// ============================================

import { useState } from "react";
import API from "../services/api";

const useRazorpay = () => {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async (orderId, amount, onSuccess, onError) => {
    setLoading(true);
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      onError("Failed to load Razorpay SDK");
      setLoading(false);
      return;
    }

    try {
      // Create Razorpay order from backend
      const { data } = await API.post("/payments/create-order", {
        amount,
        receipt: orderId,
      });
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "ShopEase",
        description: `Order #${orderId}`,
        order_id: data.orderId,
        handler: async (response) => {
          // Verify payment
          const verifyRes = await API.post("/payments/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId,
          });
          if (verifyRes.data.success) {
            onSuccess(response.razorpay_payment_id);
          } else {
            onError("Payment verification failed");
          }
        },
        prefill: { name: "Customer", email: "customer@example.com" },
        theme: { color: "#4F46E5" },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      onError(err.response?.data?.message || "Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  return { initiatePayment, loading };
};

export default useRazorpay;
