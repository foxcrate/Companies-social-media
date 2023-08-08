const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv/config");
const citizenRoutes = require("./routes/v1/citizen.route");
const startupRoutes = require("./routes/v1/startup.route");
const citizenAuth = require("./middlewares/citizenAuth.middleware");
const errorHandler = require("./middlewares/errorHandler.middleware");

//middleware
app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use(`${process.env.API_V1_URL}/citizens`, citizenRoutes);
app.use(`${process.env.API_V1_URL}/startups`, startupRoutes);

app.use(errorHandler);

module.exports = app;
