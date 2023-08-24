const supertest = require("supertest");
const app = require("../../app");
const { Like } = require("../../models");
const { generateRandomName } = require("../utilsForTest/createRandomNames");
const savedErrors = require("../../utils/errors");

module.exports = () => {
  let normal_token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXRpemVuX2lkIjoyNiwiaWF0IjoxNjkxNTg1MTY2LCJleHAiOjMzMjE3NjI3NTY2fQ.Py3qS4wMsPezXtcX6Q0cT5c6AKLCHxsX5uRH_CMhgP8";
  describe("Get All Startup Likes", () => {
    test("get the array of likes belong a startup with right schema", async () => {
      let rightSchema = {
        id: expect.any(Number),
        CitizenId: expect.any(Number),
        StartupId: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      };
      let startupsLikesCount = await Like.count({
        where: { startupId: 389 },
      });
      let res = await supertest(app)
        .get(`${process.env.API_V1_URL}/startups/389/likes`)
        .set("Authorization", normal_token)
        .send();
      //   console.log("res:", res.body);
      // console.log('');
      expect(res.statusCode).toBe(200);
      expect(res.body.data[0]).toEqual(rightSchema);
      expect(res.body.data.length).toEqual(startupsLikesCount);
    });
  });
};
