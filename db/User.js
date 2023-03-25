const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  dob: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("userlist", userSchema);
