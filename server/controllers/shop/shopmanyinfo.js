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
  for (let i = 0; i < req.body.map_ids.length; i++) {
    const shopInfo = await shop.findOne({
      where: {
        map_id: req.body.map_ids[i],
      },
    });
    result.push(shopInfo);
  }

  res.status(200).send({ data: result });
};
