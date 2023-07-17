"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FreeSlot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FreeSlot.belongsTo(models.Evaluator);
    }
  }
  FreeSlot.init(
    {
      dateTime: DataTypes.DATE,
      evaluatorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "FreeSlot",
    }
  );
  return FreeSlot;
};
