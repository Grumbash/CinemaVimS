const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  duration: {
    type: Number, // seconds
    required: true
  }
});

module.exports = Movie = mongoose.model("movies", MovieSchema);
