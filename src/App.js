import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Dashboard from "./components/Dashboard";
import Checkout from "./components/Checkout";

function App() {
  const [user, setUser] = useState({
    name: "Guest",
    plan: "Monthly",
    phone: "",
  });

  const [showCookie, setShowCookie] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCookie(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {/* App shell */}
      <div className="d-flex flex-column min-vh-100 bg-light">
        {/* Top navbar */}
        <Navbar />

        {/* Main content area */}
        <main className="flex-grow-1 py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-11">
                <div className="bg-white shadow-sm rounded-4 p-3 p-md-4 app-content-wrapper">
                  <Routes>
                    <Route path="/" element={<Home setUser={setUser} />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route
                      path="/dashboard"
                      element={<Dashboard user={user} />}
                    />
                    <Route
                      path="/checkout"
                      element={<Checkout user={user} />}
                    />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Cookie banner */}
        {showCookie && (
          <div
            className="cookie-banner shadow-lg"
            style={{
              position: "fixed",
              bottom: "1rem",
              left: 0,
              right: 0,
              zIndex: 1050,
            }}
          >
            <div className="container">
              <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 gap-md-3 py-2 px-3 px-md-4 rounded-3 bg-dark text-white">
                <div className="d-flex align-items-center gap-2">
                  <span style={{ fontSize: "1.5rem" }}>🍪</span>
                  <div>
                    <div className="fw-semibold">Cookie notice</div>
                    <small className="text-white-50">
                      We use cookies to give you a better and more personalized
                      food experience.
                    </small>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={() => setShowCookie(false)}
                  >
                    Decline
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => setShowCookie(false)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
