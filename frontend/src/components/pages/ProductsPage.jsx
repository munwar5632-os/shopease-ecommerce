import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useProductStore from "../stores/useProductStore";
import ProductCard from "../Product/ProductCard";
import ProductFilters from "../Product/ProductFilters";
import Pagination from "../UI/Pagination";
import Spinner from "../UI/Spinner";
import { useDebounce } from "../hooks/useDebounce";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, totalPages, loading, fetchProducts } = useProductStore();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(search, 500);
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    fetchProducts({
      search: debouncedSearch,
      category,
      minPrice,
      maxPrice,
      page,
    });
  }, [debouncedSearch, category, minPrice, maxPrice, page]);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  if (loading) return <Spinner />;

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="md:w-1/4">
          <ProductFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Product Grid */}
        <div className="md:w-3/4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(p) => handleFilterChange("page", p)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
