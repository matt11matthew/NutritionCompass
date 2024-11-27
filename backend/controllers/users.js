const User = require("../models/User");
const Food = require("../models/Food");

// note for ahmed: pre-save hooks are in models/User.js
// they should stick with model definition

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

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
