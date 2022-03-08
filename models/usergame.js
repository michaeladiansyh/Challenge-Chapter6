"use strict";
const { user } = require("pg/lib/defaults");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userGame.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "userGame",
      paranoid: true,
      hooks: {
        afterDestroy: function (instance, options) {
          instance
            .getUserBiodata()
            .then((userbiodata) => userbiodata.destroy());
          instance
            .getUserHistory()
            .then((userhistory) => userhistory.destroy());
          console.log("after destroy: destroyed");
        },
        afterRestore: function (instance, options) {
          instance
            .getUserBiodata({ paranoid: false })
            .then((userbiodata) => userbiodata.restore());
          instance
            .getUserHistory({ paranoid: false })
            .then((userhistory) => userhistory.restore());
          console.log("áfter restore");
        },
      },
    }
  );

  userGame.associate = function (models) {
    userGame.hasOne(models.userGameBiodata, {
      foreignKey: "userId",
      onDelete: "cascade",
      hooks: true,
      as: "UserBiodata",
    });
    userGame.hasMany(models.userGameHistory, {
      foreignKey: "userId",
      onDelete: "cascade",
      hooks: true,
      as: "UserHistory",
    });
  };

  return userGame;
};
