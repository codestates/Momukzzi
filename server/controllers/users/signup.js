const { users } = require("../../models");
require("dotenv").config();

module.exports = async (req, res) => {
  const userInfo = await users.findOne({
    where: {
      user_id: req.body.user_id,
    },
  });

  if (!userInfo) {
    users
      .create({
        user_id: req.body.user_id,
        password: req.body.password,
        nickname: req.body.nickname,
        email: req.body.email,
      })
      .then((response) => {
        res.status(201).send({ message: "created" });
      })
      .catch((err) => {
        throw err;
      });
  } else {
    res.status(226).send({ message: "exist" });
  }
};
