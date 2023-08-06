const supertest = require("supertest");
const app = require("../../app");

module.exports = () => {
  describe("Signin", () => {
    test("Validate form fields", async () => {
      let validation_errors = [
        { path: "email", msg: "email must contain a valid email address" },
        {
          path: "password",
          msg: "password must be at least 5 characters long",
        },
      ];

      let res = await supertest(app).post("/citizens/signin").send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.validationErrors).toEqual(validation_errors);
    });
    test("return the wrong email msg", async () => {
      let the_error = { code: "NO_CLIENT_EMAIL", msg: "account not found" };

      let credentials = {
        email: "meduX@gmail.com",
        password: "qweas34",
      };

      let res = await supertest(app).post("/citizens/signin").send(credentials);
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual(the_error);
    });
    test("return the wrong credentials msg", async () => {
      let the_error = {
        code: "CLIENT_WRONG_PASSWORD",
        msg: "wrong password",
      };

      let credentials = {
        email: "medu@gmail.com",
        password: "qweas34",
      };

      let res = await supertest(app).post("/citizens/signin").send(credentials);
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual(the_error);
    });
  });
};
