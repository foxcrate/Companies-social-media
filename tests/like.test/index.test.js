const supertest = require("supertest");
const app = require("../../app");
const { Startup } = require("../../models");
const { generateRandomName } = require("../utilsForTest/createRandomNames");
const createTestCases = require("./create.test");
const getAllTestCases = require("./getAll.test");
const deleteTestCases = require("./delete.test");

module.exports = () => {
  describe("Like Test Cases -->", () => {
    let loginToken =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImlhdCI6MTY5MDk4MTQwMSwiZXhwIjozMTcyMzU0MjM4MDF9.VfLBdaZyE8-i0Ni_40aCWBhSv3KxlBNRKgVHmYMciKM";
    // describe("CRUD Operations", () => {
    createTestCases();
    getAllTestCases();
    deleteTestCases();
    // });
  });
};
