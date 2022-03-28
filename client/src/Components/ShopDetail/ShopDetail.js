import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsStar } from "react-icons/bs";
import Review from "../Review/Review";
import ShopImageModal from "./ShopImageModal";
import {
  ShopImages,
  ShopBody,
  ShopBasicInfo,
  ShopBasicInfoHeader,
  ShopDetailInfo,
  ShopReview,
  ShopLocation,
  Buttons,
  ReviewButton,
  ReviewIcon,
  FavoriteButton,
} from "./ShopDetail.style";

/*global kakao*/

export default function ShopDetail() {
  const [isOpen, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [info, setInfo] = useState({ shop_pics: [], menus: [], reviews: [] });
  let reviewCount = 5;

  const handleImageClick = (item, i) => {
    setOpen(true);
    setCurrentImage(i);
  };

  const handleStar = () => {
    // 즐겨찾기 true or false, 별모양 빈거/채워진거
    // axios.post()
    console.log("hello");
  };

  useEffect(() => {
    // 카카오 map 객체 생성
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(37.63462628004234, 126.83257800122841),
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);

    // TODO: 메인페이지에서 shopid를 내려주면 엔드포인트에 붙여서 get요청

    axios.get("https://localhost:4000/shops/1").then((res) => {
      setInfo(res.data.data.targetshop);
    });
  }, []);

  return (
    <>
      {isOpen ? (
        <ShopImageModal
          setOpen={setOpen}
          currentImage={currentImage}
          imageSet={info.shop_pics}
        />
      ) : (
        <></>
      )}
      <ShopImages>
        {info.shop_pics.map((item, i) => {
          return (
            <img
              key={i}
              src={item.pic_URL}
              onClick={() => handleImageClick(item, i)}
            />
          );
        })}
      </ShopImages>
      <ShopBody>
        <ShopBasicInfo>
          <ShopBasicInfoHeader>
            <span>가게 이름 : {info.shop_name}</span>
            <span>평점 : {info.star_avg}</span>
            <Buttons>
              <Link to="/review">
                <ReviewButton>
                  <ReviewIcon />
                  <span>리뷰</span>
                </ReviewButton>
              </Link>

              {/*클릭 시 즐겨찾기 등록 or 해제 */}
              <ReviewButton>
                <BsStar className="favoriteButton" onClick={handleStar} />
                <span>즐겨찾기</span>
              </ReviewButton>
            </Buttons>
          </ShopBasicInfoHeader>
          <ShopDetailInfo>
            <ul>
              <li>주소 : {info.location}</li>
              <li>음식 종류 : {info.genus}</li>
              <li>영업시간 : {info.work_time}</li>
              <li>휴일 : {info.holiday}</li>
              <li>
                {info.menus.map((item) => {
                  return (
                    <div>
                      {item.menu_name} 가격은 {item.price}
                    </div>
                  );
                })}
              </li>
            </ul>
          </ShopDetailInfo>

          <ShopReview>
            {info.reviews.map((item, idx) => {
              return (
                <div key={idx} style={{ height: 30 }}>
                  아이디 : {item.user_id}
                  코멘트 : {item.comment}
                  평점 : {item.star}
                </div>
              );
            })}
          </ShopReview>
        </ShopBasicInfo>
        <ShopLocation id="map"></ShopLocation>
      </ShopBody>
    </>
  );
}
