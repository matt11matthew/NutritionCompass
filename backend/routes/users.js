const express = require("express");
const router = express.Router();

// Import users controller
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
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

module.exports = router;
