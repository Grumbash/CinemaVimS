// Import the seats model
const Seats = require("../models/Seats");
const Row = require("../models/Row");
const User = require("../models/User");
const Reservation = require("../models/Reservation");
const Theater = require("../models/Theater");

// Validation
const validateSeatsInputs = require("../validation/seats");
const validateRowsInputs = require("../validation/rows");
const validateReservationInputs = require("../validation/reservation");
const validateReservationInputsAdmin = require("../validation/reservation-admin");

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
    .populate("reservation")
    .then(seats => res.json(seats));
};

exports.getSeatByIdController = (req, res, next) => {
  Seats.findById(req.params.seat_id)
    .populate({
      path: "reservation",
      populate: {
        path: "show",
        populate: {
          path: "hallId",
          populate: {
            path: "theaterId"
          }
        }
      }
    })
    .populate({
      path: "reservation",
      populate: {
        path: "show",
        populate: {
          path: "movieId"
        }
      }
    })
    .then(seat => res.json(seat));
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
    .populate({
      path: "seats",
      populate: {
        path: "reservation",
        populate: { path: "show", populate: { path: "movieId" } }
      }
    })
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

exports.putReservationBySeatIdControllerAdmin = (req, res) => {
  if (!req.user.isAdmin) {
    // Return 401 error
    return res.status(401).json("Insufficient rights");
  }

  const fields = Object.assign({}, req.body);

  const { errors, isValid } = validateReservationInputsAdmin(fields);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Seats.findById(req.params.seat_id).then(seat => {
    if (!seat) {
      console.log(req.params.seat_id);
      return res.status(404).json({ seat: "seat is not found" });
    }

    Reservation.findById(fields.id).then(reserv => {
      if (reserv) {
        Reservation.findByIdAndUpdate(
          { _id: fields.id },
          { $set: fields },
          { new: true }
        );
      } else {
        new Reservation(fields)
          .save()
          .then(elem => {
            Seats.findById(req.params.seat_id).then(seat => {
              seat.reservation.push(elem._id);
              seat.save();
            });
            return elem;
          })
          .then(elem => res.json(elem));
      }
    });
  });
};

// Need test
exports.putReservationBySeatIdControllerUser = (req, res) => {
  const fields = Object.assign({}, req.body);

  if (!fields.user) {
    fields.user = req.user.id;
  }

  const { errors, isValid } = validateReservationInputs(fields);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Seats.findById(req.params.seat_id).then(seat => {
    if (!seat) {
      return res.status(404).json({ seat: "seat is not found" });
    }
    Reservation.findById(fields.id).then(reserv => {
      if (reserv) {
        if (reserv.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }
        Reservation.findByIdAndUpdate(
          { _id: fields.id },
          { $set: fields },
          { new: true }
        );
      } else {
        new Reservation(fields)
          .save()
          .then(elem => {
            Seats.findById(req.params.seat_id).then(seat =>
              seat.reservation.push(elem._id)
            );
            return elem;
          })
          .then(elem => res.json(elem));
      }
    });
  });
};

exports.getReservationBySeatIdController = (req, res) => {};
