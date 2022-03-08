"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userGameBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userGameBiodata.init(
    {
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "userGameBiodata",
      paranoid: true,
    }
  );

  userGameBiodata.associate = function (models) {
    userGameBiodata.belongsTo(models.userGame, {
      foreignKey: "userId",
      as: "User",
    });
  };
  return userGameBiodata;
};
