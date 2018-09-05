const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

// Create Schema

const from = moment().toISOString();
const to = moment(from)
  .add(15, "m")
  .toISOString();

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
  ],
  rows: [
    {
      No: {
        type: Number,
        required: true
      },
      seats: [
        {
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
              price: {
                type: Number,
                required: true
              },
              reserved: {
                type: Boolean,
                default: false
              },
              available_from: {
                type: Date,
                default: from
              },
              available_to: {
                type: Date,
                default: to
              },
              user: {
                type: Schema.Types.ObjectId,
                ref: "users"
              }
            }
          ]
        }
      ]
    }
  ]
});

module.exports = Hall = mongoose.model("halls", HallSchema, "halls");
