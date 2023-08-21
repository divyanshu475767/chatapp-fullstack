const users = require("../models/signup");
const messages = require("../models/messages");

exports.postMessage = async (req, res, next) => {
  const userId = req.userId;
  const message = req.body.message;

  const user = await users.findOne({ where: { id: userId } });

  if (user) {
    const id = user.id;
    console.log("lemon", id);
    const response = await messages.create({
      message: message,
      SignupId: id,
    });

    console.log(response);
    console.log("hello", userId);
    return res.json({ message: "message added successfully" });
  } else {
    return res.json({ message: "user not found" });
  }
};
