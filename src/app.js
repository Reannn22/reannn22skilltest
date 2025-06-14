const express = require('express');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Add JSON formatting
app.set('json spaces', 2);

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
