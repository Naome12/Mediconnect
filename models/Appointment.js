const mongoose= require("mongoose");
const Appointment = mongoose.model('Appointment', {
    date: Date,
    time: String,
    provider: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });

module.exports=Appointment;