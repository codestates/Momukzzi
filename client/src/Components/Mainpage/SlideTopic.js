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
  width: 1600px;
  height: 700px;
  margin: 0 auto;
  margin-bottom: 30px;
  font-size: 25px;

  flex-wrap: wrap;
  justify-content: space-between;
`;
const TopicShopList = styled.div`
  width: 350px;
  height: 300px;
  margin: 5px;
  border-radius: 10px;
`;
const SlideTopicImage = styled.img`
  width: 350px;
  height: 80%;
  border-radius: 10px;
`;
const SlideContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Title = styled.div`
  color: #ffba34;
  height: 50px;
`;

const ShopName = styled.div`
  height: 100px;
  text-align: center;

  div {
    display: inline-block;
    font-size: 1.3rem;
  }
  span {
    display: inline-block;
    font-size: 15px;
    color: darkgray;
  }
`;

const SlideTopic = () => {
  const [topicShopsInfo, setTopicShopsInfo] = useState([]);
  const [topicShopPics, setTopicShopPics] = useState([]);
  // console.log("주제별로 받아온 shop 테이블", topicShops);
  // console.log("주제별로 받아온 shop_pic 테이블", topicShopPics);

  useEffect(() => {
    axios
      .get(
        `https://ec2-54-198-156-106.compute-1.amazonaws.com:4000/topicshop/total_review`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setTopicShopsInfo(res.data.data.shopInfo);
        setTopicShopPics(res.data.data.shopPicInfos);
        console.log(res.data.data.shopInfo);
        console.log(res.data.data.shopPicInfos);
      });
  }, []);

  return (
    <SlideTopicContainer>
      <Title>평점이 높은 식당</Title>
      <SlideContainer>
        {topicShopsInfo.map((obj, i) => {
          return (
            <TopicShopList key={i}>
              <Link
                to={`/shopdetail/${obj.id}`}
                style={{ textDecoration: "none", color: "#533026" }}
              >
                <SlideTopicImage
                  src={topicShopPics[i]?.pic_URL}
                  alt={obj.shop_name}
                ></SlideTopicImage>
                <ShopName>
                  <div>
                    {obj.shop_name} <span>{obj.genus}</span>
                  </div>
                </ShopName>
              </Link>
            </TopicShopList>
          );
        })}
      </SlideContainer>
    </SlideTopicContainer>
  );
};

export default SlideTopic;
