const bcrypt = require("bcrypt");

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
