const supertest = require("supertest");
const app = require("../../app");
const { Startup } = require("../../models");
const { generateRandomName } = require("../utilsForTest/createRandomNames");
const savedErrors = require("../../utils/errors");

module.exports = () => {
  describe("Get A Startup", () => {
    test("Check non existing startup id", async () => {
      let error = {
        code: "STARTUP_NOT_FOUND",
        msg: savedErrors.get("en").get("STARTUP_NOT_FOUND"),
      };
      let theId = 2;
      let res = await supertest(app)
        .get(`${process.env.API_V1_URL}/startups/${theId}`)
        .send();
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(error);
    });
    test("Return the startup", async () => {
      let newStartup = await Startup.create({
        name: "alo 6",
        statue: "Pending",
        description: "alo alo",
        applicantId: 1,
      });
      let returnObject = {
        id: newStartup.id,
        name: "alo 6",
        statue: "Pending",
        description: "alo alo",
        applicantId: 1,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        ApplicantId: 1,
      };
      let theId = newStartup.id;
      let res = await supertest(app)
        .get(`${process.env.API_V1_URL}/startups/${theId}`)
        .send();
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toEqual(returnObject);
    });
  });
};
