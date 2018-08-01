const express = require("express");
const router = express.Router();
const passport = require("passport");

//Controllers
const {
  postSeatsControllerAdmin,
  getAllSeatsByHallIdController,
  getSeatByIdController,
  deleteSeatByIdController,
  postRowsControllerAdmin,
  getAllRowsController,
  getRowByIdController,
  deleteRowByIdController
} = require("../../controllers/seatsConntrollers");

// @route   GET api/seats/test
// @desc    Tests seats route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Seats is Works" }));

// @route   POST api/seats/:hall_id
// @desc    Post seats on hall by hall_id(req.body.hall)
// @access  Private Admin
router.post(
  "/:hall_id",
  passport.authenticate("jwt", { session: false }),
  postSeatsControllerAdmin
);

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

// @route   POST api/seats/:hall_id/rows
// @desc    Post rows
// @access  Private Admin
router.post(
  "/:hall_id/rows",
  passport.authenticate("jwt", { session: false }),
  postRowsControllerAdmin
);

// @route   GET api/seats/:hall_id/rows
// @desc    Get all rows in hall
// @access  Public
router.get("/:hall_id/rows", getAllRowsController);

// @route   GET api/seats/:hall_id/rows/:row_id
// @desc    Get all rows in hall
// @access  Public
router.get("/:hall_id/rows/:row_id", getRowByIdController);

// @route   GET api/seats/:hall_id/rows/:row_id
// @desc    Get row by id
// @access  Public
router.get("/:hall_id/rows/:row_id", getRowByIdController);

// @route   DELETE api/seats/:hall_id/rows/:row_id
// @desc    Delete row by id
// @access  Privet
router.delete(
  "/:hall_id/rows/:row_id",
  passport.authenticate("jwt", { session: false }),
  deleteRowByIdController
);

// @route   DELETE api/seats/:hall_id/rows
// @desc    Delete row by id
// @access  Privet
router.delete(
  "/:hall_id/rows",
  passport.authenticate("jwt", { session: false }),
  deleteRowByIdController
);
module.exports = router;
