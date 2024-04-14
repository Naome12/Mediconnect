const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/connection'); // Import the database connection

dotenv.config(); // Load environment variables

connectDB(); // Connect to the database

// Import routes
const authRoutes = require('./routes/authRoute');

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api/auth', authRoutes);

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
