const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const messages= sequelize.define("messages", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  message:Sequelize.STRING,
  
});

module.exports = messages;
