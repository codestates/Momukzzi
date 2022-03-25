import React, { useState } from "react";
import {
  ShopImages,
  ShopBody,
  ShopBasicInfo,
  ShopBasicInfoHeader,
  ShopDetailInfo,
  ShopReview,
  ShopLocation,
  Buttons,
  ReviewButton,
  ReviewIcon,
  FavoriteButton,
} from "./ShopDetail.style";
import { useEffect } from "react";
import axios from "axios";
import dummyData from "../Mainpage/dummyData";
import ShopImageModal from "./ShopImageModal";

/*global kakao*/

export default function ShopDetail() {
  const [isOpen, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    // 카카오 map 객체 생성
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(37.63462628004234, 126.83257800122841),
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);
  }, []);

  const handleImageClick = (item, i) => {
    setOpen(true);
    setCurrentImage(i);
  };

  const handleStar = () => {
    // 즐겨찾기 true or false, 별모양 빈거/채워진거
    // axios.post()
    console.log("hello");
  };

  return (
    <>
      {isOpen ? (
        <ShopImageModal setOpen={setOpen} currentImage={currentImage} />
      ) : (
        <></>
      )}
      <ShopImages>
        {dummyData.map((item, i) => {
          return (
            <img
              key={i}
              src={item.img}
              onClick={() => handleImageClick(item, i)}
            />
          );
        })}
      </ShopImages>
      <ShopBody>
        <ShopBasicInfo>
          <ShopBasicInfoHeader>
            <span>가게이름</span>
            <span>평점</span>
            {/*클릭 시 리뷰 페이지로 이동*/}
            {/* <Link to="/"> */}
            <Buttons>
              <ReviewButton>
                <ReviewIcon />
                <span>리뷰</span>
              </ReviewButton>
              {/* </Link> */}

              {/*클릭 시 즐겨찾기 등록 or 해제 */}
              <FavoriteButton onClick={handleStar}>즐겨찾기</FavoriteButton>
            </Buttons>
          </ShopBasicInfoHeader>
          {/* table tag (th,td) 활용 */}
          <ShopDetailInfo>가게 상세 info</ShopDetailInfo>

          <ShopReview>
            리뷰들
            <div>안녕하세요</div>
            <div>리뷰1</div>
            <div>리뷰2</div>
            <div>리뷰3</div>
            <div>리뷰4</div>
          </ShopReview>
        </ShopBasicInfo>
        <ShopLocation id="map"></ShopLocation>
      </ShopBody>
    </>
  );
}
