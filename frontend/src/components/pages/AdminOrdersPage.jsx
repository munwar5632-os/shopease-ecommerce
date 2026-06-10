// ============================================
// WHY: Admin order management with status updates.
// ============================================

import { useEffect } from "react";
import useAdminStore from "../stores/useAdminStore";
import AdminOrderTable from "../Admin/AdminOrderTable";

const AdminOrdersPage = () => {
  const { allOrders, fetchAllOrders, updateOrderStatus } = useAdminStore();

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
      <AdminOrderTable orders={allOrders} onStatusUpdate={handleStatusUpdate} />
    </div>
  );
};

export default AdminOrdersPage;
