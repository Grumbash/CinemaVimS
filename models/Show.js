const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const ShowSchema = new Schema({
  hallId: {
    type: Schema.Types.ObjectId,
    ref: "halls",
    required: true
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "movies",
    required: true
  },
  rowsId: {
    type: Schema.Types.ObjectId,
    ref: "rows"
  },
  date: Date
});

module.exports = Show = mongoose.model("shows", ShowSchema, "shows");
