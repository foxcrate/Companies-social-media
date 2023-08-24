const supertest = require("supertest");
const app = require("../../app");
const { Startup, Like } = require("../../models");
const { generateRandomName } = require("../utilsForTest/createRandomNames");
const savedErrors = require("../../utils/errors");

module.exports = () => {
  let normal_token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXRpemVuX2lkIjoyNiwiaWF0IjoxNjkxNTg1MTY2LCJleHAiOjMzMjE3NjI3NTY2fQ.Py3qS4wMsPezXtcX6Q0cT5c6AKLCHxsX5uRH_CMhgP8";
  describe("Create Like", () => {
    test("Check existing startup", async () => {
      let error = {
        code: "STARTUP_NOT_FOUND",
        msg: savedErrors.get("en").get("STARTUP_NOT_FOUND"),
      };
      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/startups/0/likes`)
        .set("Authorization", normal_token)
        .send();
      //   console.log("like_res:", res);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(error);
    });
    test("Record added to the database", async () => {
      let theStartupId = 389;
      let returnObject = {
        data: {
          id: expect.any(Number),
          CitizenId: expect.any(Number),
          StartupId: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        error: null,
      };
      let recordsBeforeCreate = await Like.count();

      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/startups/${theStartupId}/likes`)
        .set("Authorization", normal_token)
        .send();

      let recordsAfterCreate = await Like.count();
      expect(res.statusCode).toBe(200);
      expect(recordsAfterCreate).toBe(recordsBeforeCreate + 1);
      expect(res.body).toEqual(returnObject);
    });
  });
};
