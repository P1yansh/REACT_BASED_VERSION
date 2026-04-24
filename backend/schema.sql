-- UrbanBite MySQL Schema
-- Run this in your MySQL client to set up the database and tables

CREATE DATABASE IF NOT EXISTS urbanbite;
USE urbanbite;

-- ─────────────────────────────────
-- Restaurants Table
-- ─────────────────────────────────
CREATE TABLE IF NOT EXISTS restaurants (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(255)   NOT NULL,
  cuisine       VARCHAR(100),
  address       TEXT,
  rating        DECIMAL(2, 1)  DEFAULT 0.0,
  image_url     VARCHAR(500),
  created_at    TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────
-- Menu Items Table
-- ─────────────────────────────────
CREATE TABLE IF NOT EXISTS menu (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id   INT            NOT NULL,
  name            VARCHAR(255)   NOT NULL,
  description     TEXT,
  price           DECIMAL(10, 2) NOT NULL,
  category        VARCHAR(100),
  image_url       VARCHAR(500),
  is_available    BOOLEAN        DEFAULT TRUE,
  created_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- ─────────────────────────────────
-- Orders Table
-- ─────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  user_id         INT            NOT NULL,
  restaurant_id   INT            NOT NULL,
  items           JSON           NOT NULL,    -- stores the ordered items array
  total_price     DECIMAL(10, 2) NOT NULL,
  status          ENUM('pending', 'confirmed', 'preparing', 'delivered', 'cancelled')
                                 DEFAULT 'pending',
  created_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- ─────────────────────────────────
-- Sample Seed Data
-- ─────────────────────────────────
INSERT INTO restaurants (name, cuisine, address, rating) VALUES
  ('The Burger Joint',  'American', '12 Main Street, Mumbai',    4.5),
  ('Spice Garden',      'Indian',   '34 Park Avenue, Delhi',     4.2),
  ('Pasta Paradise',    'Italian',  '56 Lake Road, Bangalore',   4.7);

INSERT INTO menu (restaurant_id, name, description, price, category) VALUES
  (1, 'Classic Burger',       'Juicy beef patty with lettuce, tomato, cheese', 199.00, 'Burgers'),
  (1, 'Double Smash Burger',  'Two smashed beef patties, special sauce',        299.00, 'Burgers'),
  (1, 'Crispy Fries',         'Golden crispy fries with dipping sauce',         99.00,  'Sides'),
  (2, 'Butter Chicken',       'Creamy tomato-based chicken curry',              349.00, 'Mains'),
  (2, 'Paneer Tikka',         'Grilled cottage cheese with spices',             249.00, 'Starters'),
  (2, 'Garlic Naan',          'Soft naan bread with garlic butter',             49.00,  'Bread'),
  (3, 'Spaghetti Bolognese',  'Classic meat sauce pasta',                       399.00, 'Pasta'),
  (3, 'Margherita Pizza',     'Fresh mozzarella, tomato, basil',                449.00, 'Pizza'),
  (3, 'Tiramisu',             'Classic Italian coffee dessert',                 199.00, 'Desserts');
