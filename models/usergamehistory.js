"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userGameHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userGameHistory.init(
    {
      score: DataTypes.INTEGER,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "userGameHistory",
      paranoid: true,
    }
  );

  userGameHistory.associate = function (models) {
    userGameHistory.belongsTo(models.userGame, {
      foreignKey: "userId",
      as: "User",
    });
  };

  return userGameHistory;
};
