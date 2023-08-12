const express = require("express");
const validateRequestSchema = require("../../middlewares/validateRequestSchema.middleware");
const applicantRegisterSchema = require("../../validationSchema/applicant/register.schema");
const applicantSigninSchema = require("../../validationSchema/applicant/signin.schema");
const sendForgetPasswordEmailSchema = require("../../validationSchema/sendForgetPasswordEmail.schema");
const resetPasswordSchema = require("../../validationSchema/resetPassword.schema");
const applicantController = require("../../controllers/applicant.controller");
const applicantAuth = require("../../middlewares/applicantAuth.middleware");

const router = express.Router();

// console.log("citizenRegisterSchema: ", citizenRegisterSchema);

router.post(
  "/register",
  applicantRegisterSchema,
  validateRequestSchema,
  applicantController.register
);

router.post(
  "/signin",
  applicantSigninSchema,
  validateRequestSchema,
  applicantController.signin
);

router.post(
  "/reset_password",
  applicantAuth,
  resetPasswordSchema,
  validateRequestSchema,
  applicantController.resetPassword
);

router.post(
  "/send_reset_password_mail",
  sendForgetPasswordEmailSchema,
  validateRequestSchema,
  applicantAuth,
  applicantController.sendResetPasswordMail
);

// router.post(
//   "/test_route_authentication",
//   applicantAuth,
//   applicantController.arrival
// );

module.exports = router;
