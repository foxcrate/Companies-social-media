const supertest = require("supertest");
const app = require("../../app");
const { Startup, Comment } = require("../../models");
const { generateRandomName } = require("../utilsForTest/createRandomNames");
const savedErrors = require("../../utils/errors");

module.exports = () => {
  let normal_token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaXRpemVuX2lkIjoyNiwiaWF0IjoxNjkxNTg1MTY2LCJleHAiOjMzMjE3NjI3NTY2fQ.Py3qS4wMsPezXtcX6Q0cT5c6AKLCHxsX5uRH_CMhgP8";
  let create_validation_errors = {
    code: "VALIDATION_ERROR",
    msg: [
      {
        path: "content",
        problem: "content can't be less than 10 charcters",
      },
    ],
  };
  let createdObject = 0;
  describe("Update Comment", () => {
    let theStartupId = 389;
    test("Validate form fields", async () => {
      let theComment = await Comment.findOne({
        order: [["createdAt", "DESC"]],
      });

      let res = await supertest(app)
        .put(
          `${process.env.API_V1_URL}/startups/${theStartupId}/comments/${theComment.id}`
        )
        .set("Authorization", normal_token)
        .send({});
      // console.log("res:", res);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(create_validation_errors);
    });
    test("Check existing comment", async () => {
      let error = {
        code: "COMMENT_NOT_FOUND",
        msg: savedErrors.get("en").get("COMMENT_NOT_FOUND"),
      };
      let body = {
        content:
          generateRandomName() + generateRandomName() + generateRandomName(),
      };
      let res = await supertest(app)
        .put(`${process.env.API_V1_URL}/startups/${theStartupId}/comments/0`)
        .set("Authorization", normal_token)
        .send(body);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(error);
    });
    test("Record added to the database", async () => {
      let theComment = await Comment.findOne({
        order: [["createdAt", "DESC"]],
      });
      let content =
        generateRandomName() + generateRandomName() + generateRandomName();
      let body = {
        content: content,
      };
      let returnObject = {
        data: {
          id: expect.any(Number),
          content: content,
          CitizenId: expect.any(Number),
          StartupId: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        error: null,
      };

      let res = await supertest(app)
        .put(
          `${process.env.API_V1_URL}/startups/${theStartupId}/comments/${theComment.id}`
        )
        .set("Authorization", normal_token)
        .send(body);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(returnObject);
    });
  });
};
