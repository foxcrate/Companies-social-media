const supertest = require("supertest");
const app = require("../../app");
const signupTestCases = require("../citizen/signup");
const signinTestCases = require("../citizen/signin");
const resettingPasswordTestCases = require("../citizen/resettingPassword");
const authenticateRoutesTestCases = require("../citizen/authenticateRoutes");

module.exports = () => {
  describe("Citizen", () => {
    let changePasswordToken =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXRpemVuX2lkIjo0MiwiY2l0aXplbl9lbWFpbCI6ImFobWVkbXVzdGFmYS5wcm8xOUBnbWFpbC5jb20iLCJpYXQiOjE2OTA5ODEyMDIsImV4cCI6MzE3MjM1NDIzNjAyfQ.sOseeWJfSBxaPU3Hi3rY9YVwHg-hZjrwWEi0CLtINmM";

    signupTestCases();
    signinTestCases();
    resettingPasswordTestCases();
    authenticateRoutesTestCases();
  });
};
