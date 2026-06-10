// ============================================
// WHY: Navigate between product pages.
// ============================================

import Button from "./Button";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex justify-center gap-2 mt-8">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {pages.map((p, idx) => (
        <button
          key={idx}
          onClick={() => typeof p === "number" && onPageChange(p)}
          className={`px-3 py-1 rounded ${p === currentPage ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          disabled={p === "..."}
        >
          {p}
        </button>
      ))}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
