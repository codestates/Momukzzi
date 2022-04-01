const {
  shop,
  menu,
  shop_pic,
  shop_tag,
  tag,
  review,
  review_pic,
  user,
  favorites,
} = require("../../models");
const userinfo = require("../users/userinfo");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = async (req, res) => {
  // console.log(req.body);

  const payload = jwt.verify(
    req.body.headers.Authorization.split(" ")[1],
    process.env.ACCESS_SECRET
  );

  if (!payload) {
    res.send({ message: "not authorized(login first)" });
  } else {
    const userInfo = await user.findOne({
      where: {
        user_id: payload.user_id,
      },
    });

    if (!userInfo) {
      res.send({ message: "not authorized(login first)" });
    } else {
      if (req.body.add) {
        await favorites.create({
          shop_id: req.body.shop_id,
          user_id: payload.user_id,
        });
        const shopInfo = await shop.findOne({
          where: {
            shop_id: req.body.shop_id,
          },
        });
        const cookie = JSON.parse(req.cookies.favorites);
        cookie.push(shopInfo);

        res.cookie("favorites", JSON.stringify(cookie));
        res.status(200).send({ message: "add success" });
      } else {
        await favorites.delete({
          where: {
            shop_id: req.body.shop_id,
            user_id: payload.user_id,
          },
        });
        const shopInfo = await shop.findOne({
          where: {
            shop_id: req.body.shop_id,
          },
        });
        const cookie = JSON.parse(req.cookies.favorites);
        cookie.splice(cookie.indexOf(shopInfo), 1);
        res.cookie("favorites", JSON.stringify(cookie));
        res.status(200).send({ message: "remove success" });
      }
    }
  }
};
