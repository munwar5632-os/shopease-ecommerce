// ============================================
// WHY: Display products in a responsive grid layout.
// ============================================

import ProductCard from "./ProductCard";

const ProductGrid = ({ products, loading }) => {
  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!products?.length)
    return <div className="text-center py-10">No products found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
