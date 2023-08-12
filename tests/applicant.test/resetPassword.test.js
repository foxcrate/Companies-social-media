const supertest = require("supertest");
const app = require("../../app");
const savedErrors = require("../../utils/errors");

module.exports = () => {
  describe("Reset Password Mail", () => {
    let normal_token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhbnRfaWQiOjMsImlhdCI6MTY5MTc1NDEyMCwiZXhwIjoxNjkyMzU4OTIwfQ.1i6MIw9e9MVG-QMlzYrob11M5rcyrZS2w1zA40KdGLU";
    let changePasswordToken =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhbnRfaWQiOjMsImFwcGxpY2FudF9lbWFpbCI6ImFobWVkbXVzdGFmYS5wcm8xOUBnbWFpbC5jb20iLCJpYXQiOjE2OTE3NTgwODYsImV4cCI6MzMyMTc4MDA0ODZ9.GszZhXyaMj84_VVPGCOiJqBpmcTB-3gTTjm0UvCIYrA";

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
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toEqual(returnObjectData);
    });
  });
};
