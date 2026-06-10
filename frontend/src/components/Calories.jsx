import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCalories } from "../services/api";


const fallbackCaloriesData = {
  "Rajma Chawal": { calories: 350, recommendedFor: ["Diabetes", "High Protein Diet"] },
  "Jeera Aloo": { calories: 180, recommendedFor: ["Weight Gain"] },
  "Mix Veg": { calories: 150, recommendedFor: ["Diabetes", "Weight Loss"] },
  "Dal Fry": { calories: 200, recommendedFor: ["High Protein Diet"] },
  "Paneer Butter Masala": { calories: 400, recommendedFor: ["Weight Gain"] },
  "Kadi Pakoda": { calories: 320, recommendedFor: ["Energy Boost"] }
};

const Calories = () => {
  const navigate = useNavigate();
  const [caloriesData, setCaloriesData] = useState(fallbackCaloriesData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCalories()
      .then((data) => {
        setCaloriesData(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Using offline calorie data");
        setCaloriesData(fallbackCaloriesData);
        setLoading(false);
      });
  }, []);

  return (
    <div className="calories-bg">
      <div className="container py-5 min-vh-100">
        <div className="text-center mb-5">
          <h2 className="fw-bold fs-1 mb-3">
            Calories <span className="text-lime">Info</span>
          </h2>
        </div>

        {error && (
          <div className="alert alert-warning text-center mx-auto mb-4" style={{ maxWidth: '800px' }}>
             {error}
          </div>
        )}

        <div className="glass-card mx-auto p-4" style={{ maxWidth: '800px' }}>
          {loading ? (
             <div className="text-center py-4 text-lime">
               <div className="spinner-border" role="status">
                 <span className="visually-hidden">Loading...</span>
               </div>
             </div>
          ) : (
             Object.entries(caloriesData).map(([item, data], index) => (
               <div key={index} className="d-flex justify-content-between align-items-center py-4 border-bottom border-secondary">
                 <div>
                   <h5 className="fw-bold mb-1">{item}</h5>
                   <span className="text-lime small">
                     Recommended for: {Array.isArray(data.recommendedFor) ? data.recommendedFor.join(", ") : data.recommendedFor}
                   </span>
                 </div>
                 <div className="fw-bold fs-5">{data.calories} kcal</div>
               </div>
             ))
          )}
        </div>

        <div className="text-center mt-5">
          <button className="btn-neon-outline px-5" onClick={() => navigate("/menu")}>
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calories;
