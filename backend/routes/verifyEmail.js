const express = require("express");
const router = express.Router();

// Import emailVerification controller
const { sendVerificationEmail, verifyEmail } = require("../controllers/verifyEmail");

/** 
 * @route   POST /users/verifyEmail
 * @desc    Send verification email.
 * @requires Email
 * @optional None
 * @access  Public
 */
router.post("/", sendVerificationEmail);

/**
 * @route   POST /users/verifyEmail/:id/:code
 * @desc    Verify user account using code sent in email.
 * @requires User ID and code
 * @optional None
 * @access  Public
 */
router.post("/:id/:code", verifyEmail);