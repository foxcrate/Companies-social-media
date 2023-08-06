const supertest = require("supertest");
const app = require("../app");

module.exports = () => {
  describe("Citizen", () => {
    let loginToken =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImlhdCI6MTY5MDk4MTQwMSwiZXhwIjozMTcyMzU0MjM4MDF9.VfLBdaZyE8-i0Ni_40aCWBhSv3KxlBNRKgVHmYMciKM";
    let changePasswordToken =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXRpemVuX2lkIjo0MiwiY2l0aXplbl9lbWFpbCI6ImFobWVkbXVzdGFmYS5wcm8xOUBnbWFpbC5jb20iLCJpYXQiOjE2OTA5ODEyMDIsImV4cCI6MzE3MjM1NDIzNjAyfQ.sOseeWJfSBxaPU3Hi3rY9YVwHg-hZjrwWEi0CLtINmM";
    //signup
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

    //signin
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

        let res = await supertest(app)
          .post("/citizens/signin")
          .send(credentials);
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

        let res = await supertest(app)
          .post("/citizens/signin")
          .send(credentials);
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(the_error);
      });
    });

    describe("Resetting Password", () => {
      test("Errors of form validation in send email", async () => {
        let validation_errors = [
          { path: "email", msg: "email must contain a valid email address" },
        ];

        let res = await supertest(app)
          .post("/citizens/send_reset_password_mail")
          .send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.validationErrors).toEqual(validation_errors);
      });
      test("Error of non existed email", async () => {
        let errors = { code: "CITIZEN_NOT_FOUND", msg: "Citizen not found" };

        let res = await supertest(app)
          .post("/citizens/send_reset_password_mail")
          .send({ email: "mona@mona.com" });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(errors);
      });
      test("Error of non existed email", async () => {
        let errors = { code: "CITIZEN_NOT_FOUND", msg: "Citizen not found" };

        let res = await supertest(app)
          .post("/citizens/send_reset_password_mail")
          .send({ email: "mona@mona.com" });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(errors);
      });
      test("Email sent successfully", async () => {
        let returnValue = "Email Sent";
        console.log("loginToken:", loginToken);
        let res = await supertest(app)
          .post("/citizens/send_reset_password_mail")
          // .set("Authorization", loginToken)
          .send({ email: "ahmedmustafa.pro19@gmail.com" });
        expect(res.body.data).toEqual(returnValue);
        expect(res.statusCode).toBe(200);
        // console.log("res.body:", res.body);
      });
    });

    //authenticate routes

    describe("Authenticate routes", () => {
      test("validate token existence", async () => {
        let the_error = {
          code: "NO_BEARER_TOKEN",
          msg: "authorization Bearer token should be provided",
        };

        let res = await supertest(app).post(
          "/citizens/test_route_authentication"
        );
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(the_error);
      });
      test("return unauthenticated msg when token not accepted", async () => {
        let the_error = { code: "JWT_ERROR", msg: "invalid token" };

        let the_token =
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTY5MDQwMjYzNiwiZXhwIjoxNjkxMDA3NDM2fQ.2yElbFweh-kaCjLLvte0-h0Eos46haYOBioL0WaOP3";

        let res = await supertest(app)
          .post("/citizens/test_route_authentication")
          .set("Authorization", the_token);
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual(the_error);
      });
    });
  });
};
