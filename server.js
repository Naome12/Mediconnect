const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));


// Appointment model
const Appointment = mongoose.model('Appointment', {
  date: Date,
  time: String,
  provider: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});



// Appointments routes
app.get('/appointments', async (req, res) => {
  try {
    // Fetch appointments for the authenticated user
    const appointments = await Appointment.find({ user: req.user.id });
    res.json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/appointments', async (req, res) => {
  try {
    // Create a new appointment for the authenticated user
    const newAppointment = new Appointment({
      date: req.body.date,
      time: req.body.time,
      provider: req.body.provider,
      user: req.user.id
    });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error('Error creating appointment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
