const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const ReservationSchema = new Schema({
  price: {
    type: Number,
    required: true
  },
  show: {
    type: Schema.Types.ObjectId,
    ref: "shows"
  },
  reserved: {
    type: Boolean,
    default: false
  },
  from: {
    type: Date
  },
  to: {
    //Incriment Date + 15 min???
    type: Date
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = Reservation = mongoose.model(
  "reservations",
  ReservationSchema,
  "reservations"
);
