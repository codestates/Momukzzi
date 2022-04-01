const {
  shop,
  menu,
  shop_pic,
  shop_tag,
  tag,
  review,
  review_pic,
  user,
} = require("../../models");
const userinfo = require("../users/userinfo");

module.exports = async (req, res) => {
  const result = [];
  for (let i = 0; i < req.body.shop_ids.length; i++) {
    const shopPic = await shop_pic.findOne({
      where: {
        shop_id: req.body.shop_ids[i],
      },
    });
    result.push(shopPic);
  }
  res.status(200).send({ data: result });
};
