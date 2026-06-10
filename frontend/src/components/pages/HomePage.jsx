import { useEffect } from "react";
import { Link } from "react-router-dom";
import useProductStore from "../stores/useProductStore";
import ProductCard from "../Product/ProductCard";
import Spinner from "../UI/Spinner";

const HomePage = () => {
  const { featuredProducts, loading, fetchFeaturedProducts } =
    useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to ShopEase</h1>
          <p className="text-xl mb-8">
            Your one-stop shop for everything you need
          </p>
          <Link
            to="/products"
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-10">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
