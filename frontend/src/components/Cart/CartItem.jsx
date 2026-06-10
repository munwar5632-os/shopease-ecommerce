import { Link } from "react-router-dom";
import useCartStore from "../stores/useCartStore";
import { formatPrice } from "../../utils/formatPrice";
import Button from "../UI/Button";

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();
  const productId = item.product._id || item.product;

  const handleQuantityChange = (e) => {
    const newQty = parseInt(e.target.value);
    if (newQty > 0) {
      updateQuantity(productId, newQty);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 border-b py-4">
      <Link to={`/products/${productId}`} className="sm:w-24">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-24 object-cover rounded"
        />
      </Link>
      <div className="flex-1">
        <Link to={`/products/${productId}`}>
          <h3 className="font-semibold text-gray-800 hover:text-indigo-600">
            {item.name}
          </h3>
        </Link>
        <p className="text-gray-600">{formatPrice(item.price)}</p>
      </div>
      <div className="flex items-center gap-4">
        <select
          value={item.quantity}
          onChange={handleQuantityChange}
          className="border rounded px-2 py-1"
        >
          {[...Array(10).keys()].map((n) => (
            <option key={n + 1} value={n + 1}>
              {n + 1}
            </option>
          ))}
        </select>
        <Button variant="danger" onClick={() => removeItem(productId)}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
