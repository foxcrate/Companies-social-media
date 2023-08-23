const supertest = require("supertest");
const app = require("../../app");
const savedErrors = require("../../utils/errors");

module.exports = () => {
  describe("Reset Password Mail", () => {
    let normal_token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhbnRfaWQiOjMsImlhdCI6MTY5Mjc0ODE2MywiZXhwIjoxNjkzMzUyOTYzfQ.yCDoOVHaBaGSvDb7XRLqKoeowah0iPQE_cYs6VcP_HY";
    let changePasswordToken =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhbnRfaWQiOjMsImFwcGxpY2FudF9lbWFpbCI6ImFobWVkbXVzdGFmYS5wcm8xOUBnbWFpbC5jb20iLCJpYXQiOjE2OTI3NTQ2NDIsImV4cCI6NDgxNjk1NzA0Mn0.uh37bfPwtrhq7Vhpxlhuowfy_Zj_6MjYOuyFzxRi4oA";

    test("applicant_email not found", async () => {
      let the_error = {
        code: "WRONG_JWT_ERROR",
        msg: savedErrors.get("en").get("WRONG_JWT_ERROR"),
      };

      let body = {
        password: "qweasd",
      };

      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/applicants/reset_password`)
        .set("Authorization", normal_token)
        .send(body);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(the_error);
    });

    test("Password resetted successfully", async () => {
      let returnObjectData = {
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      };

      let body = {
        password: "qweasd",
      };

      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/applicants/reset_password`)
        .set("Authorization", changePasswordToken)
        .send(body);
      console.log("res:", res);
      expect(res.body.data).toEqual(returnObjectData);
      expect(res.statusCode).toBe(200);
    });
  });
};
