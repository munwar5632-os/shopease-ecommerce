// ============================================
// WHY: Show product reviews and allow users to add their own.
// ============================================

import { useState, useEffect } from "react";
import useAuthStore from "../stores/useAuthStore";
import API from "../services/api";
import StarRating from "../UI/StarRating";
import Button from "../UI/Button";
import { formatDate } from "../../utils";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuthStore();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/reviews/product/${productId}`);
      setReviews(data.reviews);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await API.post("/reviews", { productId, rating, title, comment });
      await fetchReviews();
      setTitle("");
      setComment("");
      setRating(5);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      {reviews.length === 0 && (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      )}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev._id} className="border-b pb-4">
            <div className="flex items-center gap-2">
              <StarRating rating={rev.rating} />
              <span className="font-semibold">{rev.title}</span>
            </div>
            <p className="text-gray-600 mt-1">{rev.comment}</p>
            <p className="text-sm text-gray-400">
              By {rev.user?.name} • {formatDate(rev.createdAt)}
            </p>
          </div>
        ))}
      </div>
      {isAuthenticated && (
        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-gray-50 p-4 rounded-lg"
        >
          <h3 className="text-lg font-semibold mb-3">Write a Review</h3>
          <div className="mb-3">
            <label className="block text-sm font-medium">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border rounded p-1"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Stars
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Review Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-3">
            <textarea
              placeholder="Your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={4}
              className="w-full border rounded p-2"
            />
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ProductReviews;
