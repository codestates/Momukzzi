import React, { useRef, useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Grid, Pagination, Navigation } from "swiper";
import { useDispatch } from "react-redux";
import localShopInfo from "../../dummy/localShopInfo";
const SlidePickContainer = styled.div`
  width: 1300px;
  margin: 30px auto;
  border: 1px solid black;
  .swiper {
    width: 1300px;
    height: 250px;
    margin-left: auto;
    margin-right: auto;

    border: 1px solid black;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    height: calc((100% - 30px) / 2) !important;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;

    img {
      width: 200px;
      height: 200px;
      margin-top: 140px;
    }
  }
`;
const PickImage = styled.img`
  width: 100%;
  height: 400px;
`;
function SlidePick() {
  return (
    <SlidePickContainer>
      <div>지역별 추천 맛집</div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {localShopInfo.map((obj, i) => {
          return (
            <SwiperSlide className="slide" key={i}>
              <Link
                to={`/editor_pick/${obj.code},${obj.name},${obj.description}`}
              >
                <img src={obj.img[0]}></img>
                <img src={obj.img[1]}></img>
                <div>{obj.name}</div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SlidePickContainer>
  );
}

export default SlidePick;
