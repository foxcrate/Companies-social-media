const supertest = require("supertest");
const app = require("../../app");
const { Startup } = require("../../models");
const { generateRandomName } = require("../utilsForTest/createRandomNames");
const savedErrors = require("../../utils/errors");

module.exports = () => {
  let normal_token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXRpemVuX2lkIjo0MiwiaWF0IjoxNjkyNzQ2NzAyLCJleHAiOjQ4MTY5NDkxMDJ9.aKYyKqTiYR9MetI6XEGd8X6-FVb3lR0FnEDu5J7udwo";
  describe("Get All Startups", () => {
    test("get the array of startups with right schema", async () => {
      let rightSchema = {
        id: expect.any(Number),
        name: expect.any(String),
        statue: expect.any(String),
        description: expect.any(String),
        applicantId: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        ApplicantId: expect.any(Number),
      };
      let startupsCount = await Startup.count();
      let res = await supertest(app)
        .get(`${process.env.API_V1_URL}/startups`)
        .set("Authorization", normal_token)
        .send();
      // console.log('');
      expect(res.statusCode).toBe(200);
      expect(res.body.data.results[0]).toEqual(rightSchema);
      expect(res.body.data.results.length).toEqual(startupsCount);
    });
  });
};
