const User = require("../models/User");
const Food = require("../models/Food");

// note for ahmed: pre-save hooks are in models/User.js
// they should stick with model definition

const ACTIVITY_LEVELS = { // for easier calculations
  LOW: 1.2,
  MEDIUM: 1.55,
  HIGH: 1.725,
};

/**
 * @route   GET /users
 * @desc    Get all users.
 * @requires None
 * @optional None
 * @access  Public
 */
const getUsers = async (req, res, next) => {
  const users = await User.find();
  res
      .status(200)
      .json({ status: "success", data: users, message: "Users found." });
};

/**
 * @route   GET /users/:id
 * @desc    Get a user by ID.
 * @requires User ID
 * @optional None
 * @access  Public
 */
const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Fetch the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "failure", message: "User not found." });
    }

    // Respond with the user data
    res.status(200).json({ status: "success", data: user, message: "User found." });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({ status: "error", message: "An error occurred while fetching the user." });
  }
};


/**
 * @route   PUT /users/:id
 * @desc    Update a user by ID.
 * @requires User ID
 * @optional First name, last name, weight, height, activity level
 * @access  Users
 */
const updateUser = async (req, res) => {
  try {
    const id = req.params.id; // Get the user ID from the request parameters
    const updates = req.body; // Get the update data from the request body
    console.log("Received userId in params:", id);
    if (!id) {
      return res.status(400).json({
        status: "failed",
        message: "User ID is required.",
      });
    }
    console.log("Received updates:", updates);
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found.",
      });
    }

    // Update fields directly
    Object.keys(updates).forEach((key) => {
      user[key] = updates[key];
    });


    console.log("Users before saving:", user);

    // Save the updated user document
    const updatedUser = await user.save();

    console.log("User after saving:", updatedUser);

    // Respond with the updated user
    res.status(200).json({
      status: "success",
      data: user,
      message: "User profile updated successfully.",
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({
      status: "error",
      message: "An error occurred while updating the user profile.",
    });
  }
};


/**
 * @route   DELETE /users/:id
 * @desc    Delete a user by ID.
 * @requires User ID
 * @optional None
 * @access  Admins
 */
const deleteUser = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res
          .status(404)
          .json({ status: "error", data: [], message: "User not found." });
    }

    // food deletion management below, first deletes userid from foods, second deletes all foods user created, PICK ONE BASED ON DESIGN

    await Food.updateMany( // if we opt for multiple users per food, we will need this & next few lines
      { userIds: req.params.id }, 
      { $pull: { userIds: req.params.id } }
    );

    // await Food.deleteMany({ userId: req.params.id }); // if we opt for unique foods per user, we will need this line

    res
        .status(200)
        .json({ status: "success", data: [], message: "User deleted." });
  } catch (err) {
    res.status(500).json({ status: "error", data: [], message: err.message });
  }
};

/**
 * @route   GET /users/:id/calories
 * @desc    Get user limits and calories.
 * @requires User ID
 * @optional None
 * @access  Public
 */
const getCalorieStats = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found." });
    }

    // Find foods associated with the user
    const foods = await Food.find({ userId }); // Use correct field name

    // Calculate total calories consumed
    const caloriesConsumed = foods.reduce((sum, food) => sum + (food.calories || 0), 0);

    // Calculate calorie limits
    const calorieLimits = calculateBMR(user);

    // Return response
    res.status(200).json({
      status: "success",
      data: { calorieLimits, caloriesConsumed },
      message: "Calories calculated successfully.",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
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
      data: { calorieLimit: calorieLimits.calorieLimit },
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
const getCaloriesConsumed = async (req, res, next) => { // calculates and returns only the number of consumed calories
  try{
    const userId = req.params.id;
    const foods = await Food.find({userId});
    const caloriesConsumed = foods.reduce((sum, food) => sum + food.calories, 0);

    res.status(200).json({
      status: "success",
      data: caloriesConsumed,
      message: "Consumed calories calculated successfully.",
    });
  } catch (error) {
    res.status(500).json({status: "error", message: error.message});
  }
};

//helper function below for BMR and kcal lims
const calculateBMR = (user) => {
  const { weight, feet, inches, age, activityLevel, sex, weightGoal } = user;

  console.log("User details for BMR calculation:", { weight, feet, inches, age, activityLevel, sex, weightGoal });

  if (
      weight == null ||
      feet == null ||
      inches == null ||
      age == null ||
      !sex ||
      !activityLevel
  ) {
    throw new Error("Missing required user details for BMR calculation");
  }

  // Convert weight to kilograms (if input is in pounds)
  const weightInKg = weight * 0.453592;

  // Convert height to centimeters
  const heightInCm = (feet * 30.48) + (inches * 2.54);

  // Adjusted BMR calculation
  let bmr;
  if (sex === "FEMALE") {
    bmr = 9.6 * weightInKg + 1.8 * heightInCm - 4.7 * age + 655; // Adjusted baseline constant
  } else if (sex === "MALE") {
    bmr = 13.7 * weightInKg + 5 * heightInCm - 6.8 * age + 66; // Adjusted baseline constant
  } else {
    throw new Error("Invalid sex value. Must be 'MALE' or 'FEMALE'.");
  }

  console.log(`Calculated BMR before activity multiplier: ${bmr}`);

  // Apply activity level multiplier
  const ACTIVITY_LEVELS = { LOW: 1.2, MEDIUM: 1.55, HIGH: 1.725 };
  const multiplier = ACTIVITY_LEVELS[activityLevel.toUpperCase()] || 1.2;
  let calorieLimit = bmr * multiplier;

  console.log(`Calorie limit after applying activity multiplier: ${calorieLimit}`);

  // Adjust for weight goals
  const weightGoalInKg = weightGoal * 0.453592;
  const weightDifference = weightInKg - weightGoalInKg;
  if (weightDifference > 0) {
    calorieLimit -= 500; // Weight loss: Subtract 500 calories
  } else if (weightDifference < 0) {
    calorieLimit += 500; // Weight gain: Add 500 calories
  }

  console.log(`Final calorie limit after goal adjustment: ${calorieLimit}`);

  return { bmr, calorieLimit };
};


module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getCalorieStats,
  calculateCalorieLimits,
  getCaloriesConsumed,
};
