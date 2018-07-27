const express = require("express");
const router = express.Router();
const passport = require("passport");

// Theater Model
const Theater = require("../../models/Theater");
// Hall Model
const Hall = require("../../models/Hall");

// Validation
const validateTheaterInputs = require("../../validation/theater");
const validateHallInputs = require("../../validation/hall");

// @route   GET api/theaters/test
// @desc    Tests theater route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Theater is Works" }));

// @route   GET api/theaters/:id
// @desc    Get theater profile
// @access  Public
router.get("/:id", (req, res) => {
  const errors = {};

  Theater.findOne({ _id: req.params.id })
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
// @desc    Create theater profile and update
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
    const fields = {};

    if (req.body.name) fields.name = req.body.name;
    if (req.body.city) fields.city = req.body.city;

    Theater.findOne({ _id: req.body.id }).then(theater => {
      if (theater) {
        // Update
        Theater.findOneAndUpdate(
          { _id: req.body.id },
          { $set: fields },
          { new: true }
        )
          .then(theater => res.json(theater))
          .catch(err => res.json(err, "Can't update theater profile"));
      } else {
        // Create

        // Save Theater profile
        new Theater(fields).save().then(theater => res.json(theater));
      }
    });
  }
);

// @route   DELETE api/theaters/:id
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

// @route   POST api/theaters/:id/halls
// @desc    Post theater halls
// @access  Private
router.post(
  "/:id/halls/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateHallInputs(req.body);

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

    if (req.body.No) fields.No = req.body.No;
    if (req.body.theaterId) fields.theaterId = req.body.theaterId;
    if (req.body.showId) fields.showId = req.body.showId;

    Hall.findOne({ _id: req.body.id }).then(hall => {
      if (hall) {
        // Update
        Hall.findOneAndUpdate(
          { _id: req.body.id },
          { $set: fields },
          { new: true }
        )
          .then(hall => res.json(hall))
          .catch(err => res.json(err, "Can't update hall profile"));
      } else {
        // Create

        // Save hall profile
        new Hall(fields).save().then(hall => res.json(hall));
      }
    });
  }
);

// @route   GET api/theaters/:id/halls
// @desc    Get theater halls
// @access  Public
router.get("/:id/halls", (req, res) => {
  Hall.find()
    .where({ theaterId: req.params.id })
    .then(halls => res.json(halls));
});

// @route   GET api/theaters/:id/halls/:hall_id
// @desc    Get hall by ID
// @access  Public
router.get("/:id/halls/:hall_id", (req, res) => {
  Hall.findById(req.params.hall_id).then(hall => res.json(hall));
});

// @route   DELETE api/theaters/:id/halls/:hall_id
// @desc    Delete hall by ID through parametrs
// @access  Private
router.delete(
  "/:id/halls/:hall_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Check Permission
    if (!req.user.isAdmin) {
      // Return 401 error
      return res.status(401).json("Insufficient rights");
    }
    Hall.findByIdAndRemove(req.params.hall_id).then(hall => res.json(hall));
  }
);

// @route   DELETE api/theaters/:id/halls/
// @desc    Delete hall by ID through body request
// @access  Private
router.delete(
  "/:id/halls",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Check Permission
    if (!req.user.isAdmin) {
      // Return 401 error
      return res.status(401).json("Insufficient rights");
    }
    Hall.findByIdAndRemove(req.body.id).then(hall => res.json(hall));
  }
);

module.exports = router;
