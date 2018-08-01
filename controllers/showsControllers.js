// Load Model
const Show = require("../models/Show");

// Load Validaton inputs
const validateShowInputs = require("../validation/show");

exports.postShowController = (req, res) => {
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

  if (req.body.hallId) fields.hallId = req.body.hallId;
  if (req.body.movieId) fields.movieId = req.body.movieId;
  if (req.body.date) fields.date = req.body.date;

  Show.findOne({ _id: req.body.id }).then(show => {
    if (show) {
      // Update
      Show.findOneAndUpdate(
        { _id: req.body.id },
        { $set: fields },
        { new: true }
      )
        .then(show => res.json(show))
        .catch(err => res.json(err, "Can't update shows profile"));
    } else {
      // Create and save new Show profile

      new Show(fields).save().then(show => res.json(show));
    }
  });
};

exports.getShowsController = (req, res) => {
  Show.find()
    .populate("movieId")
    .populate("hallId")
    .then(shows => res.json(shows));
};

exports.getShowByIdController = (req, res) => {
  Show.findById(req.params.id)
    .populate("movieId")
    .populate("hallId")
    .then(show => res.json(show));
};

exports.deleteShowByIdController = (req, res) => {
  //Check Permission
  if (!req.user.isAdmin) {
    // Return 401 error
    return res.status(401).json("Insufficient rights");
  }

  Show.findByIdAndRemove(req.params.id).then(show =>
    res.json({ success: true })
  );
};
