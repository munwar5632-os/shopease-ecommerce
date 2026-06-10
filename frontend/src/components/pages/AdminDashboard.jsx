import { useEffect } from "react";
import AdminStats from "../Admin/AdminStats";
import useAdminStore from "../stores/useAdminStore";
import { formatPrice, formatDate } from "../../utils";

const AdminDashboard = () => {
  const { stats, fetchStats } = useAdminStore();

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <AdminStats />
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        {stats?.recentOrders?.length ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Order ID</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order._id} className="border-t">
                    <td className="p-2">{order._id.slice(-8)}</td>
                    <td>{order.user?.name}</td>
                    <td>{formatPrice(order.finalAmount)}</td>
                    <td>{order.orderStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No recent orders</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
