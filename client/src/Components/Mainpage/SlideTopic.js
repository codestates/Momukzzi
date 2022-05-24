import react, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// Import Swiper React components

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules

import axios from "axios";

const SlideTopicContainer = styled.div`
  width: 80%;
  height: 100%;
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
  width: 100%;
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

const ShopTitle = styled.div`
  height: 100px;
  text-align: center;
`;

const ShopName = styled.div`
  display: inline-block;
  font-size: 1.3rem;
`;
const ShopGenus = styled.span`
  display: inline-block;
  font-size: 15px;
  color: darkgray;
`;

const SlideTopic = () => {
  const [topicShopsInfo, setTopicShopsInfo] = useState([]);
  const [topicShopPics, setTopicShopPics] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/topicshop/total_review`, {
        withCredentials: true,
      })
      .then((res) => {
        setTopicShopsInfo(res.data.data.shopInfo);
        setTopicShopPics(res.data.data.shopPicInfos);
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
                <ShopTitle>
                  <ShopName>
                    {obj.shop_name} <ShopGenus>{obj.genus}</ShopGenus>
                  </ShopName>
                </ShopTitle>
              </Link>
            </TopicShopList>
          );
        })}
      </SlideContainer>
    </SlideTopicContainer>
  );
};

export default SlideTopic;
