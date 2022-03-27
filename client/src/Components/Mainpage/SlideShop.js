import React, { useRef, useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Grid, Pagination, Navigation } from "swiper";
import dummyData from "./dummyData";

const SlideShopContainer = styled.div`
  margin-top: 30px;
  .swiper {
    width: 1300px;
    height: 500px;
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
  }

  .food-picture {
    width: 500px;
    height: 235px;
  }
`;

function SlideShop() {
  return (
    <SlideShopContainer>
      <Swiper
        slidesPerView={3}
        grid={{
          rows: 2,
        }}
        slidesPerGroup={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Grid, Pagination, Navigation]}
        className="mySwiper"
      >
        {dummyData.map((data, i) => {
          return (
            <SwiperSlide key={i}>
              <img className="food-picture" src={data.img} />
            </SwiperSlide>
          );
        })}
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </SlideShopContainer>
  );
}

export default SlideShop;
