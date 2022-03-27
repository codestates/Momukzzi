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
const PickImage = styled.img`
  width: 100%;
  height: 400px;
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
        {dummyData.map((data, i) => {
          return (
            <SwiperSlide key={i}>
              <PickImage src={data.img} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SlidePickContainer>
  );
}

export default SlidePick;
