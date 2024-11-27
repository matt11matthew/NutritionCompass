const express = require("express");
const router = express.Router();

const{
    getCalorieStats,
    calculateCalorieLimits,
    getCaloriesConsumed,
} = require("../controllers/calories");

/**
 * @route   GET /users/:id/calories
 * @desc    Get user limits & consumed calories.
 * @requires User ID
 * @optional None
 * @access  Public
 */
router.get("users/:id/calories", getCalorieStats);

/**
 * @route   GET /users/:id/caloriesLimits
 * @desc    Calculate calorie limits.
 * @requires User ID, weight, height, age, activity level
 * @optional None
 * @access  Public
 */
router.post("users/:id/caloriesLimits", calculateCalorieLimits);

/**
 * @route   GET /users/:id/caloriesConsumed
 * @desc    Get total calories consumed.
 * @requires User ID
 * @optional None
 * @access  Public
 */
router.get("users/:id/caloriesConsumed", getCaloriesConsumed);

module.exports = router;