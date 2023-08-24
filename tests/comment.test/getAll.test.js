const supertest = require("supertest");
const app = require("../../app");
const { Startup, Comment } = require("../../models");
const { generateRandomName } = require("../utilsForTest/createRandomNames");
const savedErrors = require("../../utils/errors");

module.exports = () => {
  let normal_token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXRpemVuX2lkIjoyNiwiaWF0IjoxNjkxNTg1MTY2LCJleHAiOjMzMjE3NjI3NTY2fQ.Py3qS4wMsPezXtcX6Q0cT5c6AKLCHxsX5uRH_CMhgP8";
  describe("Get All Startup Comments", () => {
    test("get the array of comment belong a startup with right schema", async () => {
      let rightSchema = {
        id: expect.any(Number),
        content: expect.any(String),
        CitizenId: expect.any(Number),
        StartupId: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      };
      let startupsCommentsCount = await Comment.count({
        where: { startupId: 389 },
      });
      let res = await supertest(app)
        .get(`${process.env.API_V1_URL}/startups/389/comments`)
        .set("Authorization", normal_token)
        .send();
      //   console.log("res:", res.body);
      // console.log('');
      expect(res.statusCode).toBe(200);
      expect(res.body.data[0]).toEqual(rightSchema);
      expect(res.body.data.length).toEqual(startupsCommentsCount);
    });
  });
};
