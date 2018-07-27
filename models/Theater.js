const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create Schema

const TheaterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

module.exports = Theater = mongoose.model(
  "theaters",
  TheaterSchema,
  "theaters"
);
