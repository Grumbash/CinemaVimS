const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const HallSchema = new Schema({
  theaterId: {
    type: Schema.Types.ObjectId,
    ref: "theaters",
    required: true
  },
  No: {
    type: Number,
    required: true
  },
  shows: [
    {
      type: Schema.Types.ObjectId,
      ref: "shows",
      required: false
    }
  ]
});

module.exports = Hall = mongoose.model("halls", HallSchema, "halls");
