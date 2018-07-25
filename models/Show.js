const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const ShowSchema = new Schema({
  movie: {
    type: Schema.Types.ObjectId,
    ref: "movies"
  },
  seats: [
    {
      type: Array,
      reserved: Boolean
    }
  ],
  date: Date
});

module.exports = Show = mongoose.model("shows", ShowSchema, "shows");
