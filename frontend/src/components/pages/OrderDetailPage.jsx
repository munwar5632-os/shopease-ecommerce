// ============================================
// WHY: Show detailed order information with items and status.
// ============================================

import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useOrderStore from "../stores/useOrderStore";
import { formatPrice, formatDate } from "../../utils";
import Spinner from "../UI/Spinner";

const OrderDetailPage = () => {
  const { id } = useParams();
  const { currentOrder, loading, fetchOrderById } = useOrderStore();

  useEffect(() => {
    fetchOrderById(id);
  }, [id]);

  if (loading) return <Spinner />;
  if (!currentOrder)
    return (
      <div className="container-custom py-16 text-center">Order not found</div>
    );

  const statusSteps = ["Pending", "Processing", "Shipped", "Delivered"];
  const currentIndex = statusSteps.indexOf(currentOrder.orderStatus);

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-2">Order Details</h1>
      <p className="text-gray-500 mb-6">Order ID: {currentOrder._id}</p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Items</h2>
            {currentOrder.orderItems.map((item, idx) => (
              <div key={idx} className="flex gap-4 border-b py-3 last:border-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p>
                    Qty: {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
                <p className="font-bold">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
            <div className="border-t pt-3 mt-2 text-right">
              <p>
                Total:{" "}
                <span className="font-bold">
                  {formatPrice(currentOrder.finalAmount)}
                </span>
              </p>
            </div>
          </div>
          {/* Shipping Address */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-3">Shipping Address</h2>
            <p>
              {currentOrder.shippingAddress.address},{" "}
              {currentOrder.shippingAddress.city},{" "}
              {currentOrder.shippingAddress.postalCode},{" "}
              {currentOrder.shippingAddress.country}
            </p>
            <p>Phone: {currentOrder.shippingAddress.phone}</p>
          </div>
        </div>
        <div className="space-y-6">
          {/* Order Status Timeline */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Order Status</h2>
            <div className="relative">
              {statusSteps.map((step, idx) => (
                <div key={step} className="flex items-center mb-4 last:mb-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      idx <= currentIndex
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {idx <= currentIndex ? "✓" : idx + 1}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{step}</p>
                    {idx === currentIndex &&
                      currentOrder.orderStatus === "Delivered" && (
                        <p className="text-sm text-green-600">
                          Delivered on {formatDate(currentOrder.deliveredAt)}
                        </p>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Payment Info */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">Payment</h2>
            <p>Method: {currentOrder.paymentMethod}</p>
            <p>
              Status:{" "}
              {currentOrder.isPaid ? (
                <span className="text-green-600">Paid</span>
              ) : (
                <span className="text-red-600">Pending</span>
              )}
            </p>
            {currentOrder.paidAt && (
              <p>Paid on: {formatDate(currentOrder.paidAt)}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
