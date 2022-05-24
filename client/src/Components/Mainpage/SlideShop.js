import React from "react";
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
import { useSelector } from "react-redux";

const SlideShopContainer = styled.div`
  margin-top: 30px;

  .mySwiper {
    margin: 0 auto;
    width: 100%;
    height: 320px;
  }

  .swiper-slide {
    text-align: center;
    font-size: 1.3rem;
  }
  width: 80%;
  margin: 0 auto;
  margin-bottom: 30px;
  font-size: 25px;

  justify-content: space-between;
`;

const Title = styled.div`
  height: 50px;

  font-size: 1.5rem;
  color: #ffba34;
`;
const ShopTitle = styled.div`
  height: 100px;
`;
const ShopName = styled.div``;
const ShopGenus = styled.span`
  font-size: 15px;
  color: darkgray;
`;
const SlideImage = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 10px;
`;

function SlideShop() {
  const loading = useSelector((state) => state.loading);
  useEffect(() => {});
  const currentLocationShops = useSelector(
    (state) => state.currentLocationShops
  );
  console.log(currentLocationShops);
  return (
    <>
      {loading ? (
        ""
      ) : (
        <SlideShopContainer>
          <Title>내 주변 음식점 추천</Title>
          <Swiper
            slidesPerView={3}
            slidesPerGroup={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Grid, Pagination, Navigation]}
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
            {currentLocationShops.map((obj, i) => {
              return (
                <SwiperSlide key={i}>
                  <Link
                    to={`/shopdetail/${obj.shopinfo?.shop_id}`}
                    style={{ textDecoration: "none", color: "#533026" }}
                  >
                    <SlideImage
                      src={
                        obj.shoppic?.photodatas[0] ||
                        "https://media.istockphoto.com/vectors/no-photo-available-vector-icon-default-image-symbol-picture-coming-vector-id1354776450?k=20&m=1354776450&s=612x612&w=0&h=hnTHv1X0Fu4viDTpJmBoJipQwoslNJbzVuF8IqI9vgY="
                      }
                      alt="shopimage"
                    />
                    <ShopTitle>
                      <ShopName>
                        {obj.shopinfo.shopinfo.place_name}{" "}
                        <ShopGenus>
                          {
                            obj.shopinfo.shopinfo.category_name.split(">")[
                              obj.shopinfo.shopinfo.category_name.split(">")
                                .length - 1
                            ]
                          }
                        </ShopGenus>
                      </ShopName>
                    </ShopTitle>
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
