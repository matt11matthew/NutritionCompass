// Import express and create new router
const express = require("express");
const router = express.Router();

// Import controller functions
const {
    createFood,
    getFoods,
    getFoodByUserId,
    updateFood,
    getFoodByFoodId,
    //addUserToFood,
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
 * @route   GET /foods/:id/:foodId
 * @desc    Get a food by User ID and Food ID.
 * @requires User ID, Food ID
 * @optional None
 * @access  Public
 */
router.get('/:id/:foodId', getFoodByFoodId);

/**
 * @route   GET /foods/:id
 * @desc    Get a ood by ID.
 * @requires User ID
 * @optional None
 * @access  Public
 */
router.get("/:id", getFoodByUserId);

/**
 * @route   PUT /foods/:id/:foodId
 * @desc    Update a food by ID.
 * @requires Food ID
 * @optional Food Name, Calorie Number, Protein Number, Carbs Number, Fat Number
 * @access  Public
 */
router.put("/:id/:foodId", updateFood);

/**
 * @route   PUT /foods/:id/addUser
 * @desc    Adds user's ID to userID array of a food.
 * @requires Food ID, User ID
 * @optional None
 * @access  Public
 * @status  This function is removed for now as we opted to have unique foods per user.
 */
// router.put("/:id/addUser", addUserToFood);

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