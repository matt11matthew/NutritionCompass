// Import the User models
const User = require("../models/User");

// Import bcrypt to compare passwords
const {compare} = require("bcrypt")

/**
 * @route   POST /auth/register
 * @desc    Register a new user.
 * @requires Email and password
 * @optional First name, last name, weight, height, activity level
 * @access  Public
 */
const register = async (req, res, next) => {
  // attempt to register new user
  // make sure they provide email and password
  if (!email || !password) return res.status(400).json({status: "failed", data: [], message: "Invalid email or password."});
  const {email, password} = req.body;
  // ensure user does not already exist
  try {
    const exists = await User.findOne({email: email});
    if (exists) return res.status(400).json({status: "failed", data: [], message: "User already exists."});
  } catch (error) {
    return res.status(500).json({status: "error", data: [], message: error.message});
  }

  /* // ahmed's implementation from app.js, this should also check if it exists and bring back an error if it cant use the input but i havent tested yet tho
  const{email, password} = req.body;
  User.findOne({email:email}, (err,user)=>{
      if(user){
          res.status(400).json({status:"failed", data: [], message:"This account already exists"});
      } else {
          const user = new User({email, password})
          user.save(error=>{
              if(error){
                  res.status(400).json({status:"failed", data: [], message: error.message)};
              } else {
                  res.status(200).json({status:"success", data: [], message:"New account has been successfully created"});
              }
          })
      }
  })
  */
};

/**
 * @route   POST /auth/login
 * @desc    Login a user.
 * @requires Email and password
 * @optional None
 * @access  Public
 */
const login = async (req, res, next) => {
  // make sure email and password are provided
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      status: "failed",
      data: [],
      message: "Email and password required.",
    });
  }

  /* // ahmed's implementation from app.js, also not tested
  const {email, password} = req.body;
  // i can think of a few reasons why having these vars would help later but it might not be worth it honestly might remove them later
  var id = -1;
  var email = '';
  var fn = ''; //firstname
  var ln = ''; //lastname

  //await mongoose.connect(process.env.MONGO_URI); // this should be called earlier (?)
  User.findOne({email:email}, (error, user) => {
      if (user) {
          if (user.password === password) {
              res.status(200).json({status: "success", data: [], message: "Successfully logged in", user: user});
              id = user._id;
              email = user.email;
          } else {
              res.status(400).json({status: "failed", data: [], message: "The password is incorrect"});
              error = 'The password is incorrect';
          }
      } else {
          res.status(400).json({status: "failed", data: [], message: "This username does not exist"});
          error = 'This username does not exist';
      }
  })
  //res.status(200).json({ id:id, firstName:fn, lastName:ln, email:email, error:error});
  */
};

const logout = async (req, res, next) => {
  // force jwt to expire
  // tried implementing, let me know how goofy it is - ahmed
  try{
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    res.status(200).json({status: "success", data: [], message: "User logged out"});
  } catch (error){
    res.status(400).json({status: "failed", data: [], message: error.message});
  }
};

const reset = async (req, res, next) => {
  const authToken = req.headers.authorization;

  // ensure user has proper jwt
  if(!authToken){
    return res.status(401).json({status: "failed", data: [], message: "no token available"});
  } else {
    const token = authToken.split(" ")[1];
    const isVerified = verifyUserToken(token);
    if(!isVerified){
      return res.status(401).json({status: "failed", data: [], message: "incorrect or no token available"});
    }
  }
  // require old password be input(someone may not remember?)

  // reset password in database (should already be rehashed by pre-save hook)
};


module.exports = {
  register,
  login,
  logout,
  reset,
};
