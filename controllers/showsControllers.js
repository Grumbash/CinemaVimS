// Load Model
const Show = require("../models/Show");

// Load Validaton inputs
const validateShowInputs = require("../validation/show");

const post_UniversalForAdmin = require("./methods/admin/post_UniversalForAdmin");

exports.postShowController = (req, res) => {
  post_UniversalForAdmin(req, res, {
    Model: Show,
    validateFunc: validateShowInputs
  });
};

exports.getShowsController = (req, res) => {
  Show.find()
    .populate("movieId")
    .populate({ path: "hallId", populate: { path: "theaterId" } })
    .then(shows => res.json(shows))
    .catch(err => res.json(err));
};

exports.getShowByIdController = (req, res) => {
  Show.findById(req.params.id)
    .populate("movieId")
    .populate({ path: "hallId", populate: { path: "theaterId" } })
    .then(show => res.json(show))
    .catch(err => res.json(err));
};

exports.deleteShowByIdController = (req, res) => {
  //Check Permission
  if (!req.user.isAdmin) {
    // Return 401 error
    return res.status(401).json("Insufficient rights");
  }

  Show.findByIdAndRemove(req.params.id)
    .then(show => res.json({ success: true }))
    .catch(err => res.json(err));
};
