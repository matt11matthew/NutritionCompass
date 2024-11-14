const { Schema, model } = require("mongoose"); // database handling
const passport = require("passport"); // authentication
const { LocalStrategy } = require("passport-local"); // local auth. strategy
const passportLocalMongoose = require("passport-local-mongoose"); // passport-local-mongoose plugin

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
  verified: {
    type: Boolean,
    default: false,
    select: false, // don't return this field by default
  },
  // password: { // handled by passport-local-mongoose
  //   type: String,
  //   select: false,
  //   required: [true, "Users must have a password."],
  //   minLength: [8, "Password must be at least 8 characters long."],
  // },
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

// Should handle hashing passwords now
UserSchema.plugin(passportLocalMongoose); // insert passport-local-mongoose plugin to schema

// Create a new model for a User and export it
module.exports = model("User", UserSchema);
// hey this is ahmed, im worried that the naming chosen here is going to conflict in other files