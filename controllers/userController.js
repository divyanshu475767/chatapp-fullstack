const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = require("../models/signup");

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
