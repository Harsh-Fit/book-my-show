const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  movieName: String,
  poster: String,
  location: String,
  theater: String,
  bookedSeats: Array,
  time: String,
  food: String,
  price: String,
  totalPrice: String,
});

module.exports = mongoose.model("bookinglist", bookingSchema);
