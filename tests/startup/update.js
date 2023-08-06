const supertest = require("supertest");
const app = require("../../app");
const { Startup } = require("../../models");
const { generateRandomName } = require("../util/createRandomNames");

module.exports = () => {
  let update_validation_errors = [
    {
      path: "name",
      msg: "Invalid value",
    },
    {
      path: "name",
      msg: "name must be at least 3 characters long",
    },
    {
      path: "statue",
      msg: "statue can't be empty",
    },
    {
      path: "statue",
      msg: "unknown statue",
    },
    {
      path: "description",
      msg: "Invalid value",
    },
    {
      path: "description",
      msg: "description can't be less than 10 charcters",
    },
    {
      path: "applicantId",
      msg: "applicantId is not provided",
    },
    {
      path: "applicantId",
      msg: "Applicant not exist",
    },
  ];
  describe("Update Startup", () => {
    let theId = 8;
    test("Validate form fields", async () => {
      let res = await supertest(app).put(`/startups/${theId}`).send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.validationErrors).toEqual(update_validation_errors);
    });
    test("Validate existing applicant", async () => {
      let validationError = [
        {
          path: "applicantId",
          msg: "Applicant not exist",
        },
      ];
      let body = {
        name: generateRandomName(),
        statue: "Pending",
        description: "We making beautiful food",
        applicantId: 0,
      };
      let res = await supertest(app).put(`/startups/${theId}`).send(body);
      expect(res.statusCode).toBe(400);
      expect(res.body.validationErrors).toEqual(validationError);
    });
    test("Validate repeated startup name", async () => {
      let validationError = [
        {
          path: "name",
          msg: "repeated startup name",
        },
      ];
      let body = {
        name: "newStartup",
        statue: "Pending",
        description: "We making beautiful food",
        applicantId: 1,
      };
      let res = await supertest(app).put(`/startups/${theId}`).send(body);
      expect(res.statusCode).toBe(400);
      expect(res.body.validationErrors).toEqual(validationError);
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
        .put(`/startups/${theId}`)
        .send(updatedBody);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(shouldReturnedBody);
    });
  });
};
