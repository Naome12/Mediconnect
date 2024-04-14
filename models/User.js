const mongoose = require("mongoose");


const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String,
  paymentMethod: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod' }
});
const Appointment = mongoose.model('Appointment', {
  date: Date,
  time: String,
  provider: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const PaymentMethod = mongoose.model('PaymentMethod', {
  type: String,
  last4: String,
  expMonth: Number,
  expYear: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Ambulance = mongoose.model('Ambulance', {
  licensePlate: String,
  make: String,
  model: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

// Driver model
const Driver = mongoose.model('Driver', {
  name: String,
  license: String,
  ambulance: { type: mongoose.Schema.Types.ObjectId, ref: 'Ambulance' }
});

module.exports = {
  User,
  Appointment,
  PaymentMethod,
  Ambulance,
  Driver
};
