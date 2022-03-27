/* global kakao */

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
import {
  Provider,
  useSelector,
  useDispatch,
  connect,
  shallowEqual,
} from "react-redux";
import { put } from "redux-saga/effects";
const TodaysPickContainer = styled.div`
  border: 1px solid black;
  width: 1000px;
  height: 1000px;
  margin: 0 auto;
  .swiper-slide {
    height: 400px;
    border: 1px solid black;
  }
  .map-container {
    display: flex;
  }
`;

const Section = styled.section``;

const Map = styled.div``;

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
  width: 50%;
`;

const Intro = () => {
  const [randomInt, setRandomInt] = useState(0);
  const dispatch = useDispatch();
  const shopInfo = useSelector((state) => state.shopInfo);
  useEffect(() => {
    // 0 ~ 44 랜덤 정수 생성
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    }

    setRandomInt(getRandomInt(1, 44));

    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    function getLocation() {
      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          function (position) {
            // ----------------------------------지도 생성 -----------------------------
            var mapContainer = document.getElementById("map"), // 지도를 표시할 div
              mapOption = {
                center: new kakao.maps.LatLng(
                  position.coords.latitude,
                  position.coords.longitude
                ), // 지도의 중심좌표
                level: 5, // 지도의 확대 레벨
              };

            // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
            var map = new kakao.maps.Map(mapContainer, mapOption);
            // ------------------- 지도 생성 ------------------------------------------
            // ---------------------------마커 표시 ------------------------------------
            // 마커가 표시될 위치입니다
            var markerPosition = new kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
              position: markerPosition,
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);

            // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
            // marker.setMap(null);
            // -----------------------마커 표시 -------------------------------------------
            // -----------------------카테고리 검색 --------------------------------------
            // 장소 검색 객체를 생성합니다
            var ps = new kakao.maps.services.Places(map);

            // 카테고리로 은행을 검색합니다
            ps.categorySearch("FD6", placesSearchCB, {
              useMapBounds: true,
              page: 3,
            });

            // 키워드 검색 완료 시 호출되는 콜백함수 입니다
            const list = [];
            function placesSearchCB(data, status, pagination) {
              if (status === kakao.maps.services.Status.OK) {
                pagination.prevPage();
                for (var i = 0; i < data.length; i++) {
                  displayMarker(data[i]);
                  list.push(data[i]);
                }
              }
            }
            dispatch({ type: "shopinfo", data: list });
            // 지도에 마커를 표시하는 함수입니다
            function displayMarker(place) {
              // 마커를 생성하고 지도에 표시합니다
              var marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x),
              });

              // 마커에 클릭이벤트를 등록합니다
              kakao.maps.event.addListener(marker, "click", function () {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
                infowindow.setContent(
                  '<div style="padding:5px;font-size:12px;">' +
                    place.place_name +
                    "</div>"
                );
                infowindow.open(map, marker);
              });
            }
            // -----------------------카테고리 검색--------------------------------------
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
  }, []);

  return (
    <TodaysPickContainer>
      <Section>
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
      </Section>
      <Section className="map-container">
        <Map>
          <div id="map" style={{ width: "500px", height: "400px" }}></div>
        </Map>
        <ShopMenu>{""}</ShopMenu>
      </Section>
    </TodaysPickContainer>
  );
};

export default Intro;
