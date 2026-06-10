import { useState } from "react";
import { formatPrice, formatDate, ORDER_STATUS } from "../../utils";
import Button from "../UI/Button";

const AdminOrderTable = ({ orders, onStatusUpdate }) => {
  const [updatingId, setUpdatingId] = useState(null);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    await onStatusUpdate(orderId, newStatus);
    setUpdatingId(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Order ID</th>
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Total</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t">
              <td className="px-4 py-2">{order._id.slice(-8)}</td>
              <td className="px-4 py-2">
                {order.user?.name || order.user?.email}
              </td>
              <td className="px-4 py-2">{formatDate(order.createdAt)}</td>
              <td className="px-4 py-2">{formatPrice(order.finalAmount)}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    order.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </td>
              <td className="px-4 py-2">
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  disabled={updatingId === order._id}
                  className="border rounded p-1"
                >
                  {Object.values(ORDER_STATUS).map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderTable;
