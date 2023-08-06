const supertest = require("supertest");
const app = require("../app");
const { Startup, Citizen } = require("../models");
const { generateRandomName } = require("./util/createRandomNames");

const citizenTest = require("./citizen");
const startupTest = require("./startup");

citizenTest();
startupTest();
