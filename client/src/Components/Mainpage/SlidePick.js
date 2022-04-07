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
  margin: 30px auto;
  width: 1600px;
  .swiper {
    margin: 0 auto;
    width: 100%;
    height: 300px;
    border-radius: 5px;
  }
  img {
    width: 50%;
    height: 80%;
    border-radius: 10px;
  }
  .swiper-slide {
    text-align: center;
    font-size: 1.3rem;
  }
`;

const Title = styled.div`
  height: 50px;
  font-size: 1.5rem;
  color: #ffba34;
`;
const TopicName = styled.div`
  height: 50px;
  position: absolute;
  top: 40%;
  left: 30%;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 700;
  font-size: 1.5rem;
`;
function SlidePick() {
  return (
    <SlidePickContainer>
      <Title>지역별 추천 맛집</Title>
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
        {localShopInfo.map((obj) => {
          return (
            <SwiperSlide className="slide">
              <Link
                to={`/editor_pick/${obj.code},${obj.name},${obj.description}`}
                style={{
                  textDecoration: "none",
                  color: "#533026",
                  display: "flex",
                  position: "relative",
                }}
              >
                <img src={obj.img[0]}></img>
                <img src={obj.img[1]}></img>
                <TopicName>{obj.name}</TopicName>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SlidePickContainer>
  );
}

export default SlidePick;
