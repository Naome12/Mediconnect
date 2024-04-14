const Appointment = require('../models/Appointment');
const logger = require('../utils/logger');

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id });
    res.json(appointments);
  } catch (err) {
    logger.error('Error fetching appointments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { date, time, provider } = req.body;
    const newAppointment = new Appointment({ date, time, provider, user: req.user.id });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    logger.error('Error creating appointment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time, provider } = req.body;
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { date, time, provider },
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json(updatedAppointment);
  } catch (err) {
    logger.error('Error updating appointment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAppointment = await Appointment.findOneAndDelete({ _id: id, user: req.user.id });
    if (!deletedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    logger.error('Error deleting appointment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};