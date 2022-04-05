import React, { useRef, useState } from "react";
import { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import LoadingIndicator from "../Loading/LoadingIndicator";

const SlideShopContainer = styled.div`
  margin-top: 30px;
  .mySwiper {
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
  // const shopDetailInfo = useSelector((state) => state.shopDetailInfo);
  // const shopInfo = useSelector((state) => state.shopInfo);
  // const shopPic = shopDetailInfo.map((el) => {
  //   return el.shoppic;
  // });
  const loading = useSelector((state) => state.loading);
  useEffect(() => {});
  const currentLocationShops = useSelector(
    (state) => state.currentLocationShops
  );
  const dispatch = useDispatch();
  // console.log(currentLocationShopPics);
  // console.log(currentLocationShops);
  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
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
            {currentLocationShops.map((obj, i) => {
              return (
                <SwiperSlide key={i}>
                  <Link to={`/shopdetail/${obj.shopinfo?.shop_id}`}>
                    <img
                      src={obj.shoppic?.photodatas[0]}
                      className="food-picture"
                    ></img>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </SlideShopContainer>
      )}
    </>
  );
}

export default SlideShop;
