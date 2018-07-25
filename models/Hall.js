const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const HallSchema = new Schema({
  No: {
    type: Number,
    required: true
  },
  shows: {
    type: Schema.Types.ObjectId,
    ref: "shows"
  }
});

module.exports = Hall = mongoose.model("halls", HallSchema, "halls");
