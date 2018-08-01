const express = require("express");
const router = express.Router();
const passport = require("passport");
// Load Controllers
const {
  postUserRegisterController,
  postUserLoginController,
  getCurrentUserController
} = require("../../controllers/usersControllers");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   POST api/users/test
// @desc    Tests users route
// @access  Public
router.post("/register", postUserRegisterController);

// @route   POST api/users/login
// @desc    Login User / Return JWT Token
// @access  Public

router.post("/login", postUserLoginController);

// @route   GET api/users/current
// @desc    Return current user
// @access  Public
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  getCurrentUserController
);

module.exports = router;
