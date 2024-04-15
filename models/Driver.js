const mongoose= require("mongoose");
const Driver = mongoose.model('Driver', {
  name: String,
  license: String,
  ambulance: { type: mongoose.Schema.Types.ObjectId, ref: 'Ambulance' }
});

module.exports=Driver