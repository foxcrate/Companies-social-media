const { body } = require("express-validator");
const { Startup, Applicant } = require("../../models");

const schema = [
  body("content")
    // .isString()
    .isLength({ min: 10 })
    .withMessage("content can't be less than 10 charcters"),
];

module.exports = schema;
