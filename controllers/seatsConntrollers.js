// Import the seats model
const Seats = require("../models/Seats");
const Row = require("../models/Row");
const User = require("../models/User");
const Reservation = require("../models/Reservation");
const Theater = require("../models/Theater");

// Validation
const validateSeatsInputs = require("../validation/seats");
const validateRowsInputs = require("../validation/rows");

// Combain function
const post_UniversalForAdmin = require("./methods/admin/post_UniversalForAdmin");

exports.postSeatsControllerAdmin = (req, res, next) => {
  post_UniversalForAdmin(req, res, {
    Model: Seats,
    validateFunc: validateSeatsInputs,
    check: req.body.No
  });
};

exports.getAllSeatsByHallIdController = (req, res, next) => {
  Seats.find()
    .where(req.params.hall_id)
    .then(seats => res.json(seats));
};

exports.getSeatByIdController = (req, res, next) => {
  Seats.findById(req.params.seat_id).then(seat => res.json(seat));
};

exports.deleteSeatByIdController = (req, res, next) => {
  if (!req.user.isAdmin) {
    // Return 401 error
    return res.status(401).json("Insufficient rights");
  }
  Seats.findById(req.body.id).then(seat => {
    if (seat) {
      Seats.findByIdAndRemove(req.body.id).then(() =>
        res.json({ success: true })
      );
    } else {
      return res.status(404).json({ error: "Not founded to deletind" });
    }
  });
};

exports.postRowsControllerAdmin = (req, res, next) => {
  post_UniversalForAdmin(req, res, {
    Model: Row,
    validateFunc: validateRowsInputs,
    check: req.body.No
  });
};

exports.getAllRowsController = (req, res, next) => {
  Row.find()
    .where({ hall: req.params.hall_id })
    .populate({ path: "hall", populate: { path: "theaterId" } })
    .then(rows => res.json(rows));
};

exports.getRowByIdController = (req, res, next) => {
  Row.findById(req.params.row_id)
    .where({ hall: req.params.hall_id })
    .populate({ path: "hall", populate: { path: "theaterId" } })
    .then(row => res.json(row));
};

exports.deleteRowByIdController = (req, res, next) => {
  if (!req.user.isAdmin) {
    // Return 401 error
    return res.status(401).json("Insufficient rights");
  }
  Row.findById(req.body.id).then(row => {
    if (row) {
      Row.findByIdAndRemove(req.body.id).then(() =>
        res.json({ success: true })
      );
    } else {
      return res.status(404).json({ error: "Not founded to deletind" });
    }
  });
};
