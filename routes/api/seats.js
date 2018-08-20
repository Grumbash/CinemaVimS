const express = require("express");
const router = express.Router();
const passport = require("passport");

//Controllers
const {
  postSeatsControllerAdmin,
  getAllSeatsByHallIdController,
  getSeatByIdController,
  deleteSeatByIdController,
  putReservationBySeatIdControllerAdmin,
  putReservationBySeatIdControllerUser,
  getReservationByReservationIdController,
  deleteReservationByReservationIdController
} = require("../../controllers/seatsConntrollers");

// @route   GET api/seats/test
// @desc    Tests seats route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Seats is Works" }));

// @route   GET api/seats/:hall_id
// @desc    Get all seats in hall
// @access  Public
router.get("/:hall_id", getAllSeatsByHallIdController);

// @route   GET api/seats/:hall_id/:seat_id
// @desc    Get seat by id(req.params.seat_id)
// @access  Public
router.get("/:hall_id/:seat_id", getSeatByIdController);

// @route   DELETE api/seats/:hall_id/:seat_id
// @desc    Delete seat by id(req.body.seat_id)
// @access  Private
router.delete(
  "/:hall_id/:seat_id",
  passport.authenticate("jwt", { session: false }),
  deleteSeatByIdController
);

// @route   POST api/seats/admin/:hall_id/:seat_id/reservation
// @desc    Post reservation by seats id
// @access  Private Admin
router.post(
  "/admin/:hall_id/:seat_id/reservation",
  passport.authenticate("jwt", { session: false }),
  putReservationBySeatIdControllerAdmin
);

// @route   POST api/seats/:hall_id
// @desc    Post seats on hall by hall_id(req.body.hall)
// @access  Private Admin
router.post(
  "/:hall_id",
  passport.authenticate("jwt", { session: false }),
  postSeatsControllerAdmin
);

// @route   GET api/seats/:hall_id/:seat_id/reservation/:reservation_id
// @desc    Get reservation by hall id
// @access  Public
router.get(
  "/:hall_id/:seat_id/reservation/:reservation_id",
  passport.authenticate("jwt", { session: false }),
  getReservationByReservationIdController
);

// @route   POST api/seats/:hall_id/:seat_id/reservation
// @desc    Post reservation by seats id
// @access  Public
router.post(
  "/:hall_id/:seat_id/reservation",
  passport.authenticate("jwt", { session: false }),
  putReservationBySeatIdControllerUser
);

// @route   DELETE api/seats/:hall_id/:seat_id/reservation
// @desc    Delete reservation by seats id
// @access  Private
router.delete(
  "/:hall_id/:seat_id/reservation",
  passport.authenticate("jwt", { session: false }),
  deleteReservationByReservationIdController
);
module.exports = router;
