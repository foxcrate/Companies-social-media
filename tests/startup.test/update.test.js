const supertest = require("supertest");
const app = require("../../app");
const { Startup } = require("../../models");
const { generateRandomName } = require("../utilsForTest/createRandomNames");
const savedErrors = require("../../utils/errors");

module.exports = () => {
  let normal_token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhbnRfaWQiOjMsImlhdCI6MTY5Mjc0ODE2MywiZXhwIjoxNjkzMzUyOTYzfQ.yCDoOVHaBaGSvDb7XRLqKoeowah0iPQE_cYs6VcP_HY";
  let update_validation_errors = {
    code: "VALIDATION_ERROR",
    msg: [
      {
        path: "name",
        problem: "name must be at least 3 characters long",
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
    let theId = 9;
    test("Validate form fields", async () => {
      let res = await supertest(app)
        .put(`${process.env.API_V1_URL}/startups/${theId}`)
        .set("Authorization", normal_token)
        .send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(update_validation_errors);
    });
    test("Check existing applicant", async () => {
      let error = {
        code: "APPLICANT_NOT_FOUND",
        msg: savedErrors.get("en").get("APPLICANT_NOT_FOUND"),
      };
      let newStartup = await Startup.create({
        name: "alo 3",
        statue: "Pending",
        description: "alo alo",
        applicantId: 1,
      });
      let body = {
        name: generateRandomName(),
        statue: "Pending",
        description: "We making beautiful food",
        applicantId: 0,
      };
      let res = await supertest(app)
        .put(`${process.env.API_V1_URL}/startups/${newStartup.id}`)
        .set("Authorization", normal_token)
        .send(body);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(error);
    });

    test("Check repeated startup name", async () => {
      let newStartup = await Startup.create({
        name: "alo 4",
        statue: "Pending",
        description: "alo alo alo",
        applicantId: 1,
      });
      let newStartup2 = await Startup.create({
        name: "alo 7",
        statue: "Pending",
        description: "alo alo alo",
        applicantId: 1,
      });
      let error = {
        code: "REPEATED_NAME",
        msg: savedErrors.get("en").get("REPEATED_NAME"),
      };
      let body = {
        name: newStartup.name,
        statue: "Pending",
        description: newStartup.description,
        applicantId: 1,
      };
      let res = await supertest(app)
        .put(`${process.env.API_V1_URL}/startups/${newStartup2.id}`)
        .set("Authorization", normal_token)
        .send(body);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(error);
    });

    test("Record updated in the database", async () => {
      let newStartup = await Startup.create({
        name: "alo 5",
        statue: "Pending",
        description: "alo alo",
        applicantId: 1,
      });
      let newName = generateRandomName() + "-updated";
      let newDescription = "We making beautiful food";
      let updatedBody = {
        name: newName,
        statue: "Pending",
        description: newDescription,
        applicantId: 1,
      };
      let shouldReturnedBody = {
        id: newStartup.id,
        name: newName,
        statue: "Pending",
        description: newDescription,
        applicantId: 1,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        ApplicantId: 1,
      };
      let res = await supertest(app)
        .put(`${process.env.API_V1_URL}/startups/${newStartup.id}`)
        .set("Authorization", normal_token)
        .send(updatedBody);
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toEqual(shouldReturnedBody);
    });
  });
};
