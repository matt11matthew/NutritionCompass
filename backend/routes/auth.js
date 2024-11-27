var express = require("express");
const { check } = require("express-validator");

// Create router
var router = express.Router();

// Import authorization controller
const { register, login, logout, reset } = require("../controllers/auth");

// Import JSON Web Token middleware
const { authUserToken } = require("../middleware/jwt");

// NOTE
// If a route needs to be protected, include authUserToken middleware before final
// function call (actual controller)
// This will pass their cookie through the middleware and then verify them
// Frontend shouldn't(?) need to do anything; any unverified requests will result in 401 error
// IF YOU DO NEED BACK TOKEN
// It can be obtained through the login API response
// OR ahmed and I can implement a special function for it

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
 * @desc    Reset a user password using userId.
 * @requires userId, newPassword, confirmNewPassword
 * @optional None
 * @access  Public
 */
router.post(
    "/reset",
    check("userId").notEmpty().withMessage("UserId is required"),
    check("newPassword")
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
    check("confirmNewPassword")
        .notEmpty()
        .withMessage("Confirm password field is required"),
    reset
);



module.exports = router;
