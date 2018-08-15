const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Controllers
const {
  postMoviesController,
  getMovieByIdController,
  getMoviesController,
  deleteMovieByIdController
} = require("../../controllers/movieControllers");

// @route   GET api/movies/test
// @desc    Tests movie route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Movies is Works" }));

// @route   POST api/movies
// @desc    Post movie wuth admins permission
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postMoviesController
);

// @route   GET api/movies
// @desc    Get movies for all users
// @access  Public
router.get("/", getMoviesController);

// @route   GET api/movies/:title
// @desc    Get movie for all users
// @access  Public
router.get("/:id", getMovieByIdController);

// @route   DELETE api/movies/:id
// @desc    Dlete movie through id
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteMovieByIdController
);

module.exports = router;
