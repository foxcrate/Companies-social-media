const supertest = require("supertest");
const app = require("../../app");
const savedErrors = require("../../util/errors");

module.exports = () => {
  describe("Authenticate routes", () => {
    test("validate token existence", async () => {
      let the_error = {
        code: "NO_BEARER_TOKEN",
        msg: savedErrors.get("en").get("NO_BEARER_TOKEN"),
      };

      let res = await supertest(app).post(
        `${process.env.API_V1_URL}/citizens/test_route_authentication`
      );
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
        .post(`${process.env.API_V1_URL}/citizens/test_route_authentication`)
        .set("Authorization", the_token);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(the_error);
    });
  });
};
