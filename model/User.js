const mongoose = require("mongoose");

// User model
const userSChema = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

const user = mongoose.model("User", userSChema);
module.exports = user;
