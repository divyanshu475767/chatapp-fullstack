const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");

const Sequelize = require("./utils/database");
const messages = require("./models/messages.js");
const users = require("./models/signup.js");
const groups = require("./models/groups.js");
const UserGroup = require("./models/usergroups");


const io = require('socket.io')(server ,{
  cors: {
    origin: 'http://127.0.0.1:5501', // Replace with your frontend's origin
    methods: ['GET', 'POST']
  }


})



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
      origin: 'http://127.0.0.1:5501',
     
}));

const file = require('express-fileupload');
app.use(file());


app.use(userRoutes);
app.use(messageRoutes);


io.on('connection',(socket)=>{
  console.log('connected.....')

  socket.on('message',(msg)=>{
   // console.log(msg);
   socket.broadcast.emit('message',msg)
  })



  socket.on('url',(message)=>{
    socket.broadcast.emit('url',message)
    
   })



})



users.hasMany(messages);
messages.belongsTo(users);

groups.hasMany(messages);
messages.belongsTo(groups);

users.belongsToMany(groups , {through:UserGroup});
groups.belongsToMany(users , {through:UserGroup});




Sequelize.sync()
  .then((result) => {
    server.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
