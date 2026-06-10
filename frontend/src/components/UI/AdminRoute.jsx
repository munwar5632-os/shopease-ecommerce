// ============================================
// WHY: Ensure only admin users can access admin pages.
// ============================================

import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import Spinner from "./Spinner";

const AdminRoute = () => {
  const { user, isAuthenticated, loading } = useAuthStore();

  if (loading) return <Spinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return user?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
