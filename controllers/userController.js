const User = require("../model/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express= require("express");
const app= express();
const route = app.Router();

// Register route
app.post('/register', [
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('password').isLength({ min: 6 })
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      // Create a new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });
      await newUser.save();
  
      res.status(201).json({ message: 'User created' });
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Login route
  app.post('/login', async (req, res) => {
    try {
      // Find the user
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Compare the password
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });