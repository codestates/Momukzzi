import React from "react";
import styled from "styled-components";
import dummyData from "../Mainpage/dummyData";
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

// const ImageModalView = styled.div`
//   border-radius: 10px;
//   background-color: rgba(0, 0, 0, 0.5);
//   width: 70%;
//   height: 70%;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   > img {
//     object-fit: cover;
//     width: 80%;
//     height: 80%;
//   }

//   > ul {
//     display: flex;
//   }
// `;

// const ImageModalList = styled.li`
//   width: 100px;
//   height: 100px;
//   > img {
//     position: relative;
//     width: 50px;
//     height: 50px;
//   }
// `;

export default function ShopImageModal({ setOpen, currentImage }) {
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
          {dummyData.map((item, i) => {
            return (
              <SwiperSlide key={i} style={{ overflow: "hidden" }}>
                <div className="swiper-zoom-container">
                  <img src={item.img} style={{ width: "80%", height: "80%" }} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </ImageModalBackdrop>
    </>
  );
}
