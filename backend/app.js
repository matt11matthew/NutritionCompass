// General imports and setup for the app
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const expressSession = require("express-session")

// Passport stuff
const User = require("./models/User");
const LocalStrategy = require("passport-local").Strategy; // local strategy for usernames/passwords
const passport = require("passport");
passport.use(new LocalStrategy(User.authenticate())); // use passport-local-mongoose plugin
passport.serializeUser(User.serializeUser()); // serialize user
passport.deserializeUser(User.deserializeUser()); // deserialize user 

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var verifyEmailRouter = require("./routes/verifyEmail");

var app = express();
app.use(expressSession({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // use passport session

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/users/verifyEmail", verifyEmailRouter);

// For use with personal testing db
require("dotenv").config();
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database.");
  } catch (err) {
    console.error(err);
  }
};

start();
// End of personal testing db use

module.exports = app;
