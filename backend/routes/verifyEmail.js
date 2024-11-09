const express = require("express");
const router = express.Router();

// Import emailVerification controller
const {
  sendVerificationEmail,
  verifyEmail,
} = require("../controllers/verifyEmail");

/**
 * @route   POST /users/verifyEmail
 * @desc    Send verification email.
 * @requires None
 * @optional None
 * @access  Public
 */
router.post("/", sendVerificationEmail);

/**
 * @route   GET /users/verifyEmail/:token
 * @desc    Verify user account using token sent in email.
 * @requires Token
 * @optional None
 * @access  Public
 */
router.get("/:token", verifyEmail);

// Export router
module.exports = router;
