const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const citizenRoutes = require("./routes/citizen.route");
const startupRoutes = require("./routes/startup.route");
const citizenAuth = require("./middlewares/citizenAuth.middleware");
// const { Citizen, Startup } = require("./models");
const cors = require("cors");
require("dotenv/config");

//middleware
app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());
app.use(morgan("tiny"));

const api = process.env.API_URL;

app.use("/citizens", citizenRoutes);
app.use("/startups", startupRoutes);

module.exports = app;
