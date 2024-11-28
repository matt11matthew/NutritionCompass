const Food = require("../models/Food");

/**
 * @route   GET /foods
 * @desc    Get all foods.
 * @requires None
 * @optional None
 * @access  Public
 */
const getFoods = async (req, res, next) => {
    try {
        const foods = await Food.find();
        res
            .status(200)
            .json({ status: "success", data: foods, message: "Foods found." });
    } catch (error) {
        res.status(500).json({ status: "error", data: [], message: error.message });
    }
};

/**
 * @route   GET /foods/:id
 * @desc    Get a food by ID.
 * @requires User ID
 * @optional None
 * @access  Public
 */
const getFoodByUserId = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const foods = await Food.find({userId});
        if (!foods || foods.length === 0) {
            return res
                .status(404)
                .json({ status: "failure", data: [], message: "No foods found." });
        }
        res.status(200).json({ status: "success", data: foods, message: "Foods found." });
    } catch (error) {
        res.status(500).json({ status: "error", data: [], message: error.message });
    }
};

/**
 * @route   GET /foods/:userId/:foodId
 * @desc    Get a food by User ID and Food ID.
 * @requires User ID, Food ID
 * @optional None
 * @access  Public
 */
const getFoodByFoodId = async (req, res, next) => {
    try {
        console.log("req.params:", req.params);

        const { userId, foodId } = req.params;

        console.log("userId:", userId);
        console.log("foodId:", foodId);


        // Find the food document where both `userId` and `_id` match
        const food = await Food.findOne({ _id: foodId, id: userId });

        if (!food) {
            return res
                .status(404)
                .json({ status: "failure", data: [], message: "Food not found for the given User ID and Food ID." });
        }

        res.status(200).json({ status: "success", data: food, message: "Food found." });
    } catch (error) {
        res.status(500).json({ status: "error", data: [], message: error.message });
    }
};


/**
 * @route   POST /foods
 * @desc    Create new food.
 * @requires User ID, name, calories
 * @optional Protein, carbs, fat, description, meal type
 * @access  Users
 */
const createFood = async (req, res, next) => {
    try {
        const food = new Food(req.body); // its expecting userId and food data from request body
        const savedFood = await food.save();
        res.status(201).json({ status: "success", data: savedFood, message: "Food created." });
    } catch (error) {
        res.status(400).json({ status: "error", data: [], message: error.message });
    }
};

/**
 * @route   PUT /foods/:id
 * @desc    Update a food by ID.
 * @requires Food ID
 * @optional Name, calories, macros, description, meal type
 * @access  Users
 */
const updateFood = async (req, res, next) => {
    try {
        const { userId, foodId } = req.params;
        const updatedFood = await Food.findOneAndUpdate(
            { _id: foodId, id: userId }, // Ensure it matches both userId and foodId
            req.body, // Update with the request body
            {
                new: true, // Return the updated document
                runValidators: true, // Validate the updated fields
            }
        );

        if (!updatedFood) {
            return res
                .status(404)
                .json({ status: "failure", data: [], message: "Food not found." });
        }

        res
            .status(200)
            .json({ status: "success", data: updatedFood, message: "Food updated." });
    } catch (error) {
        res.status(400).json({ status: "error", data: [], message: error.message });
    }
};

/**
 * @route   PUT /foods/:id/addUser
 * @desc    Adds user's ID to userID array of a food.
 * @requires Food ID, User ID
 * @optional None
 * @access  Public
 * @status This function is removed for now as we opted to have unique foods per user.
 */
 // const addUserToFood = async (req, res, next) => {
 //    try {
 //      const { userId } = req.body;
 //      const foodId = req.params.id;
 //
 //      if (!userId) {
 //        return res
 //          .status(400)
 //          .json({ status: "error", data: [], message: "User ID required." });
 //      }
 //
 //      const updatedFood = await Food.findByIdAndUpdate(
 //        foodId,
 //        { $addToSet: { userIds: userId } },
 //        { new: true /*, runValidators: true*/ }
 //      );
 //
 //      if (!updatedFood) {
 //        return res
 //          .status(404)
 //          .json({ status: "failure", data: [], message: "Food item not found." });
 //      }
 //
 //      res
 //        .status(200)
 //        .json({
 //          status: "success",
 //          data: updatedFood,
 //          message: "User added to food item successfully.",
 //        });
 //    } catch (error) {
 //      res.status(500).json({ status: "error", data: [], message: error.message });
 //    }
 //  };
  

/**
 * @route   DELETE /foods/:id
 * @desc    Delete a food by ID.
 * @requires Food ID
 * @optional None
 * @access  Users
 */
const deleteFood = async (req, res, next) => {
    try {
        const deletedFood = await Food.findByIdAndDelete(req.params.id);
        if (!deletedFood) {
            return res
                .status(404)
                .json({ status: "failure", data: [], message: "Food not found." });
        }
        res
            .status(200)
            .json({ status: "success", data: [], message: "Food deleted." });
    } catch (error) {
        res.status(500).json({ status: "error", data: [], message: error.message });
    }
};

module.exports = {
    getFoods,
    getFoodByUserId,
    createFood,
    updateFood,
    getFoodByFoodId,
    //addUserToFood,
    deleteFood,
};