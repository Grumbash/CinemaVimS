// Movie Model
const Movie = require("../models/Movie");

// Validation
const validateMovieInputs = require("../validation/movie");

// Combain function
const post_UniversalForAdmin = require("./methods/admin/post_UniversalForAdmin");

exports.postMoviesController = (req, res, next) => {
  post_UniversalForAdmin(req, res, {
    Model: Movie,
    validateFunc: validateMovieInputs
  });
};

exports.getMoviesController = (req, res) => {
  Movie.find().then(moviesArr => res.json(moviesArr));
};

exports.getMovieByIdController = (req, res, next) => {
  const errors = {};

  Movie.findOne({ _id: req.params.id })
    .then(movie => {
      if (!movie) {
        errors.momovie = "Movie does not exist";
        return res.status(404).json(errors);
      }
      res.json(movie);
    })
    .catch(err => res.status(404).json(err));
};

exports.deleteMovieByIdController = (req, res) => {
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
};
