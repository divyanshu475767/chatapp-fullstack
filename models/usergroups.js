const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const usergroups = sequelize.define("usergroups", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  
});

module.exports = usergroups;
