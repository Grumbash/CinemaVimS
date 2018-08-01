const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load Controllers
const {
  postShowController,
  getShowsController,
  getShowByIdController,
  deleteShowByIdController
} = require("../../controllers/showsControllers");

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
  postShowController
);

// @route   GET api/shows
// @desc    Get array of shows
// @access  Public
router.get("/", getShowsController);

// @route   GET api/shows/:id
// @desc    Get show by id
// @access  Public
router.get("/:id", getShowByIdController);

// @route   DELETE api/shows/:id
// @desc    Delete show by ID
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteShowByIdController
);

module.exports = router;
