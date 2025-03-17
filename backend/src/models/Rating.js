const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Store = require("./Store");

const Rating = sequelize.define("Rating", {
  userId: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
  storeId: { type: DataTypes.INTEGER, references: { model: Store, key: "id" } },
  rating: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Rating;
