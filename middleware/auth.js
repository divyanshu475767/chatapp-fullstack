const jwt = require('jsonwebtoken');
const users = require('../models/signup.js');





exports.authenticate = (req,res,next)=>{

    const token = req.header('Authorization');
   
    const user = jwt.verify(token ,'myToken');
  
    const id= user.userId;


    users.findByPk(id)
    .then(user=>{
     
        req.userId = user.dataValues.id;

        next();
    })
    .catch(err=>{
       res.status(401).json({message:"user not found"})
    })


}