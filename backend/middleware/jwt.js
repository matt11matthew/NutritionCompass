const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET; // NEED THIS IN ENV VARS; CAN BE ANYTHING

// Generates a user JWT
const genUserToken = (user) => {
  // get user data
  const data = {
    id: user._id,
    email: user.email,
  };

  // sign user data with secret and return token
  return jwt.sign(data, secret, { expiresIn: "1h" }); // 1 hour expiration, can make longer
};

// Verifies user JWT
const verifyUserToken = (token) => {
  // attempt to verify token
  try {
    const verification = jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

// Middleware authenticates a user's JSON token
// Token is in header
const authUserToken = (req, res, next) => {
  const authToken = req.cookies.token;
  console.log(authToken); // debugging
  if (!authToken) {
    return res
      .status(401)
      .json({ status: "error", data: [], message: "No token provided." });
  }
  const decoded = verifyUserToken(authToken);
  if (!decoded) {
    return res
      .status(401)
      .json({ status: "error", data: [], message: "invalid token" });
  }

  req.user = decoded;
  next();
};

module.exports = { genUserToken, verifyUserToken, authUserToken };
