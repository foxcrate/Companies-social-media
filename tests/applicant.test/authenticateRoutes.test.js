const supertest = require("supertest");
const app = require("../../app");
const savedErrors = require("../../utils/errors");

module.exports = () => {
  describe("Authenticate routes", () => {
    let body = {
      email: "ahmedmustafa.pro19@gmail.com",
    };
    test("validate token existence", async () => {
      let the_error = {
        code: "NO_BEARER_TOKEN",
        msg: savedErrors.get("en").get("NO_BEARER_TOKEN"),
      };

      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/applicants/send_reset_password_mail`)
        .send(body);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(the_error);
    });
    test("return unauthenticated msg when token not accepted", async () => {
      let the_error = {
        code: "JWT_ERROR",
        msg: savedErrors.get("en").get("JWT_ERROR"),
      };

      let the_token =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTY5MDQwMjYzNiwiZXhwIjoxNjkxMDA3NDM2fQ.2yElbFweh-kaCjLLvte0-h0Eos46haYOBioL0WaOP3";

      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/applicants/send_reset_password_mail`)
        .set("Authorization", the_token)
        .send(body);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(the_error);
    });
  });
};
