const { param } = require("express-validator");
const { Startup, Applicant } = require("../../models");

const schema = [
  param("id").custom(async (value) => {
    let startup = await Startup.findByPk(value);
    if (!startup) {
      throw new Error("wrong startup id");
    }
  }),
];

module.exports = schema;
