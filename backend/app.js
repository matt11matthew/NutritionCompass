// General imports and setup for the app
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

// Set up routers for routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const foodsRouter = require("./routes/foods");
const calorieRouter = require("./routes/calories");

// const foodRouter = require("./routes/foods"); // not yet implemented

const app = express();

// set up environment and middleware
require("dotenv").config(); // load environment variables
app.use(cors()); // default Access-Control-Allow-Origin: *
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// set up external routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/foods", foodsRouter);
app.use("/users", calorieRouter);
// app.use("/calories", calorieRouter); //if i use in the future -ahmed

// connect to database
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database.");
  } catch (err) {
    console.error(err);
  }
};

start();

module.exports = app;
