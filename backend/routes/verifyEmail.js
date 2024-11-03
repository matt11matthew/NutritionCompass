const express = require("express");
const router = express.Router();

// Import emailVerification controller
const {
  sendVerificationEmail,
  verifyEmail,
} = require("../controllers/verifyEmail");

/**
 * @route   POST /users/verifyEmail/:id
 * @desc    Send verification email.
 * @requires User ID
 * @optional None
 * @access  Public
 */
router.post("/", sendVerificationEmail);

/**
 * @route   GET /users/verifyEmail/:id/:token
 * @desc    Verify user account using token sent in email.
 * @requires User ID and token
 * @optional None
 * @access  Public
 */
router.get("/:id/:token", verifyEmail);

// Export router
module.exports = router;
