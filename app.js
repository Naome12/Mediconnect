const express = require('express');
const app = express();
const connectDB = require('./database/connection'); 
const logger = require('./utils/logger');
const authRoutes = require('./routes/authRoutes');
const appointmentsRoutes = require('./routes/appointmentRoutes');
const ambulanceRoutes = require('./routes/ambulanceRoutes'); 
const driverRoutes = require('./routes/driverRoutes'); 

// Middlewares
app.use(express.json());

// Connection to MongoDB
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/api', appointmentsRoutes);
app.use('/api', ambulanceRoutes);
app.use('/api', driverRoutes);

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
