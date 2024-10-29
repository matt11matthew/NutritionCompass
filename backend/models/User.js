const { Schema, model } = require("mongoose"); // database handling
const { genSalt, hash } = require("bcrypt"); // password hashing
const passport = require("passport"); // authentication
const { LocalStrategy } = require("passport-local"); // local auth. strategy

// Create a new schema for a User
const UserSchema = new Schema({
  firstName: {
    type: String,
    maxLength: [50, "First name cannot be more than 50 characters."],
  },
  lastName: {
    type: String,
    maxLength: [50, "Last name cannot be more than 50 characters."],
  },
  email: {
    type: String,
    required: [true, "Users must have an email."],
    unique: true,
    isEmail: true,
    verified: {
      type: Boolean,
      default: false,
      select: false, // don't return this field by default
    },
  },
  password: {
    type: String,
    select: false,
    required: [true, "Users must have a password."],
    minLength: [8, "Password must be at least 8 characters long."],
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  activityLevel: {
    type: String,
    enum: ["LOW", "MED", "HIGH"],
  },
  sex: {
    type: String,
    enum: ["MALE", "FEMALE", "OTHER"],
  },
});

/**
 * PASSPORTJS LOCAL STRATEGY STUFF HERE
 * and maybe in pre-save hook?
 */

// Hash password before creating model
UserSchema.pre("save", async function (next) {
  // no need to re-hash password if it hasn't been modified
  if (!this.isModified("password")) return next();

  // hash password
  try {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt); // set hashed password with added spice
    return next();
  } catch (error) {
    return next(error); // pass on error to next middleware
  }
});

// Create a new model for a User and export it
module.exports = model("User", UserSchema);
