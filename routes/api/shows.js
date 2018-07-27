const express = require("express");
const router = express.Router();
const passport = require("passport");

// Import the show model
const Show = require("../../models/Show");

// Validation
const validateShowInputs = require("../../validation/show");

// @route   GET api/shows/test
// @desc    Tests shows route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Shows is Works" }));

// @route   POST api/shows
// @desc    Create show with movie_id and hall_id through body request
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body.seats);
    const { errors, isValid } = validateShowInputs(req.body);

    //Check Permission
    if (!req.user.isAdmin) {
      // Return 401 error
      return res.status(401).json("Insufficient rights");
    }

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const fields = {};

    if (req.body.seats) req.body.seats = fields.seats;
    if (req.body.hallId) req.body.hallId = fields.hallId;
    if (req.body.movieId) req.body.movieId = fields.movieId;
    if (req.body.date) req.body.date = fields.date;

    Show.findOne({ _id: req.body.id }).then(show => {
      if (show) {
        // Update
        Show.findOneAndUpdate(
          { _id: req.body.id },
          { $set, fields },
          { new: true }
        )
          .then(show => res.json(show))
          .catch(err => res.json(err, "Can't update shows profile"));
      } else {
        // Create and save new Show profile

        new Show(fields).save().then(show => res.json(show));
      }
    });
  }
);

// @route   GET api/shows
// @desc    Get array of shows
// @access  Public
router.get("/", (req, res) => {
  Show.find().then(shows => res.json(shows));
});

module.exports = router;
