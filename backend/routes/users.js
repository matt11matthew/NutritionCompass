const express = require("express");
const router = express.Router();

// Import users controller
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getCalorieStats,
  calculateCalorieLimits,
  getCaloriesConsumed,
} = require("../controllers/users");

/**
 * @route   GET /users
 * @desc    Get all users.
 * @requires None
 * @optional None
 * @access  Public
 */
router.get("/", getUsers);

/**
 * @route   GET /users/:id
 * @desc    Get a user by ID.
 * @requires User ID
 * @optional None
 * @access  Public
 */
router.get("/:id", getUserById);

/**
 * @route   PUT /users/:id
 * @desc    Update a user by ID.
 * @requires User ID
 * @optional First name, last name, weight, height, activity level
 * @access  Users
 */
router.put("/:id", updateUser);

/**
 * @route   DELETE /users/:id
 * @desc    Delete a user by ID.
 * @requires User ID
 * @optional None
 * @access  Admins
 */
router.delete("/:id", deleteUser);

/**
 * @route   GET /users/:id/calories
 * @desc    Get user limits & consumed calories.
 * @requires User ID
 * @optional None
 * @access  Public
 */
router.get("/:id/calories", getCalorieStats);

/**
 * @route   GET /users/:id/caloriesLimits
 * @desc    Calculate calorie limits.
 * @requires User ID, weight, height, age, activity level
 * @optional None
 * @access  Public
 */
router.get("/:id/caloriesLimits", calculateCalorieLimits);

/**
 * @route   GET /users/:id/caloriesConsumed
 * @desc    Get total calories consumed.
 * @requires User ID
 * @optional None
 * @access  Public
 */
router.get("/:id/caloriesConsumed", getCaloriesConsumed);

module.exports = router;
