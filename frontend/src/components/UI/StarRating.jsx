// ============================================
// WHY: Display star rating consistently.
// ============================================

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-lg">
          {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "½" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
