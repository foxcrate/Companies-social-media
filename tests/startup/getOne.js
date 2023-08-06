const supertest = require("supertest");
const app = require("../../app");
const { Startup } = require("../../models");
const { generateRandomName } = require("../util/createRandomNames");

module.exports = () => {
  describe("Get A Startup", () => {
    test("Validate non existing startup id", async () => {
      let validationErrors = [
        {
          path: "id",
          msg: "wrong startup id",
        },
      ];
      let theId = 2;
      let res = await supertest(app).get(`/startups/${theId}`).send();
      expect(res.statusCode).toBe(400);
      expect(res.body.validationErrors).toEqual(validationErrors);
    });
    test("Return the startup", async () => {
      let returnObject = {
        id: 7,
        name: "startup1",
        statue: "Pending",
        description: "Pretty good startup",
        applicantId: 1,
        createdAt: "2023-08-06T08:20:45.000Z",
        updatedAt: "2023-08-06T08:20:45.000Z",
        ApplicantId: 1,
      };
      let theId = 7;
      let res = await supertest(app).get(`/startups/${theId}`).send();
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(returnObject);
    });
  });
};
