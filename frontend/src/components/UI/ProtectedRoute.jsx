// ============================================
// WHY: Ensure only logged-in users can access certain pages.
// ============================================

import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import Spinner from "./Spinner";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) return <Spinner />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
