// Movie Model
const Movie = require("../models/Movie");

// Validation
const validateMovieInputs = require("../validation/movie");

module.exports = postMoviesController = (req, res, next) => {
  // Check Permission and return 401 error if isn't admin
  if (!req.user.isAdmin) return res.status(401).json("Insufficient rights");

  const { errors, isValid } = validateMovieInputs(req.body);

  // Check Validation return any errors with 400 status
  if (!isValid) return res.status(400).json(errors);

  const fields = {};

  if (req.body.title) fields.title = req.body.title;
  if (req.body.duration) fields.duration = req.body.duration;
  if (req.body.shows) fields.shows = req.body.shows;

  Movie.findOne({ _id: req.body.id }).then(movie => {
    if (movie) {
      // Update
      Movie.findOneAndUpdate(
        { _id: req.body.id },
        { $set: fields },
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
};

module.exports = getMoviesController = (req, res) => {
  Movie.find().then(moviesArr => res.json(moviesArr));
};

module.exports = getMovieByTitleController = (req, res, next) => {
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
};

module.exports = deleteMovieByIdController = (req, res) => {
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
