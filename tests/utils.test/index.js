const supertest = require("supertest");
const app = require("../../app");
const { Startup } = require("../../models");
const { generateRandomName } = require("../utilsForTest/createRandomNames");
const paginationTestCases = require("./paginate");
const mailTestCases = require("./mail");

module.exports = () => {
  describe("Utils Test Cases -->", () => {
    paginationTestCases();
    mailTestCases();
  });
};
