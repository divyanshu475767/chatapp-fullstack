const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = require("../models/signup");
const groups = require("../models/groups");
const UserGroup = require("../models/usergroups");

exports.signup = async (req, res, next) => {
  try {
    const body = req.body;

    const user = await users.findOne({ where: { email: req.body.email } });

    if (user) {
      res.json({ success: false });
      return;
    } else {
      const hash = await bcrypt.hash(body.password, 10);

      const create_user = await users.create({
        name: body.name,
        email: body.email,
        phone: body.phone,
        password: hash,
      });

      res.json({ success: true });
      return;
    }
  } catch (err) {
    return res.status(404).json({ success: false });
  }
};

function generateAccessToken(id) {
  const token = jwt.sign({ userId: id }, "myToken");
  return token;
}

exports.login = async (req, res, next) => {
  const body = req.body;
  console.log(req.body.email);

  try {
    const data = await users.findAll({ where: { email: req.body.email } });

    if (data[0]) {
      const response = await bcrypt.compare(
        req.body.password,
        data[0].dataValues.password
      );

      if (response) {
        const id = data[0].dataValues.id;
        const token = generateAccessToken(id);
        console.log(token);
        res.json({ id: token });
      } else {
        res.status(401).send("User not authorized");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

exports.getAllUsers = async (req, res) => {
  const allUsers = await users.findAll();

  console.log(allUsers);

  return res.json({ allUsers });
};

exports.createGroup = async (req, res) => {
  const adminId = req.userId;
  try {
    const group = await groups.create({
      name: req.body.groupName,
    });
    userIds = req.body.participants.map((id) => parseInt(id, 10));

    userIds.forEach(async (id) => {
      if (id == adminId) {
        await UserGroup.create({
          SignupId: id,
          groupId: group.id,
          isAdmin: true,
        });
      } else {
        await UserGroup.create({
          SignupId: id,
          groupId: group.id,
          isAdmin: false,
        });
      }
    });

    res.json({ msg: "group created successfully and you are its admin" });
  } catch (err) {
    return res.json({ msg: "group could not be created" });
  }
};

exports.getAllGroups = async (req, res) => {
  const userId = req.userId;
  console.log(userId);

  const user_groups = await UserGroup.findAll({ where: { SignupId: userId } });

  //console.log(user_groups);

  var AllGroups = [];

  for (const group of user_groups) {
    const groupDetails = await groups.findOne({ where: { id: group.groupId } });

    let id = groupDetails.id;
    let name = groupDetails.name;

    AllGroups.push({ id, name });
  }

  res.send(AllGroups);
};

exports.getAllRemainingUsers = async (req, res, next) => {
  const groupId = req.params.groupId;

  const existingMembers = await UserGroup.findAll({
    where: { groupId: groupId },
    attributes: ["SignupId"],
  });

  let existingMembersId = [];

  for (var i = 0; i < existingMembers.length; i++) {
    existingMembersId.push(existingMembers[i].dataValues.SignupId);
  }

  //console.log(existingMembersId);

  const AllUsers = await users.findAll({
    attributes: ["id", "name"],
  });

  let AllUsersDetails = [];
  for (var i = 0; i < AllUsers.length; i++) {
    AllUsersDetails.push(AllUsers[i].dataValues);
  }

  // console.log(AllUsersDetails);

  const finalArray = AllUsersDetails.filter(
    (item) => !existingMembersId.includes(item.id)
  );
  res.json(finalArray);
};


exports.newUsersAdd =async(req, res) => {

 const groupId = req.body.groupId;
 const newUsers = req.body.newUsers.map(function(element) {
  return parseInt(element, 10);
});

console.log(newUsers);


for(var i =0 ; i <newUsers.length;i++){

 await UserGroup.create({
           groupId:groupId,
           SignupId:newUsers[i],
           isAdmin:false
  })
  
}

res.send('users added successfully');




}



exports.getAllGroupMembers=async(req, res) => {

const groupId = req.params.groupId

const present_users = await UserGroup.findAll({
  where:{groupId:groupId},
  attributes:['SignupId']
})

let allMembers= [];

for (var i = 0; i < present_users.length; i++) {
  allMembers.push(present_users[i].dataValues.SignupId);
}

console.log(allMembers);

const AllUsers = await users.findAll({
  attributes: ["id", "name"],
});

let AllUsersDetails = [];
for (var i = 0; i < AllUsers.length; i++) {
  AllUsersDetails.push(AllUsers[i].dataValues);
}

// console.log(AllUsersDetails);

const finalArray = AllUsersDetails.filter(
  (item) => allMembers.includes(item.id)
);
res.json(finalArray);

}


exports.removeUsers =async (req, res) => {


  console.log(req.body);

  const groupId = req.body.groupId;
 const users = req.body.removeUsers.map(function(element) {
  return parseInt(element, 10);
});


for(var i = 0; i < users.length; i++) {


 await UserGroup.destroy({
    where:{
      SignupId:users[i],
      groupId:groupId
    }
  })
}

res.send("members removed successfully");
}


exports.getAllNonAdmins = async(req, res) => {

  const groupId = req.params.groupId
  console.log('admin id',req.userId);

  const present_users = await UserGroup.findAll({
    where:{
      
      groupId:groupId , 
      isAdmin:0

    
    },
    attributes:['SignupId']
  })
  
  let allMembers= [];
  
  for (var i = 0; i < present_users.length; i++) {
    allMembers.push(present_users[i].dataValues.SignupId);
  }
  
  console.log(allMembers);
  
  const AllUsers = await users.findAll({
    attributes: ["id", "name"],
  });
  
  let AllUsersDetails = [];
  for (var i = 0; i < AllUsers.length; i++) {
    AllUsersDetails.push(AllUsers[i].dataValues);
  }
  
  // console.log(AllUsersDetails);
  
  const finalArray = AllUsersDetails.filter(
    (item) => allMembers.includes(item.id) && item.id !==req.userId
  );
  res.json(finalArray);
}



exports.addAdmins=async(req,res)=>{
 

const groupId = req.body.groupId;
  const admins  = req.body.addAdmins.map(function(element) {
    return parseInt(element, 10);
  });


  for(var i = 0; i < admins.length; i++) {


 const user =   await UserGroup.findOne({
       where:{
        groupId: groupId,
        SignupId:admins[i]
       }
     })

     if (!user) {
      console.log('User not found');
      return;
    }
  
    else{
      user.isAdmin=true;
      await user.save();
    }
   }
   
   res.send("admins added successfully");
 }


 exports.checkAdmin = async(req,res) => {

  const userid =req.userId ;
  const groupid =  req.params.groupId;

  console.log(userid)



  
  const adminStatus = await UserGroup.findOne({
    where:{groupId:groupid , SignupId:userid},
    attributes:['isAdmin']
    
  })
  if(adminStatus.dataValues.isAdmin){
    res.send({admin:1});
  }

  else{
    res.send({admin:0});
  }

  









 }