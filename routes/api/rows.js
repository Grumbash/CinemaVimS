const express = require("express");
const router = express.Router();
const passport = require("passport");
//Controllers
const {
  postRowsControllerAdmin,
  getAllRowsController,
  getRowByIdController,
  deleteRowByIdController
} = require("../../controllers/seatsConntrollers");

// @route   GET api/seats/test
// @desc    Tests seats route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Seats is Works" }));

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
// @access  Private
router.delete(
  "/:hall_id/rows/:row_id",
  passport.authenticate("jwt", { session: false }),
  deleteRowByIdController
);

// @route   DELETE api/seats/:hall_id/rows
// @desc    Delete row by id
// @access  Private
router.delete(
  "/:hall_id/rows",
  passport.authenticate("jwt", { session: false }),
  deleteRowByIdController
);

module.exports = router;
