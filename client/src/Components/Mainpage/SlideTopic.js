import react, { useEffect, useState } from "react";
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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const SlideTopicContainer = styled.div`
  width: 1300px;
  height: 475px;
  border: 1px solid black;
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const SlideTopicShop = styled.div`
  width: 300px;
  height: 235px;
  border: 1px solid black;
`;
const SlideTopicImage = styled.img`
  width: 300px;
  height: 235px;
  border: 1px solid black;
`;

const SlideTopic = () => {
  const dispatch = useDispatch();
  const topicShopInfo = useSelector((state) => state.topicShopInfo);
  const topicShopDetailInfo = useSelector((state) => state.topicShopDetailInfo);
  console.log(topicShopDetailInfo);
  console.log(topicShopInfo);
  return (
    <SlideTopicContainer>
      <div>평점이 높은 식당</div>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        slidesPerGroup={4}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      ></Swiper>
      {/* {topicShopDetailInfo.map((el, i) => {
        return (
          <SwiperSlide key={i}>
            <img src={el.pic_URL}></img>
          </SwiperSlide>
        );
      })} */}
    </SlideTopicContainer>
  );
};

export default SlideTopic;
