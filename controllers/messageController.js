const users = require("../models/signup");
const messages = require("../models/messages");

exports.postMessage = async (req, res, next) => {
  const userId = req.userId;
  const message = req.body.message;
  console.log('group >>>>>>',req.body.groupId)

  const user = await users.findOne({ where: { id: userId } });

  if (user) {
    const id = user.id;

    const response = await messages.create({
      message: message,
      SignupId: id,
      groupId: req.body.groupId
    });

   
    return res.json({ message: "message added successfully" });
  } else {
    return res.json({ message: "user not found" });
  }
};


exports.getMessage = async (req, res, next) => {

  const group_Id = req.params.groupId;
  
   
     const message = await messages.findAll({where:{groupId:group_Id}})

     console.log(message);
    return res.json({ messages: message})
    


}