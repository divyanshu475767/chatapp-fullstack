const express = require("express");

const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes.js");
const Sequelize = require("./utils/database");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
      origin: 'http://127.0.0.1:5500',
     
}));
app.use(userRoutes);

Sequelize.sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
