// ============================================
// WHY: Filter products by category, price range.
// ============================================

import { useState } from "react";
import { PRODUCT_CATEGORIES } from "../../utils";

const ProductFilters = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange("category", category);
  };

  const handlePriceChange = () => {
    onFilterChange("minPrice", minPrice);
    onFilterChange("maxPrice", maxPrice);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-3">Categories</h3>
      <div className="space-y-2">
        <button
          onClick={() => handleCategoryChange("")}
          className={`block w-full text-left px-2 py-1 rounded ${selectedCategory === "" ? "bg-indigo-100 text-indigo-600" : ""}`}
        >
          All
        </button>
        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`block w-full text-left px-2 py-1 rounded ${selectedCategory === cat ? "bg-indigo-100 text-indigo-600" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <h3 className="font-bold text-lg mt-6 mb-3">Price Range</h3>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          onBlur={handlePriceChange}
          className="w-1/2 border rounded p-1"
        />
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          onBlur={handlePriceChange}
          className="w-1/2 border rounded p-1"
        />
      </div>
    </div>
  );
};

export default ProductFilters;
