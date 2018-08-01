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

// @route   GET api/:hall_id/seats
// @desc    Get seats of hall by hall id(req.body.showId)
// @access  Public

// @route   GET api/:show_id/seats
// @desc    Get seats of show by show id(req.body.showId)
// @access  Public

module.exports = router;
