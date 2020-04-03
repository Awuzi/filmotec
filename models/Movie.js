const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Movie = new Schema({
    username: String,
    movie_id: Number,
    comment: String,
    eval: Number
});

module.exports = mongoose.model("Movie", Movie);
