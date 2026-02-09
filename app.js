const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const employeeRoutes = require('./routes/employeeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
