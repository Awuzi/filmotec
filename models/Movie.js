const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Movie = new Schema({
  user_id: String,
  movie_id: String,
  critique: String,
  note: Number
});

module.exports = mongoose.model("Movie", Movie);
