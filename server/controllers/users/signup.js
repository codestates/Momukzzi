const { user } = require("../../models");
require("dotenv").config();

module.exports = (req, res) => {
  let payload = req.body

  user.create(payload).then(
  res.status(200).json({
      message : "signup success!",
      data: {payload}
  }))
};
