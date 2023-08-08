const supertest = require("supertest");
const app = require("../../app");
const { Startup } = require("../../models");
const { generateRandomName } = require("../util/createRandomNames");
const savedErrors = require("../../util/errors");

module.exports = () => {
  let update_validation_errors = {
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
  describe("Update Startup", () => {
    let theId = 8;
    test("Validate form fields", async () => {
      let res = await supertest(app)
        .put(`${process.env.API_V1_URL}/startups/${theId}`)
        .send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(update_validation_errors);
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
        .put(`${process.env.API_V1_URL}/startups/${theId}`)
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
        .put(`${process.env.API_V1_URL}/startups/${theId}`)
        .send(body);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(error);
    });
    test("Record updated in the database", async () => {
      let newName = generateRandomName() + "-updated";
      let updatedBody = {
        name: newName,
        statue: "Pending",
        description: "We making beautiful food",
        applicantId: 1,
      };
      let shouldReturnedBody = {
        id: theId,
        name: newName,
        statue: "Pending",
        description: "We making beautiful food",
        applicantId: 1,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        ApplicantId: 1,
      };
      let res = await supertest(app)
        .put(`${process.env.API_V1_URL}/startups/${theId}`)
        .send(updatedBody);
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toEqual(shouldReturnedBody);
    });
  });
};
