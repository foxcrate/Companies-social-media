const supertest = require("supertest");
const app = require("../../app");
const savedErrors = require("../../util/errors");

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
        .post(`${process.env.API_V1_URL}/citizens/register`)
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
        .post(`${process.env.API_V1_URL}/citizens/register`)
        .send({ name: "Ahmed", email: "aa6@aa.com", password: "12345" });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(error);
    });
  });
};
