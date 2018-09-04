// Theater Model
const Theater = require("../models/Theater");
// Hall Model
const Hall = require("../models/Hall");

// Validation
const validateTheaterInputs = require("../validation/theater");
const validateHallInputs = require("../validation/hall");

// Unic post functions
const post_UniversalForAdmin = require("./methods/admin/post_UniversalForAdmin");

// Unic get functions
const {
  getAll_UniversalForAdmin
} = require("./methods/admin/get_UniversalForAdmin");

exports.postTheaterConrtroller = (req, res) => {
  post_UniversalForAdmin(req, res, {
    Model: Theater,
    validateFunc: validateTheaterInputs
  });
};

exports.getTheatersConrtroller = (req, res, next) => {
  getAll_UniversalForAdmin(req, res, { Model: Theater });
};
exports.getTheaterByIdConrtroller = (req, res, next) => {
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
};
exports.deleteTheaterByIdConrtroller = (req, res, next) => {
  //Check Permission
  if (!req.user.isAdmin) {
    // Return 401 error
    return res.status(401).json("Insufficient rights");
  }
  Theater.findById({ _id: req.params.id })
    .then(theater => {
      if (!theater) return res.json("Theater not found or already removed");
      Theater.findByIdAndRemove({ _id: req.params.id })
        .then(theater => res.json(theater))
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
};

exports.postHallConrtroller = (req, res, next) => {
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
      new Hall(fields)
        .save()
        .then(hall => res.json(hall))
        .catch(err => res.json(err));
    }
  });
};
exports.getHallsConrtroller = (req, res) => {
  Hall.find()
    .where({ theaterId: req.params.id })
    .populate("theaterId")
    .then(halls => res.json(halls))
    .catch(err => res.json(err));
};
exports.getHallByIdConrtroller = (req, res) => {
  Hall.findById(req.params.hall_id)
    .populate("theaterId")
    .then(hall => res.json(hall))
    .catch(err => res.json(err));
};

exports.deleteHallByIdConrtroller = (req, res) => {
  //Check Permission
  if (!req.user.isAdmin) {
    // Return 401 error
    return res.status(401).json("Insufficient rights");
  }
  Hall.findByIdAndRemove(req.params.hall_id)
    .then(hall => res.json(hall))
    .catch(err => res.json(err));
};
