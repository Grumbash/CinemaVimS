const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const SeatsSchema = new Schema({
  No: {
    type: Number,
    required: true
  },
  VIP: {
    type: Boolean,
    default: false
  },
  reservation: [
    {
      type: Schema.Types.ObjectId,
      ref: "reservations"
    }
  ]
});

module.exports = Seats = mongoose.model("seats", SeatsSchema, "seats");
