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
import { useSelector } from "react-redux";
import axios from "axios";

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
  const shopDetailInfo = useSelector((state) => state.shopDetailInfo);
  const shopInfo = useSelector((state) => state.shopInfo);
  const shopPic = shopDetailInfo.map((el) => {
    return el.shoppic;
  });

  // useEffect(() => {
  //   axios.get('',{
  //     idArr : shopInfo.map((el) => el.id)
  //   },{
  //     withCredentials: true
  //   })
  // },[])

  console.log(shopInfo);
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
        {shopPic.map((el, i) => {
          return (
            <SwiperSlide>
              <Link to={`/shopdetail/${i}`}>
                <img src={el[0]} className="food-picture"></img>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SlideShopContainer>
  );
}

export default SlideShop;
