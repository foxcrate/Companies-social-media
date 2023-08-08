const { validationResult } = require("express-validator");
const { ValidationError } = require("sequelize");
const sendResponse = require("../util/sendResponse.util");

const validateRequestSchema = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorsFormated = errors.array().map((error) => {
      // return { path: error.path, msg: error.msg };
      return { path: error.path, problem: error.msg };
    });

    // return res.status(400).json({ validationErrors: errorsFormated });
    return sendResponse(res, 400, null, {
      code: "VALIDATION_ERROR",
      msg: errorsFormated,
    });
  }
  next();
};

module.exports = validateRequestSchema;
