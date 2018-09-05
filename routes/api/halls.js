const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Controllers
const {
  getHallsController,
  postHallsController
} = require("../../controllers/hallsControllers");

// @route   GET api/halls
// @desc    Get halls for all users
// @access  Public
router.get("/", getHallsController);

// @route   POST api/halls
// @desc    Post hall
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postHallsController
);

module.exports = router;
