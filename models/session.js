"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Session.belongsTo(models.Evaluator);
      Session.belongsTo(models.Applicant);
    }
  }
  Session.init(
    {
      dateTime: DataTypes.DATE,
      duration: DataTypes.INTEGER,
      evaluatorId: DataTypes.INTEGER,
      applicantId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Session",
    }
  );
  return Session;
};
