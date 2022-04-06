/* global kakao */

import react, { useEffect, useState, Suspense } from "react";
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
import { AiOutlineConsoleSql } from "react-icons/ai";
import { type } from "@testing-library/user-event/dist/type";
import dummyKakaoShops from "../../dummy/dummyKakaoShops";
import SlideShop from "../Mainpage/SlideShop";
import LoadingIndicator from "../Loading/LoadingIndicator";

const TodaysPickContainer = styled.div`
  border: 1px solid black;
  width: 800px;
  height: 830px;
  margin: 0 auto;
  .swiper-slide {
    height: 300px;
    border: 1px solid black;
  }
  .swiper-slide > img {
    /* width: 790px; */
    /* height: 300px; */
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
  height: 80px;
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
  const loading = useSelector((state) => state.loading);
  const [randomInt, setRandomInt] = useState(0);

  const dispatch = useDispatch();

  const currentLocationShops = useSelector(
    (state) => state.currentLocationShops
  );
  // const currentLocationShopPics = useSelector(
  //   (state) => state.currentLocationShopPics
  // );
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    function getLocation() {
      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          function (position) {
            dispatch({ type: "loading", data: true });
            dispatch({ type: "loading_modal", data: true });
            axios
              .get(
                `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=FD6&page=1&size=15&sort=accuracy&x=${position.coords.longitude}&y=${position.coords.latitude}&radius=2000`,
                {
                  headers: {
                    Authorization: "KakaoAK 2af87592ef59bb8f2f504dc1544a0a89",
                  },
                }
              )
              .then((res) => {
                // console.log(res.data.documents);

                axios
                  .post(
                    "https://localhost:4000/data",
                    { data: res.data.documents },
                    {
                      withCredentials: true,
                    }
                  )
                  .then((res) => {
                    console.log(res);

                    dispatch({
                      type: "current_location_shops",
                      data: res.data.data.result,
                    });
                    dispatch({ type: "loading", data: false });
                    dispatch({ type: "loading_modal", data: false });
                    return res;
                  })
                  .then((res) => {
                    setRandomInt(getRandomInt(0, res.data.data.result.length));

                    const y = Number(
                      res.data.data.result[randomInt].shopinfo.shopinfo.x
                    );
                    const x = Number(
                      res.data.data.result[randomInt].shopinfo.shopinfo.y
                    );
                    console.log(x, y);
                    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
                    const options = {
                      //지도를 생성할 때 필요한 기본 옵션
                      center: new kakao.maps.LatLng(x, y), //지도의 중심좌표.
                      level: 3, //지도의 레벨(확대, 축소 정도)
                    };

                    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
                    // 마커가 표시될 위치입니다
                    var markerPosition = new kakao.maps.LatLng(x, y);

                    // 마커를 생성합니다
                    var marker = new kakao.maps.Marker({
                      position: markerPosition,
                    });

                    // 마커가 지도 위에 표시되도록 설정합니다
                    marker.setMap(map);

                    // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
                    // marker.setMap(null);
                  });
              });
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
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <TodaysPickContainer>
          <Section>
            <ShopDetail>상세 정보</ShopDetail>
            <Swiper
              slidesPerView={2}
              slidesPerGroup={2}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {currentLocationShops[randomInt].shoppic.photodatas.map((img) => {
                return (
                  <SwiperSlide>
                    <img src={img}></img>
                  </SwiperSlide>
                );
              })}
              <SwiperSlide></SwiperSlide>
            </Swiper>
            <ShopName>
              <span id="shop-name">
                {currentLocationShops[randomInt].shopinfo.shopinfo.place_name}
              </span>
              <span id="shop-category">
                {
                  currentLocationShops[
                    randomInt
                  ].shopinfo?.shopinfo?.category_name.split(">")[1]
                }
              </span>
            </ShopName>
          </Section>
          <Section className="map-container">
            <Map>
              <div id="map" style={{ width: "400px", height: "300px" }}></div>
            </Map>

            <ShopMenu className="test">
              <ul>
                <h3>메뉴</h3>
                {currentLocationShops[randomInt].menulist.menulist.map(
                  (menu, i) => {
                    return <li key={i}>{`${menu[0]} : ${menu[1]}`}</li>;
                  }
                )}
              </ul>
            </ShopMenu>
          </Section>
        </TodaysPickContainer>
      )}
    </>
  );
};

export default Intro;
