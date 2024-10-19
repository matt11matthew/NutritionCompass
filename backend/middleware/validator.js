const { validationResult } = require("express-validator");

// Middleware to check if there are any validation errors
const validator = (req, res, next) => {
  const errors = validationResult(req); // see if express-validator has any errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validator;
