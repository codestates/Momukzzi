import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Zoom, Navigation, Pagination } from "swiper";

const ImageModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
`;

export default function ShopImageModal({ setOpen, currentImage, imageSet }) {
  const BackgroundClick = (e) => {
    const clicked = e.target.closest(".swiper");
    if (clicked) return;
    else setOpen(false);
  };
  return (
    <>
      <ImageModalBackdrop onClick={BackgroundClick}>
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
            width: "70%",
            height: "70%",
            borderRadius: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          zoom={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Zoom, Navigation, Pagination]}
          className="mySwiper"
          initialSlide={currentImage}
        >
          {imageSet.map((item, i) => {
            return (
              <SwiperSlide key={i} style={{ overflow: "hidden" }}>
                <div className="swiper-zoom-container">
                  <img
                    src={item.pic_URL}
                    style={{ width: "80%", height: "80%" }}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </ImageModalBackdrop>
    </>
  );
}
