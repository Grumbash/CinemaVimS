const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const SeatsSchema = new Schema({
  rowId: {
    type: Schema.Types.ObjectId,
    ref: "rows",
    required: true
  },
  No: {
    type: Number,
    required: true
  },
  VIP: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: true
  },
  reserved: {
    type: Boolean,
    default: false
  }
});

module.exports = Seats = mongoose.model("seats", SeatsSchema, "seats");
