const express = require("express");
const router = express.Router();
const passport = require("passport");

// Movie Model
const Movie = require("../../models/Movie");

// Validation
const validateMovieInputs = require("../../validation/movie");

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
  (req, res) => {
    // Check Permission and return 401 error if isn't admin
    if (!req.user.isAdmin) return res.status(401).json("Insufficient rights");

    const { errors, isValid } = validateMovieInputs(req.body);

    // Check Validation return any errors with 400 status
    if (!isValid) return res.status(400).json(errors);

    const fields = {};

    if (req.body.title) fields.title = req.body.title;
    if (req.body.duration) fields.duration = req.body.duration;

    Movie.findOne({ title: req.body.title }).then(movie => {
      if (movie) {
        // Update
        Movie.findOneAndUpdate(
          { title: req.body.title },
          { duration: req.body.duration },
          { new: true }
        )
          .then(movie => res.json(movie))
          .catch(err => res.json("Can't update movie profile"));
      } else {
        // Create

        // Save Movie profile
        new Movie(fields).save().then(movie => res.json(movie));
      }
    });
  }
);

// @route   GET api/movies
// @desc    Get movies for all users
// @access  Public
router.get("/", (req, res) => {
  Movie.find().then(moviesArr => res.json(moviesArr));
});

// @route   GET api/movies/:title
// @desc    Get movie for all users
// @access  Public
router.get("/:title", (req, res) => {
  const errors = {};

  Movie.findOne({ title: req.params.title })
    .then(movie => {
      if (!movie) {
        errors.momovie = "Movie does not exist";
        return res.status(404).json(errors);
      }
      res.json(movie);
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/movies/:id
// @desc    Dlete movie through id
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Check Permission and return 401 error if isn't admin
    if (!req.user.isAdmin) return res.status(401).json("Insufficient rights");

    Movie.findById({ _id: req.params.id }).then(movie => {
      if (!movie) return res.json("Movie not found or already removed");
      Movie.findByIdAndRemove({
        _id: req.params.id
      })
        .then(movie => res.json(movie))
        .catch(err => res.json(err));
    });
  }
);

module.exports = router;
