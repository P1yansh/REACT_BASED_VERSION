import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import Checkout from './components/Checkout';
import CustomerReviews from './components/CustomerReviews';


function App() {
  const [user, setUser] = useState({
    name: 'Guest',
    plan: 'Monthly',
    phone: ''
  });

  const [showCookie, setShowCookie] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCookie(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Navbar />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home setUser={setUser} />} />

          <Route path="/menu" element={<Menu />} />

          <Route path="/dashboard" element={<Dashboard user={user} />} />

          <Route path="/checkout" element={<Checkout user={user} />} />

          <Route path="/reviews" element={<CustomerReviews />} />

        </Routes>
      </div>

      {showCookie && (
        <div className="fixed-bottom bg-dark text-white p-3 text-center shadow-lg" style={{ zIndex: 1050 }}>
          <div className="container d-flex justify-content-center align-items-center gap-3">
            <span>🍪 We use cookies to ensure you get the best food experience!</span>
            <button className="btn btn-success btn-sm" onClick={() => setShowCookie(false)}>Accept</button>
          </div>
        </div>
      )}

      <Footer />
    </Router>
  );
}

export default App;