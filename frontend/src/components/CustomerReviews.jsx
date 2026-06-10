import React, { useEffect, useState } from "react";
import { getReviews, postReview } from "../services/api";

const CustomerReviews = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  
  useEffect(() => {
    getReviews()
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch(() => {
        
        const saved = JSON.parse(localStorage.getItem("reviews")) || [];
        setReviews(saved);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comment) {
      alert("Please fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      const newReview = await postReview({
        name,
        rating: parseInt(rating),
        comment
      });
      setReviews([newReview, ...reviews]);
      setName("");
      setRating("5");
      setComment("");
    } catch (err) {
      alert(err.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5 min-vh-100 d-flex flex-column align-items-center">
      <div className="glass-card review-card p-5 w-100" style={{ maxWidth: '600px' }}>
        <h2 className="fw-bold mb-4">Customer Reviews</h2>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
          <input
            type="text"
            className="form-control"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="form-control d-flex align-items-center gap-2">
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="form-control border-0 p-0 shadow-none"
              style={{ backgroundColor: 'transparent' }}
            >
              <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
              <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
              <option value="3">&#9733;&#9733;&#9733;</option>
              <option value="2">&#9733;&#9733;</option>
              <option value="1">&#9733;</option>
            </select>
          </div>

          <textarea
            className="form-control"
            placeholder="Your Review"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <button type="submit" className="btn-neon w-100 mt-2" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>

        <div className="mt-5">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-lime" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : reviews.length === 0 ? (
            <p className="fw-bold">No reviews yet.</p>
          ) : (
            reviews.map((r) => (
              <div key={r.id || r.name + r.comment} className="card mb-2 p-3 shadow-sm bg-dark text-light border-secondary">
                <h5>{r.name} — <span style={{color: '#ffc107'}}>{"".repeat(r.rating)}</span></h5>
                <p className="mb-0">{r.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
