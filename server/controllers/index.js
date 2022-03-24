const review = require("../models/review");

module.exports = {
  login: require("./users/login"),
  logout: require("./users/logout"),
  
  signup: require("./users/signup"),
  signout: require("./users/signout"),
  userinfo: require("./users/userinfo"),
  changeinfo: require("./users/changeinfo"),

  shopinfo : require("./shop/shopinfo"),

  review : require("./review/review"),
  createreview : require("./review/createreview"),
  delreview : require("./review/delreview"),
  patchreview : require("./review/patchreview"),

  article : require("./article/article"),
  delarticle : require("./article/delarticle"),
  patcharticle : require("./article/patcharticle"),
  createarticle : require("./article/createarticle"),
};
