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

const SlideTopic = () => {
  const [topicShopsInfo, setTopicShopsInfo] = useState([]);
  const [topicShopPics, setTopicShopPics] = useState([]);
  // console.log("주제별로 받아온 shop 테이블", topicShops);
  // console.log("주제별로 받아온 shop_pic 테이블", topicShopPics);

  useEffect(() => {
    axios
      .get("https://localhost:4000/topicshop/total_review", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setTopicShopsInfo(res.data.data.shopInfo);
        setTopicShopPics(res.data.data.shopPicInfos);
      });
  }, []);

  return (
    <SlideTopicContainer>
      <div id="topic">평점이 높은 식당</div>
      <div className="shop_list">
        {topicShopsInfo.map((obj, i) => {
          return (
            <TopicShopList key={i}>
              <Link to={`/shopdetail/${obj.id}`}>
                <SlideTopicImage
                  className="shop_pic"
                  src={topicShopPics[i]?.pic_URL}
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
