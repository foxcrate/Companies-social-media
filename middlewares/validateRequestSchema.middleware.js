const { validationResult } = require("express-validator");

const validateRequestSchema = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorsFormated = errors.array().map((error) => {
      return { path: error.path, msg: error.msg };
    });

    return res.status(400).json({ validationErrors: errorsFormated });
  }
  next();
};

module.exports = validateRequestSchema;
