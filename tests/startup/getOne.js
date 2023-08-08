const supertest = require("supertest");
const app = require("../../app");
const { Startup } = require("../../models");
const { generateRandomName } = require("../util/createRandomNames");
const savedErrors = require("../../util/errors");

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
      let returnObject = {
        id: 8,
        name: "Michael_Williams_694.3165853296478-updated",
        statue: "Pending",
        description: "We making beautiful food",
        applicantId: 1,
        createdAt: "2023-08-06T08:20:45.000Z",
        updatedAt: expect.any(String),
        ApplicantId: 1,
      };
      let theId = 8;
      let res = await supertest(app)
        .get(`${process.env.API_V1_URL}/startups/${theId}`)
        .send();
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toEqual(returnObject);
    });
  });
};
