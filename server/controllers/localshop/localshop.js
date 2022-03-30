const { reset } = require("nodemon");
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
  console.log("get local_shop_info");
  console.log("sdfsdfdsafsdlkfjnswlekfnwlesdf", req.params.code);

  if (req.params.code === "a1") {
    const shopInfo1 = await shop.findOne({
      where: {
        shop_name: "천진분식",
      },
    });
    console.log(shopInfo1);
    // const shop_pic1 = await shop_pic.findeOne({where : {
    //   shop_id : shopInfo1
    // }})
    // const shopInfo2 = await shop.findOne({where : {
    //   shop_name : "미스터서왕만두"
    // }})
    // const shopInfo3
    // const shopInfo4
    // const shopInfo5
  } else if (res.params.code === "a2") {
  } else if (res.params.code === "a3") {
  } else if (res.params.code === "a4") {
  } else if (res.params.code === "a5") {
  } else if (res.params.code === "a6") {
  }
};
