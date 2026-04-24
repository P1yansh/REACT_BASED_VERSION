// src/api/api.js — Centralized API utility for UrbanBite frontend
// Uses the Vite proxy, so no need to hardcode the backend URL.
// All fetch calls go to /api/... and Vite forwards them to http://localhost:5000

const BASE_URL = '/api';

// ─────────────────────────────────────────────
// Fetch all restaurants
// ─────────────────────────────────────────────
export async function getRestaurants() {
  const response = await fetch(`${BASE_URL}/restaurants`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch restaurants');
  }
  return response.json(); // { success, count, data: [...] }
}

// ─────────────────────────────────────────────
// Fetch menu for a specific restaurant
// ─────────────────────────────────────────────
export async function getMenuByRestaurant(restaurantId) {
  const response = await fetch(`${BASE_URL}/menu/${restaurantId}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch menu');
  }
  return response.json(); // { success, restaurant_id, count, data: [...] }
}

// ─────────────────────────────────────────────
// Place a new order
// orderData: { user_id, restaurant_id, items: [...], total_price }
// ─────────────────────────────────────────────
export async function placeOrder(orderData) {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to place order');
  }
  return response.json(); // { success, message, data: { order_id, ... } }
}
