import { useEffect } from "react";
import { Link } from "react-router-dom";
import useOrderStore from "../stores/useOrderStore";
import { formatPrice, formatDate } from "../../utils";
import Spinner from "../UI/Spinner";

const OrdersPage = () => {
  const { orders, loading, fetchMyOrders } = useOrderStore();

  useEffect(() => {
    fetchMyOrders();
  }, []);

  if (loading) return <Spinner />;

  if (orders.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">No Orders Yet</h1>
        <p className="text-gray-600 mb-8">You haven't placed any orders.</p>
        <Link
          to="/products"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            to={`/orders/${order._id}`}
            key={order._id}
            className="block border rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="flex flex-wrap justify-between items-center">
              <div>
                <p className="font-semibold">Order #{order._id.slice(-8)}</p>
                <p className="text-sm text-gray-500">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <div>
                <p className="font-bold">{formatPrice(order.finalAmount)}</p>
              </div>
              <div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    order.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.orderStatus === "Cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
