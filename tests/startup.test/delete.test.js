const supertest = require("supertest");
const app = require("../../app");
const { Startup } = require("../../models");
const { generateRandomName } = require("../utilsForTest/createRandomNames");
const savedErrors = require("../../utils/errors");

module.exports = () => {
  let normal_token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhbnRfaWQiOjMsImlhdCI6MTY5Mjc0ODE2MywiZXhwIjoxNjkzMzUyOTYzfQ.yCDoOVHaBaGSvDb7XRLqKoeowah0iPQE_cYs6VcP_HY";
  describe("Delete Startup", () => {
    test("Check non existing startup id", async () => {
      let error = {
        code: "STARTUP_NOT_FOUND",
        msg: savedErrors.get("en").get("STARTUP_NOT_FOUND"),
      };
      let theId = 2;
      let res = await supertest(app)
        .delete(`${process.env.API_V1_URL}/startups/${theId}`)
        .set("Authorization", normal_token)
        .send();
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(error);
    });
    test("Record deleted from the database", async () => {
      let lastStartup = await Startup.findAll({
        raw: true,
        limit: 1,
        order: [["createdAt", "DESC"]],
      });
      let returnObject = lastStartup[0];
      returnObject.createdAt = expect.any(String);
      returnObject.updatedAt = expect.any(String);
      let recordsBeforeDelete = await Startup.count();

      let res = await supertest(app)
        .delete(`${process.env.API_V1_URL}/startups/${returnObject.id}`)
        .set("Authorization", normal_token)
        .send();

      let recordsAfterDelete = await Startup.count();
      expect(res.statusCode).toBe(200);
      expect(recordsAfterDelete).toBe(recordsBeforeDelete - 1);
      expect(res.body.data).toEqual(returnObject);
    });
  });
};
