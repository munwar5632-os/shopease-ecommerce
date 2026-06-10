import { useEffect } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../stores/useCartStore";
import CartItem from "../Cart/CartItem";
import CartSummary from "../Cart/CartSummary";
import Spinner from "../UI/Spinner";

const CartPage = () => {
  const { cart, loading, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <Spinner />;

  if (!cart || cart.items?.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any items yet.
        </p>
        <Link
          to="/products"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {cart.items.map((item) => (
            <CartItem key={item.product._id || item.product} item={item} />
          ))}
        </div>
        <div className="lg:w-1/3">
          <CartSummary cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
