const supertest = require("supertest");
const app = require("../../app");
const savedErrors = require("../../utils/errors");

module.exports = () => {
  let loginToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXRpemVuX2lkIjoyNiwiaWF0IjoxNjkxNTg1MTY2LCJleHAiOjMzMjE3NjI3NTY2fQ.Py3qS4wMsPezXtcX6Q0cT5c6AKLCHxsX5uRH_CMhgP8";
  describe("Send Reset Password Mail", () => {
    test("Errors of form validation in send email", async () => {
      let validation_errors = {
        code: "VALIDATION_ERROR",
        msg: [
          {
            path: "email",
            problem: "email must contain a valid email address",
          },
        ],
      };

      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/citizens/send_reset_password_mail`)
        .send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(validation_errors);
    });
    test("Error of non existed email", async () => {
      let errors = {
        code: "CITIZEN_NOT_FOUND",
        msg: savedErrors.get("en").get("CITIZEN_NOT_FOUND"),
      };

      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/citizens/send_reset_password_mail`)
        .set("Authorization", loginToken)
        .send({ email: "mona@mona.com" });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(errors);
    });
    // test("Error of non existed email", async () => {
    //   let errors = { code: "CITIZEN_NOT_FOUND", msg: "Citizen not found" };

    //   let res = await supertest(app)
    //     .post(`${process.env.API_V1_URL}/citizens/send_reset_password_mail`)
    //     .send({ email: "mona@mona.com" });
    //   expect(res.statusCode).toBe(400);
    //   expect(res.body).toEqual(errors);
    // });
    test("Email sent successfully", async () => {
      let returnValue = "Email Sent";
      // console.log("loginToken:", loginToken);
      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/citizens/send_reset_password_mail`)
        .set("Authorization", loginToken)
        .send({ email: "ahmedmustafa.pro19@gmail.com" });
      expect(res.body.data).toEqual(returnValue);
      expect(res.statusCode).toBe(200);
      // console.log("res.body:", res.body);
    });
  });
};
