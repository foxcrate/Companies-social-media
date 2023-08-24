const supertest = require("supertest");
const app = require("../../app");
const { Startup, Comment } = require("../../models");
const { generateRandomName } = require("../utilsForTest/createRandomNames");
const savedErrors = require("../../utils/errors");

module.exports = () => {
  let normal_token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXRpemVuX2lkIjoyNiwiaWF0IjoxNjkxNTg1MTY2LCJleHAiOjMzMjE3NjI3NTY2fQ.Py3qS4wMsPezXtcX6Q0cT5c6AKLCHxsX5uRH_CMhgP8";
  describe("Delete Comment", () => {
    test("Check non existing comment id", async () => {
      let error = {
        code: "COMMENT_NOT_FOUND",
        msg: savedErrors.get("en").get("COMMENT_NOT_FOUND"),
      };
      let theStartupId = 389;

      let res = await supertest(app)
        .delete(`${process.env.API_V1_URL}/startups/${theStartupId}/comments/0`)
        .set("Authorization", normal_token)
        .send();
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(error);
    });
    test("Record deleted from the database", async () => {
      let rightSchema = {
        id: expect.any(Number),
        content: expect.any(String),
        CitizenId: expect.any(Number),
        StartupId: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      };

      let recordsBeforeDelete = await Comment.count();

      let theStartupId = 389;
      let theComment = await Comment.findOne({
        order: [["createdAt", "DESC"]],
      });

      let res = await supertest(app)
        .delete(
          `${process.env.API_V1_URL}/startups/${theStartupId}/comments/${theComment.id}`
        )
        .set("Authorization", normal_token)
        .send();

      let recordsAfterDelete = await Comment.count();
      expect(res.statusCode).toBe(200);
      expect(recordsAfterDelete).toBe(recordsBeforeDelete - 1);
      expect(res.body.data).toEqual(rightSchema);
    });
  });
};
