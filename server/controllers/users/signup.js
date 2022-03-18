const { users } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const shortid = require("shortid");
const res = require("express/lib/response");
const req = require("express/lib/request");
module.exports = async (req, res) => {
  const userInfo = await users.findOne({
    where: {
      userid: req.body.userid,
    },
  });

  if (!userInfo) {
    users
      .create({
        userid: req.body.userid,
        password: req.body.password,
        nickname: req.body.ninkname,
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
