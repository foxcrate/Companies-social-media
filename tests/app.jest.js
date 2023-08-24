const supertest = require("supertest");
const app = require("../app");
const { Startup, Citizen } = require("../models");
const { generateRandomName } = require("./utilsForTest/createRandomNames");

const citizenTest = require("./citizen.test/index.test");
const applicantTest = require("./applicant.test/index.test");
const startupTest = require("./startup.test/index.test");
const commentTest = require("./comment.test/index.test");
const likeTest = require("./like.test/index.test");
const utilTest = require("./utils.test/index");

// citizenTest();
// applicantTest();
// startupTest();
commentTest();
likeTest();
// utilTest();
