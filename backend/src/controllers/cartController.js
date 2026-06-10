import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Helper function to recalculate cart totals
const recalcCartTotals = (cart) => {
  let total = 0;
  if (cart.items && cart.items.length) {
    for (const item of cart.items) {
      total += (item.price || 0) * (item.quantity || 0);
    }
  }
  cart.totalPrice = total;
  cart.finalAmount = total - (cart.discountAmount || 0);
  return cart;
};

// @desc    Get user's cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
      await cart.save();
    }
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add item to cart
// @desc    Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stock < quantity)
      return res.status(400).json({ message: "Insufficient stock" });

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const existingIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (existingIndex !== -1) {
      cart.items[existingIndex].quantity += quantity;
      if (cart.items[existingIndex].quantity > product.stock) {
        return res.status(400).json({ message: "Quantity exceeds stock" });
      }
    } else {
      cart.items.push({
        product: productId,
        name: product.name,
        price: product.price,
        quantity,
        image: product.images[0]?.url || "",
      });
    }

    // ✅ Recalculate totals BEFORE saving
    let total = 0;
    for (const item of cart.items) {
      total += item.price * item.quantity;
    }
    cart.totalPrice = total;
    cart.finalAmount = total - (cart.discountAmount || 0);

    await cart.save();

    // ✅ Return the updated cart with correct totals
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.product.toString() === productId,
    );
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    const product = await Product.findById(productId);
    if (quantity > product.stock)
      return res.status(400).json({ message: "Quantity exceeds stock" });

    item.quantity = quantity;
    recalcCartTotals(cart);
    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );
    recalcCartTotals(cart);
    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clear cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (cart) {
      cart.items = [];
      cart.couponCode = null;
      cart.discountAmount = 0;
      recalcCartTotals(cart);
      await cart.save();
    }
    res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Apply coupon (optional, keep as is)
export const applyCoupon = async (req, res) => {
  // ... (keep your existing applyCoupon logic, but call recalcCartTotals after)
  // Make sure to call recalcCartTotals(cart) before saving.
};
