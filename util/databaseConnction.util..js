const Sequelize = require("sequelize");
require("dotenv/config");

const env_var = process.env;

const sequelize = new Sequelize(
  env_var.DB_NAME,
  env_var.DB_USER,
  env_var.DB_PASSWORD,
  {
    dialect: env_var.DB_DIALECT,
    host: env_var.DB_HOST,
  }
);

module.exports = sequelize;
