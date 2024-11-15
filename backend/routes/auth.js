var express = require("express");
const { check } = require("express-validator");

// Create router
var router = express.Router();

// Import authorization controller
const { register, login, logout } = require("../controllers/auth");

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
 * @requires None
 * @optional None
 * @access  Public
 */
router.post("/logout", logout); // not implemented yet
/* req.logout(function(err) {
     if (err) {
       return next(err);
     }
     res.redirect('/');
   }); */


module.exports = router;
