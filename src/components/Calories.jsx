import React from "react";
import { Link } from "react-router-dom";

const caloriesData = {
  "Rajma Chawal": {
    calories: 350,
    recommendedFor: ["Diabetes", "High Protein Diet"]
  },
  "Jeera Aloo": {
    calories: 180,
    recommendedFor: ["Weight Gain"]
  },
  "Mix Veg": {
    calories: 150,
    recommendedFor: ["Diabetes", "Weight Loss"]
  },
  "Dal Fry": {
    calories: 200,
    recommendedFor: ["High Protein Diet"]
  },
  "Paneer Butter Masala": {
    calories: 400,
    recommendedFor: ["Weight Gain"]
  },
  "Kadi Pakoda": {
    calories: 320,
    recommendedFor: ["Energy Boost"]
  }
};

const Calories = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4">🔥 Calories Info</h2>

      <div className="card shadow rounded-4 p-4">
        {Object.entries(caloriesData).map(([item, data]) => (
  <div key={item} className="border-bottom py-3">
    
    <div className="d-flex justify-content-between fw-bold">
      <span>{item}</span>
      <span>{data.calories} kcal</span>
    </div>

    <div className="mt-1">
      <small className="text-muted">
        ✅ Recommended for:{" "}
        {data.recommendedFor.join(", ")}
      </small>
    </div>

  </div>
))}
      </div>

      <div className="text-center mt-4">
        <Link to="/menu" className="btn btn-outline-primary">
          ⬅ Back to Menu
        </Link>
      </div>
    </div>
  );
};

export default Calories;
