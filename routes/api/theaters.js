const express = require("express");
const router = express.Router();
const passport = require("passport");

// Theater Model
const Theater = require("../../models/Theater");

// Validation
const validateTheaterInputs = require("../../validation/theater");

// @route   GET api/theaters/test
// @desc    Tests theater route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Theater is Works" }));

// @route   GET api/theaters/:name
// @desc    Get theater profile
// @access  Public
router.get("/:name", (req, res) => {
  const errors = {};

  Theater.findOne({ name: req.params.name })
    .then(theater => {
      if (!theater) {
        errors.nothaeter = "Theater does not exist";
        return res.status(404).json(errors);
      }
      res.json(theater);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/theaters
// @desc    Get theaters list
// @access  Public
router.get("/", (req, res) => {
  Theater.find().then(thears => res.json(thears));
});

// @route   POST api/theaters
// @desc    Create theater profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTheaterInputs(req.body);

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
    fields = {};

    if (req.body.name) fields.name = req.body.name;
    if (req.body.city) fields.city = req.body.city;

    Theater.findOne({ name: req.body.name }).then(theater => {
      if (theater) {
        // Update
        Theater.findOneAndUpdate(
          { name: req.body.name },
          { city: req.body.city },
          { new: true }
        )
          .then(theater => res.json(theater))
          .catch(err => res.json("Can't update theater profile"));
      } else {
        // Create

        // Save Theater profile
        new Theater(fields).save().then(theater => res.json(theater));
      }
    });
  }
);

// @route   DELETE api/theaters/id
// @desc    Delete theater profile through id
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Check Permission
    if (!req.user.isAdmin) {
      // Return 401 error
      return res.status(401).json("Insufficient rights");
    }
    Theater.findById({ _id: req.params.id }).then(theater => {
      if (!theater) return res.json("Theater not found or already removed");
      Theater.findByIdAndRemove({
        _id: req.params.id
      })
        .then(theater => res.json(theater))
        .catch(err => res.json(err));
    });
  }
);

module.exports = router;
