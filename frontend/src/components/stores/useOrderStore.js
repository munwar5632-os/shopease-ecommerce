// ============================================
// WHY: Manage orders: create order, fetch orders, get order details.
// ============================================

import { create } from "zustand";
import API from "../services/api";

const useOrderStore = create((set, get) => ({
  orders: [],
  currentOrder: null,
  loading: false,

  createOrder: async (shippingAddress, paymentMethod) => {
    set({ loading: true });
    try {
      const { data } = await API.post("/orders", {
        shippingAddress,
        paymentMethod,
      });
      set({ currentOrder: data.order, loading: false });
      return { success: true, orderId: data.order._id };
    } catch (error) {
      set({ loading: false });
      return {
        success: false,
        message: error.response?.data?.message || "Order failed",
      };
    }
  },

  fetchMyOrders: async () => {
    set({ loading: true });
    try {
      const { data } = await API.get("/orders/myorders");
      set({ orders: data.orders, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  fetchOrderById: async (id) => {
    set({ loading: true });
    try {
      const { data } = await API.get(`/orders/${id}`);
      set({ currentOrder: data.order, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
}));

export default useOrderStore;
