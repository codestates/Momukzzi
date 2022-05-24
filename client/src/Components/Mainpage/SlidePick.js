import React from "react";

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
import { Pagination, Navigation } from "swiper";

import localShopInfo from "../../dummy/localShopInfo";
const SlidePickContainer = styled.div`
  margin: 30px auto;
  width: 80%;
  .mySwiper {
    height: 100px;
  }
  .swiper {
    margin: 0 auto;
    width: 100%;
    height: 240px;
    border-radius: 5px;
  }

  .swiper-slide {
    text-align: center;
    font-size: 1.3rem;
  }
`;

const SlideImage = styled.img`
  width: 50%;
  height: 200px;
  border-radius: 10px;
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
  left: 25%;
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
        breakpoints={{
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 3,
          },
        }}
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
                <SlideImage src={obj.img[0]}></SlideImage>
                <SlideImage src={obj.img[1]}></SlideImage>
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
