const mongoose= require("mongoose");
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
module.exports=Ambulance;