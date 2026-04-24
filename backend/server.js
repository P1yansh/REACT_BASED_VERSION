// server.js — UrbanBite Express API Server
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────
app.use(cors({
  origin: 'http://localhost:5173', // Vite default dev port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json()); // Parse incoming JSON request bodies

// ─────────────────────────────────────────────
// Health Check
// ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'UrbanBite API is running!', database: 'real MySQL' });
});

// ─────────────────────────────────────────────
// GET /api/restaurants — Fetch all restaurants
// ─────────────────────────────────────────────
app.get('/api/restaurants', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM restaurants');
    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error('Error fetching restaurants:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch restaurants',
      error: error.message,
    });
  }
});

// ─────────────────────────────────────────────
// GET /api/menu/:id — Fetch menu by restaurant ID
// ─────────────────────────────────────────────
app.get('/api/menu/:id', async (req, res) => {
  const restaurantId = parseInt(req.params.id, 10);

  if (isNaN(restaurantId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid restaurant ID. Must be a number.',
    });
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM menu WHERE restaurant_id = ?',
      [restaurantId]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No menu found for restaurant ID ${restaurantId}`,
      });
    }

    res.status(200).json({
      success: true,
      restaurant_id: restaurantId,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error('Error fetching menu:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch menu',
      error: error.message,
    });
  }
});

// ─────────────────────────────────────────────
// POST /api/orders — Place a new order
// Expected body: { user_id, restaurant_id, items: [...], total_price }
// ─────────────────────────────────────────────
app.post('/api/orders', async (req, res) => {
  const { user_id, restaurant_id, items, total_price } = req.body;

  // Basic validation
  if (!user_id || !restaurant_id || !items || !total_price) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: user_id, restaurant_id, items, total_price',
    });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Items must be a non-empty array',
    });
  }

  try {
    // Store items array as JSON string
    const itemsJson = JSON.stringify(items);

    const [result] = await pool.query(
      `INSERT INTO orders (user_id, restaurant_id, items, total_price, status, created_at)
       VALUES (?, ?, ?, ?, 'pending', NOW())`,
      [user_id, restaurant_id, itemsJson, total_price]
    );

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      data: {
        order_id: result.insertId,
        user_id,
        restaurant_id,
        items,
        total_price,
        status: 'pending',
      },
    });
  } catch (error) {
    console.error('Error placing order:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to place order',
      error: error.message,
    });
  }
});

// ─────────────────────────────────────────────
// 404 Handler — catch-all for unknown routes
// ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.url} not found`,
  });
});

// ─────────────────────────────────────────────
// Global Error Handler
// ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message,
  });
});

// ─────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`UrbanBite backend running at http://localhost:${PORT}`);
});
