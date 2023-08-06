const { body } = require("express-validator");

const schema = [
  body("email")
    .isEmail()
    .withMessage("email must contain a valid email address"),
];

module.exports = schema;
