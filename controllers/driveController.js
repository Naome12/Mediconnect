const Driver = require('../models/Driver');
const Ambulance = require('../models/Ambulance');
const logger = require('../utils/logger');

exports.getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().populate('ambulance');
    res.json(drivers);
  } catch (err) {
    logger.error('Error fetching drivers:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createDriver = async (req, res) => {
  try {
    const { name, license, ambulanceId } = req.body;
    const ambulance = await Ambulance.findById(ambulanceId);
    if (!ambulance) {
      return res.status(404).json({ error: 'Ambulance not found' });
    }
    const newDriver = new Driver({ name, license, ambulance: ambulance._id });
    await newDriver.save();
    res.status(201).json(newDriver);
  } catch (err) {
    logger.error('Error creating driver:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, license, ambulanceId } = req.body;
    const ambulance = await Ambulance.findById(ambulanceId);
    if (!ambulance) {
      return res.status(404).json({ error: 'Ambulance not found' });
    }
    const updatedDriver = await Driver.findByIdAndUpdate(
      id,
      { name, license, ambulance: ambulance._id },
      { new: true }
    );
    if (!updatedDriver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    res.json(updatedDriver);
  } catch (err) {
    logger.error('Error updating driver:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDriver = await Driver.findByIdAndDelete(id);
    if (!deletedDriver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    res.json({ message: 'Driver deleted' });
  } catch (err) {
    logger.error('Error deleting driver:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};