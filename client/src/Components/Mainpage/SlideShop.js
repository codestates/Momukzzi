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
    margin: 0 auto;
    width: 1600px;
    height: 700px;
  }

  .swiper-slide {
    text-align: center;
    font-size: 1.3rem;
    height: calc((100% - 30px) / 2) !important;
  }
  img {
    width: 100%;
    height: 80%;
    border-radius: 10px;
  }
`;

const Title = styled.div`
  height: 50px;
  margin-left: 6%;
  font-size: 1.5rem;
  color: #ffba34;
`;
const ShopName = styled.div`
  height: 100px;
  div {
    text-decoration: none;
  }
  span {
    font-size: 15px;
    color: darkgray;
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
  console.log(currentLocationShops);
  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <SlideShopContainer>
          <Title>내 주변 음식점 추천</Title>
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
                  <Link
                    to={`/shopdetail/${obj.shopinfo?.shop_id}`}
                    style={{ textDecoration: "none", color: "#533026" }}
                  >
                    <img src={obj.shoppic?.photodatas[0]}></img>
                    <ShopName>
                      <div>
                        {obj.shopinfo.shopinfo.place_name}{" "}
                        <span>
                          {
                            obj.shopinfo.shopinfo.category_name.split(">")[
                              obj.shopinfo.shopinfo.category_name.split(">")
                                .length - 1
                            ]
                          }
                        </span>
                      </div>
                    </ShopName>
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
