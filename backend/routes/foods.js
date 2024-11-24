// Import express and create new router
const express = require("express");
const router = express.Router();

// Import controller functions
const {
    createFood,
    getFoods,
    getFoodById,
    updateFood,
    deleteFood,
} = require("../controllers/foods");

/**
 * @route   POST /foods
 * @desc    Create a new food item.
 * @requires Food Name, Calorie Number
 * @optional Protein Number, Carbs Number, Fat Number
 * @access  Public
 */
router.post("/", createFood);

/**
 * @route   GET /foods
 * @desc    Get all foods.
 * @requires None
 * @optional None
 * @access  Public
 */
router.get("/", getFoods);

/**
 * @route   GET /foods/:id
 * @desc    Get a ood by ID.
 * @requires Food ID
 * @optional None
 * @access  Public
 */
router.get("/:id", getFoodById);

/**
 * @route   PUT /foods/:id
 * @desc    Update a food by ID.
 * @requires Food ID
 * @optional Food Name, Calorie Number, Protein Number, Carbs Number, Fat Number
 * @access  Public
 */
router.put("/:id", updateFood);

/**
 * @route   DELETE /foods/:id
 * @desc    Delete a food by ID.
 * @requires Food ID
 * @optional None
 * @access  Public
 */
router.delete("/:id", deleteFood);

// Export router
module.exports = router;