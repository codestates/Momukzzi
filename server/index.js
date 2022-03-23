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
app.post("/users/login", controllers.login);
app.get("/users/logout", controllers.logout);

//신규 유저 가입, 탈퇴, 유저 정보 조회, 유저 정보 변경
app.post("/users", controllers.signup);
app.delete("/users", controllers.signout);
app.get("/users", controllers.userinfo);
app.patch("/users", controllers.changeinfo);

//음식점 정보 조회
app.get("/shops/:shop_id", controllers.shopinfo);


//아티클 조회, 게시, 삭제, 수정
app.post("/articles", controllers.createarticle);
app.delete("/articles",controllers.delarticle);
app.get("/articles", controllers.patcharticle);
app.get("/articles", controllers.article)

//리뷰 조회, 게시, 삭제, 수정

app.post("/reviews", controllers.createreview);
app.delete("/reviews",controllers.delreview);
app.get("/reviews", controllers.patchreview);
app.get("/reviews", controllers.review)

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
  db.sequelize.sync().then((req) => {
    app.listen(HTTPS_PORT, function () {
      console.log(`listen on ${HTTPS_PORT}`);
    });
    
  });;
} else {
  db.sequelize.sync().then((req) => {
    app.listen(HTTPS_PORT, function () {
      console.log(`listen on ${HTTPS_PORT}`);
    });
    
  });;
}

// module.exports = server;
