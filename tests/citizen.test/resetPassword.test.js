const supertest = require("supertest");
const app = require("../../app");
const savedErrors = require("../../utils/errors");

module.exports = () => {
  describe("Reset Password Mail", () => {
    let normal_token =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXRpemVuX2lkIjo0MiwiaWF0IjoxNjkxNzU4Nzc3LCJleHAiOjE2OTIzNjM1Nzd9.ETNfSMDBOu7fGFBqlF76nHVBrxNFLTGDXqxueaSooFs";
    let changePasswordToken =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXRpemVuX2lkIjo0MiwiY2l0aXplbl9lbWFpbCI6ImFobWVkbXVzdGFmYS5wcm8xOUBnbWFpbC5jb20iLCJpYXQiOjE2OTE3NTg5MTEsImV4cCI6MzMyMTc4MDEzMTF9.gKnpggpQlu5rHqfPqBRN2FhPgGVH5_bkXVFcwO021HM";

    test("citizen_email not found", async () => {
      let the_error = {
        code: "WRONG_JWT_ERROR",
        msg: savedErrors.get("en").get("WRONG_JWT_ERROR"),
      };

      let body = {
        password: "qweasd",
      };

      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/citizens/reset_password`)
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
        .post(`${process.env.API_V1_URL}/citizens/reset_password`)
        .set("Authorization", changePasswordToken)
        .send(body);
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toEqual(returnObjectData);
    });
  });
};
