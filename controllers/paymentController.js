const PaymentMethod = require('../models/PaymentMethod');
const logger = require('../utils/logger');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.addPaymentMethod = async (req, res) => {
  try {
    const { type, last4, expMonth, expYear } = req.body;
    const newPaymentMethod = new PaymentMethod({ type, last4, expMonth, expYear, user: req.user.id });
    await newPaymentMethod.save();
    res.status(201).json(newPaymentMethod);
  } catch (err) {
    logger.error('Error adding payment method:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find({ user: req.user.id });
    res.json(paymentMethods);
  } catch (err) {
    logger.error('Error fetching payment methods:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updatePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, last4, expMonth, expYear } = req.body;
    const updatedPaymentMethod = await PaymentMethod.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { type, last4, expMonth, expYear },
      { new: true }
    );
    if (!updatedPaymentMethod) {
      return res.status(404).json({ error: 'Payment method not found' });
    }
    res.json(updatedPaymentMethod);
  } catch (err) {
    logger.error('Error updating payment method:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deletePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPaymentMethod = await PaymentMethod.findOneAndDelete({ _id: id, user: req.user.id });
    if (!deletedPaymentMethod) {
      return res.status(404).json({ error: 'Payment method not found' });
    }
    res.json({ message: 'Payment method deleted' });
  } catch (err) {
    logger.error('Error deleting payment method:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.processPayment = async (req, res) => {
  try {
    const { appointmentId, paymentMethodId } = req.body;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    const paymentMethod = await PaymentMethod.findById(paymentMethodId);
    if (!paymentMethod) {
      return res.status(404).json({ error: 'Payment method not found' });
    }

    const { amount } = appointment; // Assuming the appointment model has an `amount` field
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe requires the amount in cents
      currency: 'usd',
      payment_method: paymentMethod.id,
      customer: req.user.id,
      off_session: true,
      confirm: true
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    logger.error('Error processing payment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};