// ============================================
// WHY: Manage admin dashboard data (stats, orders, users).
// ============================================

import { create } from "zustand";
import API from "../services/api";

const useAdminStore = create((set, get) => ({
  stats: null,
  allOrders: [],
  allUsers: [],
  loading: false,

  fetchStats: async () => {
    set({ loading: true });
    try {
      const { data } = await API.get("/admin/stats");
      set({ stats: data.stats, loading: false });
    } catch (err) {
      set({ loading: false });
    }
  },

  fetchAllOrders: async () => {
    set({ loading: true });
    try {
      const { data } = await API.get("/admin/orders");
      set({ allOrders: data.orders, loading: false });
    } catch (err) {
      set({ loading: false });
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      const { data } = await API.put(`/admin/orders/${orderId}/status`, {
        status,
      });
      const orders = get().allOrders.map((o) =>
        o._id === orderId ? data.order : o,
      );
      set({ allOrders: orders });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message };
    }
  },

  fetchAllUsers: async () => {
    set({ loading: true });
    try {
      const { data } = await API.get("/admin/users");
      set({ allUsers: data.users, loading: false });
    } catch (err) {
      set({ loading: false });
    }
  },

  updateUserRole: async (userId, role) => {
    try {
      const { data } = await API.put(`/admin/users/${userId}/role`, { role });
      const users = get().allUsers.map((u) =>
        u._id === userId ? data.user : u,
      );
      set({ allUsers: users });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message };
    }
  },
}));

export default useAdminStore;
