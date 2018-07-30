const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const SeatsSchema = new Schema({
  showId: {
    type: Schema.Types.ObjectId,
    ref: "shows",
    required: true
  },
  rows: [
    {
      No: Number,
      seats: [
        {
          VIP: {
            type: Boolean,
            default: false
          },
          price: Number,
          reserved: {
            type: Boolean,
            default: false
          }
        }
      ]
    }
  ]
});

module.exports = Seats = mongoose.model("seats", SeatsSchema, "seats");
