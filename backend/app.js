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
// const calorieRouter = require("./routes/calories"); //testing

const app = express();

// set up environment and middleware
require("dotenv").config(); // load environment variables
// app.use(cors({
//   origin: "https://nc.matthewe.me", // Allow requests from your HTTPS frontend
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true, // Allow cookies if required
// }));
app.use(cors());
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
// app.use("/users", calorieRouter); //testing
// app.use("/calories", calorieRouter); //if i use in the future -ahmed

// connect to database
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB:", process.env.MONGO_URI);
  } catch (err) {
    console.error("Error starting the backend:", err.message);
    process.exit(1); // Exit process if server startup fails
  }
};

start();


module.exports = app;
