const Sequelize = require('sequelize');

const sequelize = new Sequelize('chat-app' , 'root' ,'ak475767' ,{dialect:'mysql' , host:'localhost'});


module.exports = sequelize;