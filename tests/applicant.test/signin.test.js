const supertest = require("supertest");
const app = require("../../app");
const savedErrors = require("../../utils/errors");

module.exports = () => {
  describe("Signin", () => {
    test("Validate form fields", async () => {
      let validation_errors = {
        code: "VALIDATION_ERROR",
        msg: [
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
        .post(`${process.env.API_V1_URL}/applicants/signin`)
        .send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(validation_errors);
    });
    test("return the wrong email msg", async () => {
      let the_error = {
        code: "EMAIL_NOT_FOUND",
        msg: savedErrors.get("en").get("EMAIL_NOT_FOUND"),
      };

      let credentials = {
        email: "meduX@gmail.com",
        password: "qweas34",
      };

      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/applicants/signin`)
        .send(credentials);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(the_error);
    });
    test("return the wrong credentials msg", async () => {
      let the_error = {
        code: "WRONG_PASSWORD",
        msg: savedErrors.get("en").get("WRONG_PASSWORD"),
      };

      let credentials = {
        email: "medu@gmail.com",
        password: "qweas34",
      };

      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/applicants/signin`)
        .send(credentials);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(the_error);
    });
    test("signin successfully", async () => {
      let credentials = {
        email: "ahmedmustafa.pro19@gmail.com",
        password: "qweasd",
      };

      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/applicants/signin`)
        .send(credentials);
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty("token");
    });
  });
};
