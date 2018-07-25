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
  },
  halls: {
    type: Schema.Types.ObjectId,
    ref: "halls"
  }
});

module.exports = Theater = mongoose.model(
  "theaters",
  TheaterSchema,
  "theaters"
);
