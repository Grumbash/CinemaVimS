const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const SeatsSchema = new Schema({
  row: {
    type: Schema.Types.ObjectId,
    ref: "rows"
  },
  No: {
    type: Number,
    required: true
  },
  VIP: {
    type: Boolean,
    default: false
  },
  shows: [
    {
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
        type: Date,
        default: Date.now
      },
      to: {
        //Incriment Date + 15 min???
        type: Date
      }
    }
  ]
});

module.exports = Seats = mongoose.model("seats", SeatsSchema, "seats");
