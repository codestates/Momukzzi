require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const controllers = require("./controllers");

const db = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["https://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
  })
);
app.use(cookieParser());

//로그인, 아웃
app.post("/users/login", controllers.login); //로그인
app.get("/users/logout", controllers.logout); //로그아웃

//신규 유저 가입, 탈퇴, 유저 정보 조회, 유저 정보 변경
app.post("/users", controllers.signup); // 유저 정보 변경
app.delete("/users", controllers.signout); // 회원 탈퇴
app.get("/users", controllers.userinfo);  // 유저 정보 조회
app.patch("/users", controllers.changeinfo); // 유저 정보 변경

//음식점 정보 조회, 사진업로드, 사진 업로드, 사진 삭제
app.get("/shops/:shop_id", controllers.shopinfo); // 음식점 정보 조회
app.post("/shops-pics", controllers.shoppic.post); // 
app.delete("/shops-pics",controllers.shoppic.delete)
app.get("/shops-tags",controllers.shoptag.get);
app.post("/shops-tags",controllers.shoptag.post);
app.delete("/shops-tags",controllers.shoptag.delete);
app.patch("/shops-tags",controllers.shoptag.patch);

<<<<<<< HEAD
//아티클 조회, 게시, 삭제, 수정
app.post("/article", controllers.createarticle);
app.delete("/article", controllers.delarticle);
app.get("/article", controllers.patcharticle);
app.get("/article", controllers.article);
=======
//아티클 조회, 업로드, 삭제, 수정
app.post("/articles", controllers.createarticle);
app.delete("/articles",controllers.delarticle);
app.patch("/articles", controllers.patcharticle);
app.get("/articles/:article_id", controllers.article)

>>>>>>> 48d18e7bab098a22c58c40cb90d4896565a49cae

//리뷰 조회, 업로드, 삭제, 수정, 리뷰사진 업로드, 리뷰사진 삭제
app.post("/reviews", controllers.createreview);
app.delete("/reviews",controllers.delreview);
app.patch("/reviews", controllers.patchreview);
app.get("/reviews", controllers.review)
app.post("/reviews-pics", controllers.reviewpic.post);
app.delete("/reviews-pics",controllers.reviewpic.delete)

//tag 조회, 업로드, 삭제
app.post("/tags", controllers.tag.post);
app.delete("/tags", controllers.tag.delete);
app.patch("/tags", controllers.tag.patch);

<<<<<<< HEAD
app.post("/review", controllers.createreview);
app.delete("/review", controllers.delreview);
app.get("/review", controllers.patchreview);
app.get("/review", controllers.review);
=======
>>>>>>> 48d18e7bab098a22c58c40cb90d4896565a49cae

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

// 인증서 파일들이 존재하는 경우에만 https 프로토콜을 사용하는 서버를 실행합니다.
// 만약 인증서 파일이 존재하지 않는경우, http 프로토콜을 사용하는 서버를 실행합니다.
// 파일 존재여부를 확인하는 폴더는 서버 폴더의 package.json이 위치한 곳입니다.
let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log(`server runnning ${HTTPS_PORT}`));
} else {
  server = app.listen(HTTPS_PORT);
}

module.exports = server;
