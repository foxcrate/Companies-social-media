"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Evaluator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Evaluator.hasMany(models.FreeSlot);
      Evaluator.hasMany(models.Session);
      Evaluator.hasMany(models.Invitation);
    }
  }
  Evaluator.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Evaluator",
    }
  );
  return Evaluator;
};
