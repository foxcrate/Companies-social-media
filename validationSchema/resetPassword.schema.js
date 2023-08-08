const { body } = require("express-validator");

const schema = [body("password").notEmpty()];

module.exports = schema;
