import { create } from "zustand";
import { persist } from "zustand/middleware";
import API from "../services/api";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: null,
      loading: false,

      fetchCart: async () => {
        set({ loading: true });
        try {
          const { data } = await API.get("/cart");
          set({ cart: data.cart, loading: false });
        } catch {
          set({ loading: false });
        }
      },

      addToCart: async (productId, quantity = 1) => {
        try {
          const { data } = await API.post("/cart", { productId, quantity });
          set({ cart: data.cart });
          return { success: true };
        } catch (error) {
          return { success: false, message: error.response?.data?.message };
        }
      },

      updateQuantity: async (productId, quantity) => {
        try {
          const { data } = await API.put(`/cart/${productId}`, { quantity });
          set({ cart: data.cart });
        } catch (error) {
          console.error(error);
        }
      },

      removeItem: async (productId) => {
        try {
          const { data } = await API.delete(`/cart/${productId}`);
          set({ cart: data.cart });
        } catch (error) {
          console.error(error);
        }
      },

      clearCart: async () => {
        await API.delete("/cart/clear");
        set({ cart: null });
      },
    }),
    { name: "cart-storage" },
  ),
);

export default useCartStore;
