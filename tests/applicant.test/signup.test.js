const supertest = require("supertest");
const app = require("../../app");
const { Applicant } = require("../../models");
const savedErrors = require("../../utils/errors");
const { generateRandomName } = require("../utilsForTest/createRandomNames");

module.exports = () => {
  describe("Signup", () => {
    test("Validate form fields", async () => {
      let validation_errors = {
        code: "VALIDATION_ERROR",
        msg: [
          {
            path: "name",
            problem: "name must be at least 3 characters long",
          },
          {
            path: "email",
            problem: "email must contain a valid email address",
          },
          {
            path: "password",
            problem: "password must be at least 5 characters long",
          },
        ],
      };

      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/applicants/register`)
        .send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(validation_errors);
    });
    test("Error when a repeated email", async () => {
      let error = {
        code: "REPEATED_EMAIL",
        msg: savedErrors.get("en").get("REPEATED_EMAIL"),
      };
      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/applicants/register`)
        .send({ name: "Ahmed", email: "aa6@aa.com", password: "12345" });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(error);
    });
    test("Record added to the database", async () => {
      let name = generateRandomName();
      let email = generateRandomName() + "@gogo.com";
      let body = {
        name: name,
        email: email,
        password: "qweasd",
      };
      let returnObject = {
        data: {
          id: expect.any(Number),
          name: name,
          email: email,
          password: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        error: null,
      };
      let recordsBeforeCreate = await Applicant.count();

      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/applicants/register`)
        .send(body);

      let recordsAfterCreate = await Applicant.count();
      // console.log("---------res:", res);
      expect(recordsAfterCreate).toBe(recordsBeforeCreate + 1);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(returnObject);
    });
  });
};
