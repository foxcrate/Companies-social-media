const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const sequelize = require("./util/database/connction");
const cors = require("cors");
require("dotenv/config");

//middleware
app.use(cors());
app.options("*", cors());

app.use(bodyParser.json());
app.use(morgan("tiny"));

const api = process.env.API_URL;

//Routes
// const categoriesRoutes = require("./routes/categories");

// app.use(`${api}/categories`, categoriesRoutes);

//Database

//Server
app.listen(8000, () => {
  console.log("server is running http://localhost:8000");
});
