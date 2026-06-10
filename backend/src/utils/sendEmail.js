// utils/sendEmail.js
import { Resend } from "resend";

// WHY: Resend is more reliable than Gmail
// No App Password needed, just API key
const resend = new Resend(process.env.RESEND_API_KEY);

// ============================================
// @desc Send order confirmation email
// ============================================
export const sendOrderConfirmation = async (
  userEmail,
  userName,
  orderId,
  totalAmount,
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "ShopEase <onboarding@resend.dev>",
      to: userEmail,
      subject: `Order Confirmation - #${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; 
                    max-width: 600px; margin: 0 auto;">
          <h2>Thank you for your order, ${userName}! 🎉</h2>
          <p>Your order has been successfully placed.</p>
          <div style="background: #f5f5f5; 
                      padding: 15px; 
                      border-radius: 8px;">
            <p><strong>Order ID:</strong> #${orderId}</p>
            <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
            <p><strong>Status:</strong> Payment Confirmed ✅</p>
          </div>
          <br/>
          <a href="${process.env.FRONTEND_URL}/orders/${orderId}"
             style="background: #4F46E5; 
                    color: white; 
                    padding: 10px 20px;
                    text-decoration: none; 
                    border-radius: 5px;">
            View Order
          </a>
          <p>Thank you for shopping with ShopEase!</p>
        </div>
      `,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      return;
    }

    console.log("✅ Order confirmation email sent:", data?.id);
  } catch (error) {
    // WHY: Don't crash app if email fails
    // Order is still placed successfully
    console.error("❌ Email error:", error.message);
  }
};

// ============================================
// @desc Send welcome email after registration
// ============================================
export const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const { error } = await resend.emails.send({
      from: "ShopEase <onboarding@resend.dev>",
      to: userEmail,
      subject: "Welcome to ShopEase! 🛍️",
      html: `
        <div style="font-family: Arial, sans-serif; 
                    max-width: 600px; margin: 0 auto;">
          <h2>Welcome to ShopEase, ${userName}! 👋</h2>
          <p>We're thrilled to have you on board.</p>
          <p>Start exploring our collections 
             and find amazing deals.</p>
          <br/>
          <a href="${process.env.FRONTEND_URL}/products"
             style="background: #4F46E5; 
                    color: white; 
                    padding: 10px 20px;
                    text-decoration: none; 
                    border-radius: 5px;">
            Shop Now
          </a>
        </div>
      `,
    });

    if (error) {
      console.error("❌ Welcome email error:", error);
      return;
    }

    console.log("✅ Welcome email sent to:", userEmail);
  } catch (error) {
    console.error("❌ Welcome email error:", error.message);
  }
};

// ============================================
// @desc Send password reset email
// ============================================
export const sendPasswordResetEmail = async (userEmail, resetToken) => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const { error } = await resend.emails.send({
      from: "ShopEase <onboarding@resend.dev>",
      to: userEmail,
      subject: "Password Reset Request 🔐",
      html: `
        <div style="font-family: Arial, sans-serif; 
                    max-width: 600px; margin: 0 auto;">
          <h2>Reset Your Password 🔐</h2>
          <p>Click below to reset your password.</p>
          <p><strong>This link expires in 1 hour.</strong></p>
          <br/>
          <a href="${resetUrl}"
             style="background: #4F46E5; 
                    color: white; 
                    padding: 10px 20px;
                    text-decoration: none; 
                    border-radius: 5px;">
            Reset Password
          </a>
          <br/><br/>
          <p style="color: #666; font-size: 14px;">
            If you didn't request this, 
            ignore this email.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("❌ Reset email error:", error);
      return;
    }

    console.log("✅ Reset email sent to:", userEmail);
  } catch (error) {
    console.error("❌ Reset email error:", error.message);
  }
};

export default sendOrderConfirmation;
