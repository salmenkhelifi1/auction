// chat.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");

const Chat = sequelize.define(
  "Chat",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    sellerMessage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ClientMessage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: true, tableName: "chat" }
);

module.exports = Chat;
