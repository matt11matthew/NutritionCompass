const { Schema, model } = require("mongoose");
const { genSalt, hash } = require("bcrypt");

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

// Hash password before saving to database
UserSchema.pre("save", async function (next) {
  // no need to re-hash password if it hasn't been modified
  if (!this.isModified("password")) return next();

  // hash password
  try {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt); // set hashed password
    next();
  } catch (error) {
    next(error); // pass on error to next middleware
  }
});

// Create a new model for a User and export it
module.exports = model("User", UserSchema);
