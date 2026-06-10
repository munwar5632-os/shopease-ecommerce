import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import Button from "../UI/Button";

const CartSummary = ({ cart }) => {
  const { totalPrice, discountAmount, finalAmount, couponCode } = cart;

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        {discountAmount > 0 && (
          <>
            <div className="flex justify-between text-green-600">
              <span>Discount ({couponCode})</span>
              <span>-{formatPrice(discountAmount)}</span>
            </div>
          </>
        )}
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatPrice(finalAmount)}</span>
          </div>
        </div>
      </div>
      <Link to="/checkout">
        <Button variant="primary" className="w-full mt-4">
          Proceed to Checkout
        </Button>
      </Link>
    </div>
  );
};

export default CartSummary;
