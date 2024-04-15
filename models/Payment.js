const mongoose= require("mongoose");
const PaymentMethod = mongoose.model('PaymentMethod', {
    type: String,
    last4: String,
    expMonth: Number,
    expYear: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });
module.exports=PaymentMethod;