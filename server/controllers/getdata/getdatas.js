const { shop, shop_pic, menu } = require("../../models");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const { scrollPageToBottom } = require("puppeteer-autoscroll-down");

module.exports = async (req, res) => {
  // let address = req.body.road_address_name;
  let address = undefined;
  let result = []; //결과를 담을 객체
  // console.log(req.body.data);
  for (let i = 0; i < req.body.data.length; i++) {
    // 데이터 베이스에 있는지 검증

    const shopinfo = await shop.findOne({
      where: {
        location: req.body.data[i].road_address_name,
      },
    });

    // console.log(shopinfo);

    if (shopinfo) {
      console.log("데이터 베이스에서 정보가 나갑니다~");
      let eachshop = [];
      let photodatas = []; //이미지 크롤링 결과
      let menulist = []; //메뉴 정보 크롤링 결과

      const shopid = shopinfo.id;

      const shoppic = await shop_pic.findAll({
        where: {
          shop_id: shopid,
        },
      });

      for (let i = 0; i < shoppic.length; i++) {
        photodatas.push(shoppic[i].pic_URL);
      }

      const menu_list = await menu.findAll({
        where: {
          shop_id: shopid,
        },
      });

      for (let i = 0; i < menu_list.length; i++) {
        menulist.push([menu_list[i].menu_name, menu_list[i].price]);
      }

      result.push({
        shoppic: photodatas,
        menulist: menulist,
      });
    } else {
      console.log("크롤링해서 정보가 나갑니다~");

      let eachshop = [];
      let photodatas = []; //이미지 크롤링 결과
      let menulist = []; //메뉴 정보 크롤링 결과
      let genus = req.body.data[i].category_name.split(" > ")[1];

      // 크롤링시작

      const browser = await puppeteer.launch({});

      const page = await browser.newPage();

      await page.setViewport({
        width: 1920,
        height: 1080,
      });

      await page.goto(req.body.data[i].place_url);

      await scrollPageToBottom(page, {
        size: 500,
      });

      let content = await page.content(req.body.data[i].place_url);

      const $ = cheerio.load(content);
      const photolists = await $(
        "#mArticle > div.cont_photo > div.photo_area > ul >li"
      ).children("a");
      const menulists = await $(
        "#mArticle > div.cont_menu > ul >li > div"
      ).children("span");
      const price = await $(
        "#mArticle > div.cont_menu > ul > li > div "
      ).children("em.price_menu");
      // const worktime = await $(
      //   "#mArticle > div.cont_essential > div.details_placeinfo > div:nth-child(3) > div > div.location_present > ul > li > span"
      // ).children("span");
      // console.log(worktime);
      // work_time = worktime[0].children[0].data;

      for (let i = 0; i < photolists.length; i++) {
        let word =
          "https:" +
          photolists[i].attribs.style.slice(22, 55) +
          "R0x420/" +
          photolists[i].attribs.style.slice(64, -2);
        // console.log(photolists[i].attribs.style);
        // console.log(word);
        photodatas.push(word);
      }

      for (let i = 0; i < menulists.length; i++) {
        if (price.length !== 0) {
          const somemenu = menulists[i].children[0].data;
          const eachprice = price[i].children[1].data;
          menulist.push([somemenu, eachprice]);
        } else {
          const somemenu = menulists[i].children[0].data;
          const eachprice = "가격 정보 없음"; //상품 가격 (가끔 가격이 없는 곳도 있음)
          menulist.push([somemenu, eachprice]);
        }
      }

      //크롤링 종료!

      // 음식점 기본 정보 저장
      await shop.create({
        shop_name: req.body.data[i].place_name,
        genus: genus,
        location: req.body.data[i].road_address_name,
        work_time: "9:00 ~ 21:00",
      });

      // 저장한 기본 정보의 음식점 id 가져오기
      const newshopinfo = await shop.findOne({
        where: {
          shop_name: req.body.data[i].place_name,
          location: req.body.data[i].road_address_name,
        },
      });

      const shopid = newshopinfo.id;

      //사진 저장
      for (let i = 0; i < photodatas.length; i++) {
        await shop_pic.create({
          shop_id: shopid,
          pic_URL: photodatas[i],
        });
      }

      // 메뉴 저장
      for (let i = 0; i < menulist.length; i++) {
        const menu_name = menulist[i][0];
        const price_list = menulist[i][1];
        await menu.create({
          shop_id: shopid,
          menu_name: menu_name,
          price: price_list,
        });
      }

      result.push({
        shoppic: photodatas,
        menulist: menulist,
      });
    }
  }

  res.status(200).json({
    message: "shopinfo crawling",
    data: {
      result,
    },
  });
};
