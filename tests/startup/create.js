const supertest = require("supertest");
const app = require("../../app");
const { Startup } = require("../../models");
const { generateRandomName } = require("../util/createRandomNames");

module.exports = () => {
  let create_validation_errors = [
    {
      path: "name",
      msg: "Invalid value",
    },
    {
      path: "name",
      msg: "name must be at least 3 characters long",
    },
    {
      path: "statue",
      msg: "statue can't be empty",
    },
    {
      path: "statue",
      msg: "unknown statue",
    },
    {
      path: "description",
      msg: "Invalid value",
    },
    {
      path: "description",
      msg: "description can't be less than 10 charcters",
    },
    {
      path: "applicantId",
      msg: "applicantId is not provided",
    },
    {
      path: "applicantId",
      msg: "Applicant not exist",
    },
  ];
  let createdObject = 0;
  describe("Create Startup", () => {
    test("Validate form fields", async () => {
      let res = await supertest(app).post("/startups").send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.validationErrors).toEqual(create_validation_errors);
    });
    test("Validate existing applicant", async () => {
      let validationError = [
        {
          path: "applicantId",
          msg: "Applicant not exist",
        },
      ];
      let body = {
        name: generateRandomName(),
        statue: "Pending",
        description: "We making beautiful food",
        applicantId: 0,
      };
      let res = await supertest(app).post("/startups").send(body);
      expect(res.statusCode).toBe(400);
      expect(res.body.validationErrors).toEqual(validationError);
    });
    test("Validate repeated startup name", async () => {
      let validationError = [
        {
          path: "name",
          msg: "repeated startup name",
        },
      ];
      let body = {
        name: "newStartup",
        statue: "Pending",
        description: "We making beautiful food",
        applicantId: 1,
      };
      let res = await supertest(app).post("/startups").send(body);
      expect(res.statusCode).toBe(400);
      expect(res.body.validationErrors).toEqual(validationError);
    });
    test("Record added to the database", async () => {
      let body = {
        name: generateRandomName(),
        statue: "Pending",
        description: "We making beautiful food",
        applicantId: 1,
      };
      let recordsBeforeCreate = await Startup.count();

      let res = await supertest(app).post("/startups").send(body);

      let recordsAfterCreate = await Startup.count();
      createdObject = res.body;
      expect(recordsAfterCreate).toBe(recordsBeforeCreate + 1);
      expect(res.statusCode).toBe(200);
    });
  });
};
