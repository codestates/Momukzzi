import react, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Grid, Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";
import axios from "axios";
const TodaysPickContainer = styled.div`
  border: 1px solid black;
  width: 500px;
  height: 400px;
  margin: 0 auto;
  .swiper-slide {
    height: 400px;
    border: 1px solid black;
  }
`;

const ShopDetail = styled.div`
  text-align: right;
  font-size: 20px;
  color: gainsboro;
`;

const ShopName = styled.div`
  border: 1px solid black;
  height: 100px;
  text-align: center;
  line-height: 90px;
  #shop-name {
    font-size: 25px;
  }
  #shop-category {
    margin-left: 5px;
    color: rgb(0, 0, 0.4);
  }
`;

const ShopMenu = styled.div`
  border: solid 1px black;
`;

const TodaysPick = () => {
  const [currentLocationX, setCurrentLocationX] = useState(127.423084873712);
  const [currentLocationY, setCurrentLocationY] = useState(37.0789561558879);
  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          function (position) {
            setCurrentLocationX(position.coords.latitude);
            setCurrentLocationY(position.coords.longitude);
            alert(position.coords.latitude + " " + position.coords.longitude);
          },
          function (error) {
            console.error(error);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      } else {
        alert("GPS를 지원하지 않습니다");
      }
    }
    getLocation();
    console.log(currentLocationX);
    console.log(currentLocationY);

    const appkey = "2af87592ef59bb8f2f504dc1544a0a89";
    const url = `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=FD6&sort=accuracy&x=${currentLocationX}&y=${currentLocationY}&radius=1&page=1&size=5`;
    const headers = new Headers();
    headers.append("Authorization", `KakaoAK ${appkey}`);
    const mode = "cors";

    (async () => {
      const response = await fetch(url, { headers, mode });
      const data = await response.json();
      console.log(data);
    })();
  }, [currentLocationX, currentLocationY]);

  return (
    <TodaysPickContainer>
      <ShopDetail>상세 정보</ShopDetail>
      <Swiper
        slidesPerView={1}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="swiper-slide"></SwiperSlide>
        <SwiperSlide className="swiper-slide">2</SwiperSlide>
        <SwiperSlide className="swiper-slide">3</SwiperSlide>
      </Swiper>
      <ShopName>
        <span id="shop-name">가게이름</span>
        <span id="shop-category">종류</span>
      </ShopName>
      <ShopMenu>메뉴이름</ShopMenu>
      <div>
        <div id="map" style={{ width: "500px", height: "400px" }}></div>
      </div>
    </TodaysPickContainer>
  );
};

export default TodaysPick;
