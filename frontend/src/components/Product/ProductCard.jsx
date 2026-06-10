// ============================================
// WHY: Display product information in a grid.
//      Shows image, name, price, rating, and add to cart button.
// ============================================

import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import Button from "../UI/Button";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.images?.[0]?.url || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-48 object-cover hover:scale-105 transition-transform"
        />
      </Link>
      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 truncate">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mt-1">{product.category}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">★</span>
          <span className="text-gray-600 ml-1">{product.rating || 0}</span>
          <span className="text-gray-400 text-sm ml-1">
            ({product.numReviews || 0})
          </span>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-600">
            {formatPrice(product.price)}
          </span>
          <Button variant="primary" size="sm">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
