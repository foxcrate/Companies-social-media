const express = require("express");
const { body } = require("express-validator");
const validateRequestSchema = require("../../middlewares/validateRequestSchema.middleware");
const citizenRegisterSchema = require("../../validationSchema/citizen/register.schema");
const citizenSigninSchema = require("../../validationSchema/citizen/signin.schema");
const sendForgetPasswordEmailSchema = require("../../validationSchema/sendForgetPasswordEmail.schema");
const resetPasswordSchema = require("../../validationSchema/resetPassword.schema");
const citizenController = require("../../controllers/citizen.controller");
const citizenAuth = require("../../middlewares/citizenAuth.middleware");

const router = express.Router();

// console.log("citizenRegisterSchema: ", citizenRegisterSchema);

router.post(
  "/register",
  citizenRegisterSchema,
  validateRequestSchema,
  citizenController.register
);

router.post(
  "/signin",
  citizenSigninSchema,
  validateRequestSchema,
  citizenController.signin
);

router.post(
  "/reset_password",
  citizenAuth,
  resetPasswordSchema,
  validateRequestSchema,
  citizenController.resetPassword
);

router.post(
  "/send_reset_password_mail",
  sendForgetPasswordEmailSchema,
  validateRequestSchema,
  citizenAuth,
  citizenController.sendResetPasswordMail
);

router.post(
  "/test_route_authentication",
  citizenAuth,
  citizenController.arrival
);

module.exports = router;
