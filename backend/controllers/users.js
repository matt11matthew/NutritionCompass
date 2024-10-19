// Require the User model
const User = require("../models/User");

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
  res.send("respond with a resource");
};

/**
 * @route   POST /users/register
 * @desc    Register a new user.
 * @requires Email and password
 * @optional First name, last name, weight, height, activity level
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    // attempt to create new user
    const newUser = new User(req.body);

    // make sure user email doesn't already exist
    if (await User.findOne({ email: newUser.email })) {
      return res
        .status(400)
        .json({ status: "failed", data: [], message: "User already exists." });
    }

    // send out email verification
    /**
     * STUB
     */

    // save user to database
    const savedUser = await newUser.save();
    const { password, ...user } = savedUser._doc; // remove password from returned user object
    res
      .status(201)
      .json({ status: "success", data: [user], message: "User created." });
  } catch (error) {
    // error creating user
    res.status(500).json({ status: "error", data: [], message: error.message });
  }

  // end the response
  res.end();
};

/**
 * @route   POST /users/login
 * @desc    Login a user.
 * @requires Email and password
 * @optional None
 * @access  Public
 */
const login = async (req, res, next) => {
  // TO DO
};

/**
 * @route   PUT /users/:id
 * @desc    Update a user by ID.
 * @requires User ID
 * @optional First name, last name, weight, height, activity level
 * @access  Users
 */
const updateUser = async (req, res, next) => {
  res.send("respond with a resource");
};

/**
 * @route   DELETE /users/:id
 * @desc    Delete a user by ID.
 * @requires User ID
 * @optional None
 * @access  Admins
 */
const deleteUser = async (req, res, next) => {
  res.send("respond with a resource");
};

module.exports = {
  getUsers,
  getUserById,
  register,
  login,
  updateUser,
  deleteUser,
};
