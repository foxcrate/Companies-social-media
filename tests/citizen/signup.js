const supertest = require("supertest");
const app = require("../../app");

module.exports = () => {
  describe("Signup", () => {
    test("Validate form fields", async () => {
      let validation_errors = [
        { path: "name", msg: "name must be at least 3 characters long" },
        { path: "email", msg: "email must contain a valid email address" },
        {
          path: "password",
          msg: "password must be at least 5 characters long",
        },
      ];

      let res = await supertest(app).post("/citizens/register").send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.validationErrors).toEqual(validation_errors);
    });
    test("Error when a repeated email", async () => {
      let error = { code: "SQL_ERROR", msg: "repeated email" };
      let res = await supertest(app)
        .post("/citizens/register")
        .send({ name: "Ahmed", email: "aa6@aa.com", password: "12345" });
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual(error);
    });
  });
};
