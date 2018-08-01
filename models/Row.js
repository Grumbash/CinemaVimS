const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const RowsSchema = new Schema({
  hall: {
    type: Schema.Types.ObjectId,
    ref: "halls",
    required: true
  },
  No: {
    type: Number,
    required: true
  },
  seats: [
    {
      type: Schema.Types.ObjectId,
      ref: "seats"
    }
  ]
});

module.exports = Rows = mongoose.model("rows", RowsSchema, "rows");
