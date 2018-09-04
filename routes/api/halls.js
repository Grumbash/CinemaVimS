const express = require("express");
const router = express.Router();

// Load Controllers
const { getHallsController } = require("../../controllers/hallsControllers");

// @route   GET api/halls
// @desc    Get halls for all users
// @access  Public
router.get("/", getHallsController);

module.exports = router;
