const supertest = require("supertest");
const app = require("../../app");
const { Startup } = require("../../models");
const { generateRandomName } = require("../util/createRandomNames");
const createTestCases = require("./create");
const getOneTestCases = require("./getOne");
const getAllTestCases = require("./getAll");
const updateTestCases = require("./update");
const deleteTestCases = require("./delete");

module.exports = () => {
  describe("Startup", () => {
    let loginToken =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImlhdCI6MTY5MDk4MTQwMSwiZXhwIjozMTcyMzU0MjM4MDF9.VfLBdaZyE8-i0Ni_40aCWBhSv3KxlBNRKgVHmYMciKM";
    //signup
    describe("CRUD Operations", () => {
      createTestCases();
      getOneTestCases();
      getAllTestCases();
      updateTestCases();
      deleteTestCases();
    });
  });
};
