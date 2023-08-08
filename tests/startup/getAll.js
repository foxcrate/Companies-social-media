const supertest = require("supertest");
const app = require("../../app");
const { Startup } = require("../../models");
const { generateRandomName } = require("../util/createRandomNames");
const savedErrors = require("../../util/errors");

module.exports = () => {
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
        .send();
      expect(res.statusCode).toBe(200);
      expect(res.body.data.results[0]).toEqual(rightSchema);
      expect(res.body.data.results.length).toEqual(startupsCount);
    });
  });
};
