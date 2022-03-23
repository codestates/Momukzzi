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

const SlidePickContainer = styled.div`
  margin: 30px auto;
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
  }

  .food-picture {
    width: 600px;
    height: 260px;
    transform: translateY(25%);
  }
`;
function SlidePick() {
  return (
    <SlidePickContainer>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
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
        <SwiperSlide>
          <img
            className="food-picture"
            src="https://w.namu.la/s/b7f340235a984c691396ebcc8548ea963ada9595b79f715d54c5cac460c6b4ea7639b71b68a0c3cb9814d264bb4b904d3aaf071a2005f7ffe1acac25483ca4f4803641d94eee0884a77b149d733240823509489592c8c3b8f7c0ba1cdd078c78"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="food-picture"
            src="https://t1.daumcdn.net/cfile/blog/244A1848595D9D7007"
          />
        </SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </SlidePickContainer>
  );
}

export default SlidePick;
