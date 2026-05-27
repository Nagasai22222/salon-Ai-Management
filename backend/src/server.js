require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('../config/db');
// ⚠️ IMPORTANT: adjust path if needed

const app = express();

// Connect MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// =========================
// ROUTES
// =========================

// Root route
app.get('/', (req, res) => {
  res.send('Salon Management System Backend API Running...');
});

// Health check route (IMPORTANT)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running successfully 🚀'
  });
});

// Auth routes
app.use('/api/auth', require('../routes/authRoutes'));

// Branch routes
app.use('/api/branches', require('../routes/branchRoutes'));

// Future routes (optional)
// app.use('/api/appointments', require('../routes/appointmentRoutes'));
// app.use('/api/services', require('../routes/serviceRoutes'));
// app.use('/api/inventory', require('../routes/inventoryRoutes'));
// app.use('/api/chat', require('../routes/chatbotRoutes'));

// =========================
// ERROR HANDLER
// =========================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
  );
});