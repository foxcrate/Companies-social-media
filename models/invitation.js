"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invitation.belongsTo(models.Evaluator);
      Invitation.belongsTo(models.Applicant);
    }
  }
  Invitation.init(
    {
      dateTime: DataTypes.DATE,
      statue: DataTypes.STRING,
      evaluatorId: DataTypes.INTEGER,
      applicantId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Invitation",
    }
  );
  return Invitation;
};
