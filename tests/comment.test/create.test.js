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
  describe("Create Comment", () => {
    let theStartup = {};
    test("Validate form fields", async () => {
      try {
        // let wannaDeleteStartup = await Startup.findOne({
        //   where: { applicantId: 1 },
        // });
        // await Comment.destroy({ where: { startupId: wannaDeleteStartup.id } });
        await Startup.destroy({ where: { applicantId: 1 } });
      } catch (error) {
        console.log("error:", error);
      }
      theStartup = await Startup.create({
        name: "aloalo",
        statue: "Pending",
        description: "We making beautiful food",
        applicantId: 1,
      });

      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/startups/${theStartup.id}/comments`)
        .set("Authorization", normal_token)
        .send({});
      // console.log("res:", res);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(create_validation_errors);
    });
    test("Check existing startup", async () => {
      let error = {
        code: "STARTUP_NOT_FOUND",
        msg: savedErrors.get("en").get("STARTUP_NOT_FOUND"),
      };
      let body = {
        content:
          generateRandomName() + generateRandomName() + generateRandomName(),
      };
      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/startups/0/comments`)
        .set("Authorization", normal_token)
        .send(body);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toEqual(error);
    });
    test("Record added to the database", async () => {
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
      let recordsBeforeCreate = await Comment.count();

      let res = await supertest(app)
        .post(`${process.env.API_V1_URL}/startups/${theStartup.id}/comments`)
        .set("Authorization", normal_token)
        .send(body);

      let recordsAfterCreate = await Comment.count();
      expect(res.statusCode).toBe(200);
      expect(recordsAfterCreate).toBe(recordsBeforeCreate + 1);
      expect(res.body).toEqual(returnObject);
    });
  });
};
