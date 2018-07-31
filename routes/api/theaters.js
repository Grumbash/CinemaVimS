const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load Controllers
const postTheaterConrtroller = require("../../controllers/theatersControllers");
const getTheatersConrtroller = require("../../controllers/theatersControllers");
const getTheaterByIdConrtroller = require("../../controllers/theatersControllers");
const deleteTheaterByIdConrtroller = require("../../controllers/theatersControllers");
const postHallConrtroller = require("../../controllers/theatersControllers");
const getHallsConrtroller = require("../../controllers/theatersControllers");
const getHallByIdConrtroller = require("../../controllers/theatersControllers");
const deleteHallByIdConrtroller = require("../../controllers/theatersControllers");

// @route   GET api/theaters/test
// @desc    Tests theater route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Theater is Works" }));

// @route   GET api/theaters
// @desc    Get theaters list
// @access  Public
router.get("/", getTheatersConrtroller);

// @route   GET api/theaters/:id
// @desc    Get theater profile
// @access  Public
router.get("/:id", getTheaterByIdConrtroller);

// @route   POST api/theaters
// @desc    Create theater profile and update
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postTheaterConrtroller
);

// @route   DELETE api/theaters/:id
// @desc    Delete theater profile through id
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteTheaterByIdConrtroller
);

// @route   POST api/theaters/:id/halls
// @desc    Post theater halls
// @access  Private
router.post(
  "/:id/halls/",
  passport.authenticate("jwt", { session: false }),
  postHallConrtroller
);

// @route   GET api/theaters/:id/halls
// @desc    Get theater halls
// @access  Public
router.get("/:id/halls", getHallsConrtroller);

// @route   GET api/theaters/:id/halls/:hall_id
// @desc    Get hall by ID
// @access  Public
router.get("/:id/halls/:hall_id", getHallByIdConrtroller);

// @route   DELETE api/theaters/:id/halls/:hall_id
// @desc    Delete hall by ID through parametrs
// @access  Private
router.delete(
  "/:id/halls/:hall_id",
  passport.authenticate("jwt", { session: false }),
  deleteHallByIdConrtroller
);

module.exports = router;
