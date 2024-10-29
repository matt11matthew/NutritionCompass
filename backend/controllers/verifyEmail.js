const crypto = require("crypto"); // generate random token for email verification
const sendEmail = require("../utils/sendEmail"); // email sending
const EmailToken = require("../models/EmailToken"); // email token model

// Send verification email
// Email should contain a link to /users/verifyEmail/:id/:token
const sendVerificationEmail = async (req, res, next) => {
  const { id, email } = req; // get user id from request
  const token = await crypto.randomBytes(16).toString("hex"); // generate random token, maybe should increase from 16?
  const emailToken = await new EmailToken({ id: id, token: token }); // create email token

  // save token to db
  try {
    await emailToken.save(); // save email token to database
  } catch (error) {
    console.log("Error saving email token: ", error);
    // return res.status(500).json({
    //   status: "error",
    //   data: [],
    //   message: "Error saving email token to database.",
    // });
  }

  // send email
  try {
    await sendEmail(
      email, // email
      "Verify your email", // subject
      `Please click the following link to verify your email: http://${process.env.BASE_URL}/users/verifyEmail/${id}/${emailToken.token}` // text
    );
  } catch (error) {
    console.log("Error sending verification email: ", error);
    // return res.status(500).json({
    //   status: "error",
    //   data: [],
    //   message: "Error sending verification email.",
    // });
  }

  // end response
  // res.status(200).json({
  //   status: "success",
  //   data: [],
  //   message: "Verification email sent.",
  // });
};

// Verify user account using token sent in email
const verifyEmail = async (req, res, next) => {
  // get data from url
  const { id, token } = req.params;

  // delete token from db
};

// Send another verification email
// Make sure to delete old from database even though they expire
const resendVerificationEmail = async (req, res, next) => {
  /* STUB */
};

// Export controllers
module.exports = {
  sendVerificationEmail,
  verifyEmail,
  resendVerificationEmail,
};
