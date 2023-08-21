const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Signup = sequelize.define("Signup", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = Signup;
