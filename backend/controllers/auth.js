// Import the User models
const User = require("../models/User");

// Import authentication and email handling
const passport = require("passport");
const MagicLinkStrategy = require("passport-magic-link").Strategy;
const sendgrid = require("@sendgrid/mail");

/***/ /***/ /***/ /***/ /***/ /* Passport */ /***/ /***/ /***/ /***/ /***/

// Configure SendGrid and Magic Link Strategy
require("dotenv").config(); // load environment variables
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
passport.use(
  new MagicLinkStrategy(
    {
      // configs
      secret: process.env.MAGIC_SECRET,
      userFields: ["email"],
      tokenField: "token",
      verifyUserAfterToken: true,
    },
    function send(user, token) {
      // send email with verification link
      ////////////////////////////// TO DO //////////////////////////////
      ///////////////////////////// ADJUST LINK FOR PRODUCTION SERVER /////////////////////////////
      const port = process.env.PORT || 3000;
      const link =
        process.env.BASE_URL + ":" + port + "/auth/verify?token=" + token;
      const message = {
        to: user.email,
        from: process.env.EMAIL,
        subject: "Nutrition Compass: Please verify your email.",
        text: "placeholder " + link,
      };
      return sendgrid.send(message);
    },
    function verify(user) {
      // return promise on verification link pressed
      // find user by email and set email.verified to true
      return new Promise(async (resolve, reject) => {
        const unverifiedUser = await User.findOne({ email: user.email }).select(
          "+verified"
        );
        if (!unverifiedUser) {
          reject("User not found.");
        } else {
          unverifiedUser.verified = true;
          try {
            await unverifiedUser.save();
          } catch (err) {
            reject(err);
          }
          // return verified user
          resolve(unverifiedUser);
        }
      });
    }
  )
);

// Passport serialize and deserialize user

/***/ /***/ /***/ /***/ /***/ /* Controller functions */ /***/ /***/ /***/ /***/ /***/

/**
 * @route   POST /auth/register
 * @desc    Register a new user.
 * @requires Email and password
 * @optional First name, last name, weight, height, activity level
 * @access  Public
 */
const register = async (req, res, next) => {
  // attempt to register new user
  // register function included with passport-local-mongoose plugin
  User.register(
    /////////////// TO DO ///////////////
    /////////////// STILL NEED TO SAVE OPTIONAL FIELDS TO USER ///////////////
    /////////////// NEED TO CHECK IF USER EXISTS BEFORE REGISTERING TO SEND BACK RESPONSE 400 ///////////////
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

  // attempt to authenticate user
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "error", data: [], message: err.message });
    } else {
      // if user is authenticated
      if (user) {
        req.login(user, (err) => {
          if (err) {
            return res
              .status(500)
              .json({ status: "error", data: [], message: err.message });
          }
          return res.status(200).json({
            status: "success",
            data: [user],
            message: `User ${user.email} authenticated and logged in.`,
          });
        });
      } else {
        return res
          .status(401)
          .json({ status: "failed", data: [], message: info.message });
      }
    }
  });
};

const logout = async (req, res, next) => {
  req.logout(); // logout user
};

module.exports = {
  register,
  login,
  logout,
};
