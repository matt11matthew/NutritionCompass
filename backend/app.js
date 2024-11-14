// General imports and setup for the app
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const expressSession = require("express-session");

// Passport stuff
const User = require("./models/User");
const LocalStrategy = require("passport-local").Strategy; // local strategy for usernames/passwords
const passport = require("passport");
passport.use(new LocalStrategy(User.authenticate())); // use passport-local-mongoose plugin
passport.serializeUser(User.serializeUser()); // serialize user
passport.deserializeUser(User.deserializeUser()); // deserialize user

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

const app = express();
require("dotenv").config(); // load environment variables
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize()); // initialize passport
app.use(passport.session()); // use passport session

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

// attempting to set up endpoints
mongoose.connect(process.env.MONGO_URI);

app.post('/api/login', (req, res) =>
{
    var error = '';
    const {email, password} = req.body;

    var id = -1;
    var email = '';
    var fn = ''; //firstname
    var ln = ''; //lastname

    //await mongoose.connect(process.env.MONGO_URI);
    User.findOne({email:email}, (err, user) => {
        if (user) {
            if (user.password === password) {
                res.send({message: "Successfully logged in", user: user});
            } else {
                res.send({message: "The password is incorrect"});
                error = 'The password is incorrect';
            }
        } else {
            res.send("This username does not exist")
            error = 'This username does not exist';
        }
    })
    var ret = { id:id, firstName:fn, lastName:ln, email:email, error:error};
    res.status(200).json(ret);
});

app.post('/api/register', (req, res) =>
{
    console.log(req.body)//debugging

    const{name, email, password} = req.body;
    User.findOne({email:email}, (err,user)=>{
        if(user){
            res.send({message:"This account already exists"})
        } else {
            const user = new User({email, password})
            user.save(error=>{
                if(error){
                    res.send(error)
                } else {
                    res.status(200).send({message:"New account has been successfully created"})
                }
            })
        }
    })
})

// For use with personal testing db
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
