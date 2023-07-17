"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Citizen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Citizen.hasMany(models.Comment);
      Citizen.hasMany(models.Like);
      Citizen.hasMany(models.Challenge);
    }
  }
  Citizen.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Citizen",
    }
  );
  return Citizen;
};
