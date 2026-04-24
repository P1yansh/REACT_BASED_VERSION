import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getRestaurants } from '../api/api';

const Menu = () => {
  const navigate = useNavigate();
  const [CurrentDay, setCurrentDay] = useState('Monday');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    async function loadRestaurants() {
      try {
        const response = await getRestaurants();
        setRestaurants(response.data);
      } catch (error) {
        console.error("Failed to load restaurants:", error);
      } finally {
        setLoading(false);
      }
    }
    loadRestaurants();
  }, []);

  const menuData = {
    Monday: { lunch: "Rajma Chawal + Jeera Aloo", dinner: "Mix Veg + 4 Rotis + Dal Fry" },
    Tuesday: { lunch: "Kadi Pakoda + Rice", dinner: "Paneer Butter Masala + Naan" },
    Wednesday: { lunch: "Chole Kulche", dinner: "Egg Curry / Malai Kofta + Rice" },
  };

  const currentMenu = menuData[CurrentDay] || { lunch: "nahi socha", dinner: "nahi socha" };

  return (
    <div className="container py-5">
      {/* ─────────────────────────────────────────────
          Restaurants Section (Data from API)
      ───────────────────────────────────────────── */}
      <h2 className="text-center mb-4 fw-bold">🍔 Top Restaurants</h2>
      
      {loading ? (
        <div className="text-center my-5">
           <div className="spinner-border text-success" role="status">
             <span className="visually-hidden">Loading...</span>
           </div>
        </div>
      ) : (
        <div className="row justify-content-center mb-5 pb-5 border-bottom">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100 border-0 rounded-4 overflow-hidden">
                <img 
                  src={restaurant.image_url} 
                  className="card-img-top" 
                  alt={restaurant.name} 
                  style={{ height: '200px', objectFit: 'cover' }} 
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{restaurant.name}</h5>
                  <p className="card-text text-muted mb-1">{restaurant.cuisine}</p>
                  <p className="card-text mb-2">
                    <span className="badge bg-success rounded-pill px-3 py-2">
                      ⭐ {restaurant.rating}
                    </span>
                  </p>
                  <p className="card-text small text-secondary">
                    <i className="bi bi-geo-alt-fill me-1"></i>
                    {restaurant.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─────────────────────────────────────────────
          Weekly Planner (Static Data)
      ───────────────────────────────────────────── */}
      <h2 className="text-center mb-4 fw-bold">📅 Weekly Planner</h2>
      
      <ul className="nav nav-pills justify-content-center mb-4">
        {days.map(day => (
          <li className="nav-item" key={day}>
            <button 
              className={`nav-link ${CurrentDay === day ? 'active' : ''}`}
              onClick={() => setCurrentDay(day)}
            >
              {day}
            </button>
          </li>
        ))}
      </ul>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow border-0 rounded-4">
            <div className="card-body p-5 text-center">
              <h3 className="text-success mb-4">{CurrentDay}'s Special</h3>
              
              <div className="row g-4">
                <div className="col-md-6 border-end">
                  <div className="p-3">
                    <span className="fs-1">☀️</span>
                    <h5 className="fw-bold mt-2">Lunch</h5>
                    <p className="text-muted">{currentMenu.lunch}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3">
                    <span className="fs-1">🌙</span>
                    <h5 className="fw-bold mt-2">Dinner</h5>
                    <p className="text-muted">{currentMenu.dinner}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-warning rounded-pill px-4 shadow-sm" onClick={() => navigate("/calories")} >
            🔥 View Calories
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;