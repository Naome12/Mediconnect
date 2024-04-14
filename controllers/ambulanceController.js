const Ambulance = require('../models/Ambulance');
const logger = require('../utils/logger');

exports.getAmbulances = async (req, res) => {
  try {
    const ambulances = await Ambulance.find();
    res.json(ambulances);
  } catch (err) {
    logger.error('Error fetching ambulances:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createAmbulance = async (req, res) => {
  try {
    const { licensePlate, make, model, latitude, longitude } = req.body;
    const newAmbulance = new Ambulance({
      licensePlate,
      make,
      model,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    });
    await newAmbulance.save();
    res.status(201).json(newAmbulance);
  } catch (err) {
    logger.error('Error creating ambulance:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateAmbulance = async (req, res) => {
  try {
    const { id } = req.params;
    const { licensePlate, make, model, latitude, longitude } = req.body;
    const updatedAmbulance = await Ambulance.findByIdAndUpdate(
      id,
      {
        licensePlate,
        make,
        model,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude]
        }
      },
      { new: true }
    );
    if (!updatedAmbulance) {
      return res.status(404).json({ error: 'Ambulance not found' });
    }
    res.json(updatedAmbulance);
  } catch (err) {
    logger.error('Error updating ambulance:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteAmbulance = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAmbulance = await Ambulance.findByIdAndDelete(id);
    if (!deletedAmbulance) {
      return res.status(404).json({ error: 'Ambulance not found' });
    }
    res.json({ message: 'Ambulance deleted' });
  } catch (err) {
    logger.error('Error deleting ambulance:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};