// ============================================
// WHY: Manage products state: fetching, filtering, pagination.
// ============================================

import { create } from "zustand";
import API from "../services/api";

const useProductStore = create((set, get) => ({
  products: [],
  featuredProducts: [],
  product: null,
  totalPages: 1,
  loading: false,

  fetchProducts: async (params = {}) => {
    set({ loading: true });
    try {
      const query = new URLSearchParams(params).toString();
      const { data } = await API.get(`/products?${query}`);
      set({
        products: data.products,
        totalPages: data.pages,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const { data } = await API.get("/products?featured=true&limit=4");
      set({ featuredProducts: data.products, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  fetchProductById: async (id) => {
    set({ loading: true });
    try {
      const { data } = await API.get(`/products/${id}`);
      set({ product: data.product, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}));

export default useProductStore;
