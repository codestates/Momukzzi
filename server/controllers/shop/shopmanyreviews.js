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
  console.log("817236498127364981237694812736948", req.body);
  const result = [];
  for (let i = 0; i < req.body.shop_ids.length; i++) {
    const reviewInfo = await review.findOne({
      where: {
        shop_id: req.body.shop_ids[i],
      },
    });

    result.push(reviewInfo);
  }
  res.status(200).send({ data: result });
};
