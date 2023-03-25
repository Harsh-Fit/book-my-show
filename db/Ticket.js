const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
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
  cardNo: String,
  cardHolder: String,
  expDate: String,
});

module.exports = mongoose.model("ticketlists", ticketSchema);
