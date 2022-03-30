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
  console.log("get shopinfo");
  console.log(req.params.map_id);
  const targetshop = await shop.findOne({
    include: [
      {
        model: menu,
        attributes: ["menu_name", "price"],
      },
      {
        model: shop_pic,
        attributes: ["pic_URL"],
      },
      {
        model: review,
        include: [
          {
            model: user,
            attributes: ["user_id"],
          },
        ],
        attributes: ["user_id", "comment", "star"],
      },
    ],

    where: {
      map_id: req.params.map_id,
    },
  });

  // const taglist = await shop_tag.findAll({
  //   include: [
  //     {
  //       model: tag,
  //       attributes: ["tag"],
  //     },
  //   ],
  //   where: {
  //     shop_id: req.params.shop_id,
  //   },
  // });
  // console.log("-------------------------", targetshop);
  // console.log("-------------------------", taglist);
  res.status(200).json({
    message: "shopinfo called!",
    data: { targetshop },
  });
};
