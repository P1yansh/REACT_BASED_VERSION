// db.js — MySQL connection pool using mysql2/promise
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,      // max 10 concurrent connections in the pool
  queueLimit: 0,            // unlimited queueing
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Test the connection on startup (non-fatal — server keeps running even if DB is down)
pool.getConnection()
  .then((connection) => {
    console.log('✅ MySQL connected successfully (pool initialized with real DB)');
    connection.release();
  })
  .catch((err) => {
    console.error('⚠️  MySQL not reachable:', err.message);
    console.error('   → Start MySQL service and the pool will auto-reconnect on next request.');
  });

module.exports = pool;
