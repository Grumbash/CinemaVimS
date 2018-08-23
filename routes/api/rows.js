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

// @route   GET api/rows/test
// @desc    Tests seats route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Seats is Works" }));

// @route   POST api/rows/:hall_id
// @desc    Post rows
// @access  Private Admin
router.post(
  "/:hall_id",
  passport.authenticate("jwt", { session: false }),
  postRowsControllerAdmin
);

// @route   GET api/rows/:hall_id/rows
// @desc    Get all rows in hall
// @access  Public
router.get("/:hall_id", getAllRowsController);

// @route   GET api/rows/:hall_id/:row_id
// @desc    Get all rows in hall
// @access  Public
router.get("/:hall_id/:row_id", getRowByIdController);

// @route   DELETE api/rows/:hall_id/:row_id
// @desc    Delete row by id
// @access  Private
router.delete(
  "/:hall_id/:row_id",
  passport.authenticate("jwt", { session: false }),
  deleteRowByIdController
);

module.exports = router;
