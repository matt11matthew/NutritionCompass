var express = require("express");
const { check } = require("express-validator");

// Create router
var router = express.Router();

// Import authorization controller
const { register, login, logout, reset } = require("../controllers/auth");

// Import JSON Web Token middleware
const { authUserToken } = require("../middleware/jwt");

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
  register
);

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
  login
);

/**
 * @route   POST /auth/logout
 * @desc    Logout a user.
 * @requires JSON Web Token
 * @optional None
 * @access  Public
 */
router.post(
    "/logout",
    check("email").isEmail().normalizeEmail(),
    authUserToken,

    logout); // not implemented yet

/**
 * @route   POST /auth/reset
 * @desc    Reset a user password.
 * @requires JSON Web Token, New Password, Old Password
 * @optional None
 * @access  Public
 */
router.post(
    "/reset",
    check("email").isEmail().normalizeEmail(),
    authUserToken,

    reset); // not implemented yet

module.exports = router;
