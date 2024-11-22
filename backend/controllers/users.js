const User = require("../models/User");

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
  const userId = req.params.id;
  const user = User.findById(userId);
  if (!user) {
    res.status(400).json({status: "failure", data: [], message: "No user found."});
  }

  res.status(200).json({status: "success", data: user, message: "User found."})
};

/**
 * @route   PUT /users/:id
 * @desc    Update a user by ID.
 * @requires User ID
 * @optional First name, last name, weight, height, activity level
 * @access  Users
 */
const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      res.status(400).json({status: "failed", data: [], message: "User does not exist."});
    }

    // user exists, see what changes to apply
    // STILL NEEDS WORK
  } catch (error) {
    res.status(500).json({ status: "error", data: [], message: error.message });
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
