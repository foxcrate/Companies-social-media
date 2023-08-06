const supertest = require("supertest");
const app = require("../../app");
const { Startup } = require("../../models");
const { generateRandomName } = require("../util/createRandomNames");

module.exports = () => {
  describe("Delete Startup", () => {
    test("Validate non existing startup id", async () => {
      let validationErrors = [
        {
          path: "id",
          msg: "wrong startup id",
        },
      ];
      let theId = 2;
      let res = await supertest(app).delete(`/startups/${theId}`).send();
      expect(res.statusCode).toBe(400);
      expect(res.body.validationErrors).toEqual(validationErrors);
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
        .delete(`/startups/${returnObject.id}`)
        .send();

      let recordsAfterDelete = await Startup.count();
      expect(res.statusCode).toBe(200);
      expect(recordsAfterDelete).toBe(recordsBeforeDelete - 1);
      expect(res.body).toEqual(returnObject);
    });
  });
};
