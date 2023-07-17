"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Challenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Challenge.belongsTo(models.Citizen);
    }
  }
  Challenge.init(
    {
      body: DataTypes.TEXT,
      statue: {
        type: DataTypes.ENUM,
        values: ["accepted", "pending", "denied"],
      },
      citizenId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Challenge",
    }
  );
  return Challenge;
};
