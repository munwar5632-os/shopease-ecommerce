import { create } from "zustand";
import { persist } from "zustand/middleware";
import API from "../services/api";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      checkAuth: async () => {
        set({ loading: true });
        try {
          const { data } = await API.get("/auth/me");
          set({ user: data.user, isAuthenticated: true, loading: false });
        } catch {
          set({ user: null, isAuthenticated: false, loading: false });
        }
      },

      login: async (email, password) => {
        set({ loading: true });
        try {
          const { data } = await API.post("/auth/login", { email, password });
          set({ user: data.user, isAuthenticated: true, loading: false });
          return { success: true };
        } catch (error) {
          set({ loading: false });
          return {
            success: false,
            message: error.response?.data?.message || "Login failed",
          };
        }
      },

      register: async (name, email, password) => {
        set({ loading: true });
        try {
          const { data } = await API.post("/auth/register", {
            name,
            email,
            password,
          });
          set({ user: data.user, isAuthenticated: true, loading: false });
          return { success: true };
        } catch (error) {
          set({ loading: false });
          return {
            success: false,
            message: error.response?.data?.message || "Registration failed",
          };
        }
      },

      logout: async () => {
        await API.post("/auth/logout");
        set({ user: null, isAuthenticated: false });
      },

      setUser: (user) => set({ user }),
    }),
    { name: "auth-storage" },
  ),
);

export default useAuthStore;
