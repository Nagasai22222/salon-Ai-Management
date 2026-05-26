require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');

const app = express();

// Connect MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running successfully'
  });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/branches', require('./routes/branchRoutes'));

// Future Routes (Uncomment when created)
// app.use('/api/appointments', require('./routes/appointmentRoutes'));
// app.use('/api/services', require('./routes/serviceRoutes'));
// app.use('/api/inventory', require('./routes/inventoryRoutes'));
// app.use('/api/chat', require('./routes/chatbotRoutes'));

// Default Route
app.get('/', (req, res) => {
  res.send('Salon Management System Backend API Running...');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
  );
});