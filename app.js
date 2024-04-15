const express = require('express');
const app = express();
const connectDB = require('./utils/db'); 
const logger = require('./utils/logger'); 
const authRoutes = require('./routes/authRoutes');
const appointmentsRoutes = require('./routes/appointmentsRoutes');

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

//her are registered routes
app.use('/auth', authRoutes);
app.use('/api', appointmentsRoutes);

// Error handling
app.use((err, req, res, next) => {
  logger.error('An error occurred:', err);
  res.status(500).json({ error: 'Internal server error' });
});

//the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
