const moment = require("moment");

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

exports.postSeatsControllerAdmin = (req, res) => {
  post_UniversalForAdmin(req, res, {
    Model: Seats,
    validateFunc: validateSeatsInputs
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

exports.postRowsControllerAdmin = (req, res) => {
  const { body } = req;
  const { errors, isValid } = validateRowsInputs(body);
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

  const fields = Object.assign({}, body);

  Promise.all(
    body.map(rowNow => {
      if (rowNow.hasOwnProperty("id")) {
        let proms = Row.findById(rowNow.id).then(elemWrap => {
          if (elemWrap) {
            rowNow.seats = rowNow.seats.map(seat => seat.id);
            return Row.findOneAndUpdate(
              { _id: rowNow.id },
              { $set: rowNow },
              { new: true }
            );
          } else {
            return {
              status: 404,
              msg: `Item with id :${rowNow.id} not founded`
            };
          }
        });
        return proms;
      } else {
        const seats = rowNow.seats.map(seat => {
          if (seat.hasOwnProperty("id")) {
            let proms = Seats.findById(seat.id).then(elemWrap => {
              if (elemWrap) {
                return Seats.findOneAndUpdate(
                  { _id: seat.id },
                  { $set: seat },
                  { new: true }
                ).then(seat => seat.id);
              } else {
                return {
                  status: 404,
                  msg: `Item with id :${seat.id} not founded`
                };
              }
            });
            return proms;
          } else {
            return new Seats(seat)
              .save()
              .then(seat => seat.id)
              .catch(err => err);
          }
        });
        return Promise.all(seats).then(seatsIds => {
          rowNow.seats = seatsIds;
          return new Row(rowNow).save();
        });
      }
    })
  )
    .then(all => {
      Promise.all(
        all.map(row => {
          return Row.findById(row.id)
            .where({ hall: row.hall })
            .populate({
              path: "seats",
              populate: {
                path: "reservation",
                populate: { path: "show", populate: { path: "movieId" } }
              }
            })
            .populate({ path: "hall", populate: { path: "theaterId" } });
        })
      )
        .then(rows => res.json(rows))
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
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
    .then(rows => res.json(rows))
    .catch(err => res.json(err));
};

exports.getRowByIdController = (req, res, next) => {
  Row.findById(req.params.row_id)
    .where({ hall: req.params.hall_id })
    .populate({ path: "hall", populate: { path: "theaterId" } })
    .then(row => res.json(row))
    .catch(err => res.json(err));
};

exports.deleteRowByIdController = (req, res, next) => {
  if (!req.user.isAdmin) {
    // Return 401 error
    return res.status(401).json("Insufficient rights");
  }
  Row.findById(req.body.id)
    .then(row => {
      if (row) {
        Row.findByIdAndRemove(req.body.id).then(() =>
          res.json({ success: true })
        );
      } else {
        return res.status(404).json({ error: "Not founded to deletind" });
      }
    })
    .catch(err => res.json(err));
};

exports.putReservationBySeatIdControllerAdmin = (req, res) => {
  if (!req.user.isAdmin) {
    // Return 401 error
    return res.status(401).json("Insufficient rights");
  }

  const from = moment().toISOString();
  const to = moment(from)
    .add(15, "m")
    .toISOString();
  const from_to = { from, to };

  const fields = Object.assign({}, from_to, req.body);

  const { errors, isValid } = validateReservationInputsAdmin(fields);

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
        Reservation.findByIdAndUpdate(
          { _id: fields.id },
          { $set: fields },
          { new: true }
        )
          .then(newReserv => res.json(newReserv))
          .catch(err => res.json(err));
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
          .then(elem => res.json(elem))
          .catch(err => res.json(err));
      }
    });
  });
};

exports.putReservationBySeatIdControllerUser = (req, res) => {
  const from = moment().toISOString();
  const to = moment(from)
    .add(15, "m")
    .toISOString();
  const from_to = { from, to };

  const fields = Object.assign({}, from_to, req.body);

  if (!fields.user) {
    fields.user = req.user._id;
  }

  const { errors, isValid } = validateReservationInputs(fields);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Seats.findById(req.params.seat_id)
    .then(seat => {
      if (!seat) {
        return res.status(404).json({ seat: "seat is not found" });
      }
      Reservation.findById(fields._id)
        .then(reserv => {
          if (reserv) {
            if (fields.user.toString() !== req.user.id) {
              return res
                .status(401)
                .json({ notauthorized: "User not authorized" });
            }
            Reservation.findByIdAndUpdate(
              { _id: fields._id },
              { $set: fields },
              { new: true }
            )
              .then(reservation => {
                res.json(reservation);
              })
              .catch(err => res.json(err));
          } else {
            new Reservation(fields)
              .save()
              .then(elem => {
                Seats.findById(req.params.seat_id).then(seat =>
                  seat.reservation.push(elem._id)
                );
                return elem;
              })
              .then(elem => res.json(elem))
              .catch(err => res.json(err));
          }
        })
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
};

exports.getReservationByReservationIdController = (req, res) => {
  Reservation.findById(req.params.reservation_id)
    .populate({
      path: "show",
      populate: { path: "hallId", populate: { path: "theaterId" } }
    })
    .populate({ path: "show", populate: { path: "movieId" } })
    .populate("user")
    .then(reserv => res.json(reserv))
    .catch(err => res.json(err));
};

exports.deleteReservationByReservationIdController = (req, res) => {
  if (!req.user.isAdmin) {
    // Return 401 error
    return res.status(401).json("Insufficient rights");
  }
  Reservation.findById(req.body.id)
    .then(reservarion => {
      if (
        reservarion &&
        (req.user.isAdmin || req.user.id === reservation.user._id)
      ) {
        Reservation.findByIdAndRemove(req.body.id).then(() =>
          res.json({ success: true })
        );
      } else if (!(req.user.isAdmin || req.user.id === reservation.user._id)) {
        return res.status(404).json({ error: "Insufficient rights" });
      } else {
        return res.status(404).json({ error: "Not founded to deletind" });
      }
    })
    .catch(err => res.json(err));
};
