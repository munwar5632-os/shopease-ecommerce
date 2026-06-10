// ============================================
// WHY: Search products by name.
// ============================================

const SearchBar = ({ value, onChange, placeholder = "Search products..." }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  );
};

export default SearchBar;
