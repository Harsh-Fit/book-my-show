const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  moviePoster: String,
  movieName: String,
  releaseDate: String,
  category: String,
  genre: String,
  rating: String,
  country: String,
});

module.exports = mongoose.model("movielist", movieSchema);
