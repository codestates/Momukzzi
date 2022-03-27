const { shop, shop_pic, menu } = require('../../models');
const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
const {scrollPageToBottom} = require('puppeteer-autoscroll-down')

module.exports = async (req,res) => {
    let photodatas = [] //이미지 크롤링 결과
    let menulist = {} //메뉴 정보 크롤링 결과
    let address = req.body.road_address_name
    let genus = req.body.category_name.split(" > ")[1]

    console.log(address)



    const shopinfo = await shop.findOne({
        where : {
            location : req.body.road_address_name
        }
    })

    console.log(shopinfo)

    if (shopinfo){
        console.log("데이터 베이스에서 정보가 나갑니다~")
        
        const shopid = shopinfo.id

        const shoppic = await shop_pic.findAll({
            where : {
                shop_id : shopid
            }
        })

        for (let i = 0; i < shoppic.length; i++){
            photodatas.push(shoppic[i].pic_URL)
        }

        const menu_list = await menu.findAll({
            where : {
                shop_id : shopid
            }
        })

        for (let i = 0; i < menu_list.length; i++){
            menulist[menu_list[i].menu_name] = menu_list[i].price
        }

        res.status(200).json({
            message : "shopinfo from database",
            data : {
                shoppic : photodatas,
                menu : menulist
            }
        })


    } else {
        console.log("크롤링해서 정보가 나갑니다~")
        await init(); // 일단 크롤링하고

        // 음식점 기본 정보 저장
        await shop.create({
            shop_name : req.body.place_name,
            genus : genus,
            location : req.body.road_address_name,
            work_time: work_time
        })

        // 저장한 기본 정보의 음식점 id 가져오기
        const newshopinfo = await shop.findOne({
            where : {
                shop_name : req.body.place_name,
                location : req.body.road_address_name
            }
        })

        const shopid = newshopinfo.id

        //사진 저장
        for (let i = 0; i < photodatas.length; i++) {
            await shop_pic.create({
                shop_id : shopid,
                pic_URL : photodatas[i]
            })
        }

        console.log(Object.keys(menulist))
        console.log(menulist)
        // 메뉴 저장

        
        for (let i = 0; i < Object.keys(menulist).length; i++) {
            const menu_name = Object.keys(menulist)[i]
            const price_list = Object.values(menulist)[i]
            console.log("메뉴 포문이 돌고 있습니다!!!")
            console.log(menu_name)
            console.log(price_list)
            await menu.create({
                shop_id : shopid,
                menu_name : menu_name,
                price : price_list,
            })
        }

        res.status(200).json({
            message : "shopinfo crawling",
            data : {
                shoppic : photodatas,
                menu : menulist
            }
        })
    }

    console.log(genus)
    console.log(address)

    console.log(req.body.place_url)

    async function init () {
        const browser = await puppeteer.launch({});
    
        const page = await browser.newPage();

        await page.setViewport({
            width: 1920,
            height: 1080

        })
    
        await page.goto(req.body.place_url);
    
        
        await scrollPageToBottom(page, {
            size: 500
        })
        
        let content = await page.content(req.body.place_url);
        
        const $ = cheerio.load(content);
        const photolists = $("#mArticle > div.cont_photo > div.photo_area > ul >li").children("a");
        const menulists = $("#mArticle > div.cont_menu > ul >li > div").children("span");
        const price = $("#mArticle > div.cont_menu > ul > li > div ").children("em.price_menu")
        const worktime = $("#mArticle > div.cont_essential > div.details_placeinfo > div:nth-child(3) > div > div.location_present > ul > li > span").children("span")
        
        work_time = worktime[0].children[0].data
        console.log(work_time)

        for (let i = 0; i < photolists.length; i++){
            let word = 'https:' + photolists[i].attribs.style.slice(22, -2)
            photodatas.push(word)
        }

        for(let i=0; i < menulists.length; i++ ){

            if(price.length !== 0){
                const somemenu = menulists[i].children[0].data
                const eachprice = price[i].children[1].data
                menulist[somemenu] = eachprice
            } else {
                const somemenu = menulists[i].children[0].data
                const eachprice = "가격 정보 없음" //상품 가격 (가끔 가격이 없는 곳도 있음)
                menulist[somemenu] = eachprice
            }
        }

    }


    // res.status(200).json({
    //     message : "shopinfo crawling",
    //     data : {
    //         shoppic : photodatas,
    //         menu : menu
            
    //     }
    // })


}