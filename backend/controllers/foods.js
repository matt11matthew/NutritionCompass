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
 * @requires Food ID
 * @optional None
 * @access  Public
 */
const getFoodById = async (req, res, next) => {
    try {
        const foodId = req.params.id;
        const food = await Food.findById(foodId);
        if (!food) {
            return res
                .status(404)
                .json({ status: "failure", data: [], message: "Food not found." });
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
        const foodId = req.params.id;
        const updatedFood = await Food.findByIdAndUpdate(foodId, req.body, {
            new: true, // updated document returned
            // runValidators: true, // testing smthn with pre-save hook on my end, this should autorun with each time this is called
        });

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
    getFoodById,
    createFood,
    updateFood,
    //addUserToFood,
    deleteFood,
};