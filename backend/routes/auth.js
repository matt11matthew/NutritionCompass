var express = require("express");
const { check } = require("express-validator");

// Create router
var router = express.Router();

// Import authorization controller
const { register, login, logout } = require("../controllers/auth");
const passport = require("passport");

/**
 * @route   POST /auth/register
 * @desc    Register a new user.
 * @requires Email and password
 * @optional First name, last name, weight, height, activity level
 * @access  Public
 */
router.post(
  "/register",
  check("email").isEmail().normalizeEmail(), // ensure valid email
  check("password").notEmpty().isLength({ min: 8 }), // ensure password >= 8 characters
  passport.authenticate("magiclink", {
    action: "requestToken",
    failureRedirect: "/",
    failureMessage: true,
  }),
  register
);

/**
 * @route   GET /auth/verify?token=token
 * @desc    Verify a user's email.
 */
router.get(
  "/verify",
  passport.authenticate("magiclink", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/");
  } // not implemented yet
);

/**
 * @route   POST /auth/resend
 * @desc    Resend a verification email.
 */
router.post("/resend", (req, res) => {}); // not implemented yet

/**
 * @route   POST /auth/reset
 * @desc    Reset a user's password.
 */
router.post("/reset", (req, res) => {}); // not implemented yet

/**
 * @route   POST /auth/forgot
 * @desc    Send email for forgotten password.
 */
router.post("/forgot", (req, res) => {}); // not implemented yet

/**
 * @route   POST /auth/login
 * @desc    Login a user.
 * @requires Email and password
 * @optional None
 * @access  Public
 */
router.post(
  "/login",
  check("email").isEmail().normalizeEmail(),
  check("password").notEmpty(),
  passport.authenticate(["local", "magiclink"]),
  login
);

/**
 * @route   POST /auth/logout
 * @desc    Logout a user.
 * @requires None
 * @optional None
 * @access  Public
 */
router.post("/logout", logout); // not implemented yet

module.exports = router;
