// Require the User and EmailToken models
const User = require("../models/User");
const EmailToken = require("../models/EmailToken"); // may be unnecessary

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
  // attempt to register new user
  // register function included with passport-local-mongoose plugin
  User.register(
    new User({ email: req.body.email, username: req.body.email }),
    req.body.password,
    (err, user) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", data: [], message: err.message });
      } else {
        req.login(user, (err) => {
          if (err) {
            return res
              .status(500)
              .json({ status: "error", data: [], message: err.message });
          }
          return res.status(201).json({
            status: "success",
            data: [user],
            message: "User created.",
          });
        });
      }
    }
  );
};

/**
 * @route   POST /users/login
 * @desc    Login a user.
 * @requires Email and password
 * @optional None
 * @access  Public
 */
const login = async (req, res, next) => {
  // make sure email and password are provided
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ status: "failed", data: [], message: "Email and password required." });
  }
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
