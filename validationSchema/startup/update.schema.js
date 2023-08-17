const { body } = require("express-validator");
const { Startup, Applicant } = require("../../models");

const schema = [
  body("name")
    // .notEmpty()
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters long"),
  // .custom(async (value) => {
  //   if (value) {
  //     let startup = await Startup.findOne({ where: { name: value } });
  //     if (startup) {
  //       throw new Error("repeated startup name");
  //     }
  //   }
  // }),
  body("statue")
    // .notEmpty()
    // .withMessage("statue can't be empty")
    .isIn(["Pending", "Accepted", "Rejected"])
    .withMessage("unsuitable statue"),
  body("description")
    // .isString()
    .isLength({ min: 10 })
    .withMessage("description can't be less than 10 charcters"),
  body("applicantId").notEmpty().withMessage("applicantId is not provided"),
  // .custom(async (value) => {
  //   let applicant = await Applicant.findByPk(value);
  //   if (!applicant) {
  //     throw new Error("Applicant not exist");
  //   }
  // }),
];

module.exports = schema;
