// models/MoneyArchive.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const MoneyArchive = sequelize.define(
  "MoneyArchive",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    money: {
      type: DataTypes.JSON, // Array of objects
      allowNull: false,
    },
    date: {
      type: DataTypes.JSON, // Array containing the first and last date
      allowNull: false,
    },
  },
  {
    tableName: "money_archives",
    timestamps: false,
  }
);

module.exports = MoneyArchive;
