const { user } = require("../../models");
require("dotenv").config();

<<<<<<< HEAD
module.exports = async (req, res) => {
  const userInfo = await user.findOne({
    where: {
      userid: req.body.userid,
    },
  });

  if (!userInfo) {
    user
      .create({
        userid: req.body.userid,
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
=======
module.exports = (req, res) => {
  let payload = req.body

  user.create(payload).then(
  res.status(200).json({
      message : "signup success!",
      data: {payload}
  }))
>>>>>>> 48d18e7bab098a22c58c40cb90d4896565a49cae
};
