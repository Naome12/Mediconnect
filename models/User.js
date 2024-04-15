const mongoose = require("mongoose");


const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String,
  paymentMethod: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod' }
});


module.exports = User