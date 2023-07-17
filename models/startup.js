"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Startup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Startup.belongsTo(models.Applicant);
      Startup.hasMany(models.Comment);
      Startup.hasMany(models.Like);
      Startup.hasMany(models.Note);
    }
  }
  Startup.init(
    {
      name: DataTypes.STRING,
      statue: DataTypes.STRING,
      description: DataTypes.TEXT,
      applicantId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Startup",
    }
  );
  return Startup;
};
