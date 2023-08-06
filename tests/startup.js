const supertest = require("supertest");
const app = require("../app");
const { Startup } = require("../models");
const { generateRandomName } = require("./util/createRandomNames");

module.exports = () => {
  describe("Startup", () => {
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
    let update_validation_errors = [
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
    let loginToken =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImlhdCI6MTY5MDk4MTQwMSwiZXhwIjozMTcyMzU0MjM4MDF9.VfLBdaZyE8-i0Ni_40aCWBhSv3KxlBNRKgVHmYMciKM";
    //signup
    describe("CRUD Operations", () => {
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
          let res = await supertest(app).get("/startups").send();
          expect(res.statusCode).toBe(200);
          expect(res.body.results[0]).toEqual(rightSchema);
          expect(res.body.results.length).toEqual(startupsCount);
        });
      });
      describe("Update Startup", () => {
        let theId = 8;
        test("Validate form fields", async () => {
          let res = await supertest(app).put(`/startups/${theId}`).send({});
          expect(res.statusCode).toBe(400);
          expect(res.body.validationErrors).toEqual(update_validation_errors);
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
          let res = await supertest(app).put(`/startups/${theId}`).send(body);
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
          let res = await supertest(app).put(`/startups/${theId}`).send(body);
          expect(res.statusCode).toBe(400);
          expect(res.body.validationErrors).toEqual(validationError);
        });
        test("Record updated in the database", async () => {
          let newName = generateRandomName() + "-updated";
          let updatedBody = {
            name: newName,
            statue: "Pending",
            description: "We making beautiful food",
            applicantId: 1,
          };
          let shouldReturnedBody = {
            id: theId,
            name: newName,
            statue: "Pending",
            description: "We making beautiful food",
            applicantId: 1,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            ApplicantId: 1,
          };
          let res = await supertest(app)
            .put(`/startups/${theId}`)
            .send(updatedBody);
          expect(res.statusCode).toBe(200);
          expect(res.body).toEqual(shouldReturnedBody);
        });
      });
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
          returnObject = createdObject;
          returnObject.ApplicantId = createdObject.applicantId;
          returnObject.createdAt = expect.any(String);
          returnObject.updatedAt = expect.any(String);
          let recordsBeforeDelete = await Startup.count();

          let res = await supertest(app)
            .delete(`/startups/${returnObject.id}`)
            .send();

          let recordsAfterDelete = await Startup.count();
          expect(recordsAfterDelete).toBe(recordsBeforeDelete - 1);
          expect(res.statusCode).toBe(200);
          expect(res.body).toEqual(returnObject);
        });
      });
    });
  });
};
