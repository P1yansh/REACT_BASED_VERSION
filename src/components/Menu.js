import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const [CurrentDay, setCurrentDay] = useState('Monday');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const menuData = {
    Monday: { lunch: "Rajma Chawal + Jeera Aloo", dinner: "Mix Veg + 4 Rotis + Dal Fry" },
    Tuesday: { lunch: "Kadi Pakoda + Rice", dinner: "Paneer Butter Masala + Naan" },
    Wednesday: { lunch: "Chole Kulche", dinner: "Egg Curry / Malai Kofta + Rice" },
  };

  const currentMenu = menuData[CurrentDay] || { lunch: "nahi socha", dinner: "nahi socha" };

  return (
    <div className="container py-5">
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
      <button className="btn btn-warning rounded-pill px-4" onClick={() => navigate("/calories")} >
        🔥 View Calories
      </button>
    </div>
      </div>
    </div>
  );
};

export default Menu;