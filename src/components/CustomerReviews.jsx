import React, { useEffect, useState } from "react";

function CustomerReviews() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(savedReviews);
  }, []);

  // Save to localStorage whenever reviews change
  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !comment) {
      alert("Please fill all fields");
      return;
    }

    const newReview = {
      id: Date.now(),
      name,
      rating,
      comment
    };

    setReviews([newReview, ...reviews]);
    setName("");
    setRating("5");
    setComment("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h2>Customer Reviews</h2>

      {/* ✅ Review Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-2"
        />

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="form-control mb-2"
        >
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <textarea
          placeholder="Your Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="form-control mb-2"
        />

        <button type="submit" className="btn btn-success w-100">
          Submit Review
        </button>
      </form>

      {/* ✅ Review Display */}
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((r) => (
          <div
            key={r.id}
            className="card mb-2 p-3 shadow-sm"
          >
            <h5>
              {r.name} — {"⭐".repeat(r.rating)}
            </h5>
            <p>{r.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CustomerReviews;