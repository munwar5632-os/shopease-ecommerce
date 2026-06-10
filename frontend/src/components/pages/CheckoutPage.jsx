import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../stores/useCartStore";
import useOrderStore from "../stores/useOrderStore";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";
import { formatPrice } from "../../utils/formatPrice";

const CheckoutPage = () => {
  const { cart, fetchCart } = useCartStore();
  const { createOrder, loading } = useOrderStore();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "India",
    phone: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (
      !address.address ||
      !address.city ||
      !address.postalCode ||
      !address.phone
    ) {
      setError("Please fill all shipping fields");
      return;
    }
    const result = await createOrder(address, "Razorpay");
    if (result.success) {
      navigate(`/orders/${result.orderId}`);
    } else {
      setError(result.message);
    }
  };

  if (!cart || cart.items?.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold">Cart is empty</h1>
        <Link to="/products" className="text-indigo-600 mt-4 inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow"
          >
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                required
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                required
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                required
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value="India"
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            {error && <div className="text-red-600 mt-2">{error}</div>}
            <Button
              type="submit"
              variant="primary"
              className="mt-6 w-full"
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </form>
        </div>
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between">
              <span>Items Total</span>
              <span>{formatPrice(cart.totalPrice)}</span>
            </div>
            {cart.discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{formatPrice(cart.discountAmount)}</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2 font-bold flex justify-between">
              <span>Total</span>
              <span>{formatPrice(cart.finalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
