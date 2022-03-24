

module.exports = {
  login: require("./users/login"),
  logout: require("./users/logout"),
  
  signup: require("./users/signup"),
  signout: require("./users/signout"),
  userinfo: require("./users/userinfo"),
  changeinfo: require("./users/changeinfo"),

  shopinfo : require("./shop/shopinfo"),
  shoppic : require("./pic/shoppic"),

  review : require("./review/review"),
  createreview : require("./review/createreview"),
  delreview : require("./review/delreview"),
  patchreview : require("./review/patchreview"),
  reviewpic : require("./pic/reviewpic"),

  article : require("./article/article"),
  delarticle : require("./article/delarticle"),
  patcharticle : require("./article/patcharticle"),
  createarticle : require("./article/createarticle"),

  tag : require("./tag/tag"),
  shoptag : require("./tag/shoptag"),
};
