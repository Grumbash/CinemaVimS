const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const ShowSchema = new Schema({
  hallId: {
    type: Schema.Types.ObjectId,
    ref: "halls"
  },
  movieId: {
    type: Schema.Types.ObjectId,
    ref: "movies"
  },
  seats: {
    type: Array,
    required: true
  },
  date: Date
});

module.exports = Show = mongoose.model("shows", ShowSchema, "shows");
