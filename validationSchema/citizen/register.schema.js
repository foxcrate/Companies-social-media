const { body } = require("express-validator");

const schema = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters long"),
  body("email")
    .isEmail()
    .withMessage("email must contain a valid email address"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("password must be at least 5 characters long"),
];

module.exports = schema;
