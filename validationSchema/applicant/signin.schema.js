const { body } = require("express-validator");

const schema = [
  body("email")
    .isEmail()
    .withMessage("email must contain a valid email address"),
  body("password")
    // .exists()
    // .withMessage("Password must be provided")
    .isLength({ min: 5 })
    .withMessage("password must be at least 5 characters long"),
];

module.exports = schema;
