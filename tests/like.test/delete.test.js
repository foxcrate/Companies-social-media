const supertest = require("supertest");
const app = require("../../app");
const { Like } = require("../../models");
const { generateRandomName } = require("../utilsForTest/createRandomNames");
const savedErrors = require("../../utils/errors");

module.exports = () => {
  let normal_token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXRpemVuX2lkIjoyNiwiaWF0IjoxNjkxNTg1MTY2LCJleHAiOjMzMjE3NjI3NTY2fQ.Py3qS4wMsPezXtcX6Q0cT5c6AKLCHxsX5uRH_CMhgP8";
  describe("Delete Like", () => {
    test("Record deleted from the database", async () => {
      let theStartupId = 389;

      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/startups/${theStartupId}/likes`)
        .set("Authorization", normal_token)
        .send();

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBe("Like removed");
    });
  });
};
