const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const groups = sequelize.define("groups", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: Sequelize.STRING,
  
});

module.exports = groups;