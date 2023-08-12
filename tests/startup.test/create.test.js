const supertest = require("supertest");
const app = require("../../app");
const { Startup } = require("../../models");
const { generateRandomName } = require("../utilsForTest/createRandomNames");
const savedErrors = require("../../utils/errors");

module.exports = () => {
  let create_validation_errors = {
    code: "VALIDATION_ERROR",
    msg: [
      {
        path: "name",
        problem: "name must be at least 3 characters long",
      },
      {
        path: "statue",
        problem: "unsuitable statue",
      },
      {
        path: "description",
        problem: "description can't be less than 10 charcters",
      },
      {
        path: "applicantId",
        problem: "applicantId is not provided",
      },
    ],
  };
  let createdObject = 0;
  describe("Create Startup", () => {
    test("Validate form fields", async () => {
      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/startups`)
        .send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(create_validation_errors);
    });
    test("Check existing applicant", async () => {
      let error = {
        code: "APPLICANT_NOT_FOUND",
        msg: savedErrors.get("en").get("APPLICANT_NOT_FOUND"),
      };
      let body = {
        name: generateRandomName(),
        statue: "Pending",
        description: "We making beautiful food",
        applicantId: 0,
      };
      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/startups`)
        .send(body);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(error);
    });
    test("Check repeated startup name", async () => {
      let error = {
        code: "REPEATED_NAME",
        msg: savedErrors.get("en").get("REPEATED_NAME"),
      };
      let body = {
        name: "newStartup",
        statue: "Pending",
        description: "We making beautiful food",
        applicantId: 1,
      };
      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/startups`)
        .send(body);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(error);
    });
    test("Record added to the database", async () => {
      let name = generateRandomName();
      let body = {
        name: name,
        statue: "Pending",
        description: "We making beautiful food",
        applicantId: 1,
      };
      let returnObject = {
        data: {
          id: expect.any(Number),
          name: name,
          statue: "Pending",
          description: "We making beautiful food",
          applicantId: 1,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        error: null,
      };
      let recordsBeforeCreate = await Startup.count();

      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/startups`)
        .send(body);

      let recordsAfterCreate = await Startup.count();
      expect(recordsAfterCreate).toBe(recordsBeforeCreate + 1);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(returnObject);
    });
  });
};
