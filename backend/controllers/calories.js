const User = require("../models/User");
const Food = require("..models/Food");

const ACTIVITY_LEVELS = { // for easier calculations
    LOW: 1.2,
    MEDIUM: 1.55,
    HIGH: 1.725,
};

/**
 * @route   GET /users/:id/calories
 * @desc    Get user limits and calories.
 * @requires User ID
 * @optional None
 * @access  Public
 */
const getCalorieStats = async (req, res) => { // returns both kcal limits and consumed num
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({status: "error", message: "User not found."});
        }

        const foods = await Food.find({ userIds: userId});
        const caloriesConsumed = foods.reduce((sum, food) => sum + food.calories, 0);

        const calorieLimits = calculateBMR(user);

        res.status(200).json({
            status: "success",
            data: {calorieLimits, caloriesConsumed},
            message: "Calories calculated successfully.",
        });
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
};

/**
 * @route   GET /users/:id/caloriesLimits
 * @desc    Calculate calorie limits.
 * @requires User ID, weight, height, age, activity level
 * @optional None
 * @access  Public
 */
const calculateCalorieLimits = async (req, res) => { // returns only the calculation of kcal limit
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({status: "error", message: "User not found."});
        }

        const calorieLimits = calculateBMR(user);

        res.status(200).json({
            status: "success",
            data: calorieLimits,
            message: "Calorie limits calculated successfully.",
        });
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
};

/**
 * @route   GET /users/:id/caloriesConsumed
 * @desc    Get total calories consumed.
 * @requires User ID
 * @optional None
 * @access  Public
 */
const getCaloriesConsumed = async (req, res) => { // calculates and returns only the number of consumed calories
    try{
        const userId = req.params.id;
        const foods = await Food.find({userIds: userId});
        const caloriesConsumed = foods.reduce((sum, food) => sum + food.calories, 0);

        res.status(200).json({
            status: "success",
            data: caloriesConsumed,
            message: "Consumed calories calculated successfully.",
        });
    } catch (error) {
        res.status(500).json({status: "error", message: error.message});
    }
}

//helper function below for BMR and kcal lims
const calculateBMR = (user) => {
    const {weight, height, age, activityLevel, gender} = user;
    let bmr;
    if (gender === "MALE"){
        bmr = 9.6 * weight + 1.8 * height - 4.7 * age + 655;
    } else if (gender === "FEMALE") {
        bmr = 13.7 * weight * 5 * height - 6.8 * age + 66;
    } else {
        throw new Error("Gender not in database.");
    }

    const multiplier = ACTIVITY_LEVELS[activityLevel.toUpperCase()] || 1.2;
    const calorieLimit = bmr * multiplier;

    return {bmr, calorieLimit};
}

module.exports = {
    getCalorieStats,
    calculateCalorieLimits,
    getCaloriesConsumed,
};