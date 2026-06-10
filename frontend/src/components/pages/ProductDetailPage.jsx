import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProductStore from "../stores/useProductStore";
import useCartStore from "../stores/useCartStore";
import { formatPrice } from "../../utils";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";
import StarRating from "../UI/StarRating";
import ProductReviews from "../Product/ProductReviews";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, fetchProductById } = useProductStore();
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  const handleAddToCart = async () => {
    setAdding(true);
    const result = await addToCart(id, quantity);
    setAdding(false);
    if (result.success) {
      navigate("/cart");
    } else {
      alert(result.message);
    }
  };

  if (loading) return <Spinner />;
  if (!product)
    return (
      <div className="container-custom py-16 text-center">
        Product not found
      </div>
    );

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            src={product.images?.[0]?.url}
            alt={product.name}
            className="w-full rounded-lg shadow"
          />
        </div>
        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mt-1">{product.category}</p>
          <div className="flex items-center mt-2">
            <StarRating rating={product.rating} />
            <span className="ml-2 text-gray-600">
              ({product.numReviews} reviews)
            </span>
          </div>
          <p className="text-3xl font-bold text-indigo-600 mt-4">
            {formatPrice(product.price)}
          </p>
          <p className="text-gray-700 mt-4">{product.description}</p>
          <p className="mt-2 text-sm">
            Stock:{" "}
            {product.stock > 0 ? (
              <span className="text-green-600">In Stock ({product.stock})</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </p>
          {product.stock > 0 && (
            <div className="mt-6 flex items-center gap-4">
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded p-2"
              >
                {[...Array(Math.min(10, product.stock)).keys()].map((n) => (
                  <option key={n + 1} value={n + 1}>
                    {n + 1}
                  </option>
                ))}
              </select>
              <Button onClick={handleAddToCart} disabled={adding}>
                {adding ? "Adding..." : "Add to Cart"}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <ProductReviews productId={id} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
