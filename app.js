const express = require("express");

const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");

const Sequelize = require("./utils/database");
const messages = require("./models/messages.js");
const users = require("./models/signup.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
      origin: 'http://127.0.0.1:5500',
     
}));
app.use(userRoutes);
app.use(messageRoutes);


users.hasMany(messages);
messages.belongsTo(users);


Sequelize.sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
