const supertest = require("supertest");
const app = require("../../app");
const signupTestCases = require("./signup.test");
const signinTestCases = require("./signin.test");
const sendResetPasswordEmailTestCases = require("./sendResetPasswordEmail.test");
const authenticateRoutesTestCases = require("./authenticateRoutes.test");
const resetPasswordTestCases = require("./resetPassword.test");

module.exports = () => {
  describe("Applicant Test Cases -->", () => {
    signupTestCases();
    signinTestCases();
    sendResetPasswordEmailTestCases();
    authenticateRoutesTestCases();
    resetPasswordTestCases();
  });
};
