import react, { useEffect, useState } from "react";
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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const SlideTopicContainer = styled.div`
  width: 1300px;
  height: 660px;
  border: 1px solid black;
  margin: 0 auto;
  margin-bottom: 30px;
  font-size: 25px;
  #topic {
    margin: 5px;
  }
  .shop_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;
const TopicShopList = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid black;
  margin: 5px;
`;
const SlideTopicImage = styled.img`
  width: 300px;
  height: 300px;
  border: 1px solid black;
`;

const SlideTopic = ({ topicInfo }) => {
  const dispatch = useDispatch();
  const topicShopInfo = useSelector((state) => state.topicShopInfo);
  const topicShopDetailInfo = useSelector((state) => state.topicShopDetailInfo);
  console.log("주제별로 받아온 shop_pic 테이블", topicShopDetailInfo);
  console.log("주제별로 받아온 shop 테이블", topicShopInfo);

  return (
    <SlideTopicContainer>
      <div id="topic">평점이 높은 식당</div>
      <div className="shop_list">
        {topicShopDetailInfo.map((el, i) => {
          return (
            <TopicShopList key={i}>
              <Link to={`/shopdetail2/${el.shop_id}`}>
                <SlideTopicImage
                  className="shop_pic"
                  src={el.pic_URL}
                ></SlideTopicImage>
              </Link>
            </TopicShopList>
          );
        })}
      </div>
    </SlideTopicContainer>
  );
};

export default SlideTopic;
