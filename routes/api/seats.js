const express = require("express");
const router = express.Router();
const passport = require("passport");

// Import the seats model
const Seats = require("../../models/Seats");

// Validation
const validateSeatsInputs = require("../../validation/seats");

// @route   GET api/seats/test
// @desc    Tests seats route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Seats is Works" }));

// @route   GET api/seats
// @desc    Get seats of show by show id(req.body.showId)
// @access  Public
router.get("/", (req, res) => {
  Seats.find()
    .where({ showId: req.body.showId })
    .then(seats => res.json(seats));
});

// @route   POST api/seats
// @desc    Post seats of show by show id(req.body.showId)
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Check Permission and return 401 error if isn't admin
    if (!req.user.isAdmin) return res.status(401).json("Insufficient rights");

    const { errors, isValid } = validateSeatsInputs(req.body);

    // Check Validation return any errors with 400 status
    if (!isValid) return res.status(400).json(errors);

    // const fields = Object.assign({}, req.body);

    Seats.findOne({ showId: req.body.showId }).then(seatHall => {
      if (seatHall) {
        const dbSeats = Object.assign({}, seatHall);
        // Update

        /*********** SHOUD FIX UPDATE ***********/
        Seats.findOneAndUpdate(
          { _id: req.body.id },
          { $set: req.body },
          { new: true }
        )
          .then(seatHall => res.json(seatHall))
          .catch(err => res.json(err, "Can't update seats hall"));
      } else {
        // Create

        // Save Theater profile
        new Seats(req.body).save().then(seatsHall => res.json(seatsHall));
      }
    });
  }
);

module.exports = router;
