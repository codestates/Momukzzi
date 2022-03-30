import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsStar } from "react-icons/bs";
import Review from "../Review/Review";
import ShopImageModal from "./ShopImageModal";
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
import { useDispatch, useSelector } from "react-redux";

/*global kakao*/

export default function ShopDetail({ match }) {
  const [isOpen, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [info, setInfo] = useState({ shop_pics: [], menus: [], reviews: [] });

  let reviewCount = 5;

  // const shopInfo = useSelector((state) => state.shopInfo);

  const handleImageClick = (item, i) => {
    setOpen(true);
    setCurrentImage(i);
  };

  const handleStar = () => {
    // 즐겨찾기 true or false, 별모양 빈거/채워진거
    // axios.post()
    console.log("hello");
  };
  const dispatch = useDispatch();

  useEffect(() => {
    // match.params.id 활용
    axios
      .get(`https://localhost:4000/shops/${match.params.id}`)
      .then((res) => {
        setInfo(res.data.data.targetshop);
        console.log(res.data.data.targetshop);
        dispatch({
          type: "current_shop_id",
          payload: {
            shopId: res.data.data.targetshop.id,
          },
        });
        return res.data.data.targetshop;
      })
      // KAKAO map api and marker
      .then((res) => {
        var container = document.getElementById("map");
        var options = {
          center: new kakao.maps.LatLng(res.y, res.x),
          level: 3,
        };
        var map = new kakao.maps.Map(container, options);

        // 마커가 표시될 위치입니다
        var markerPosition = new kakao.maps.LatLng(res.y, res.x);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          position: markerPosition,
          clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
        var iwContent = `<div style="padding:5px;">${res.shop_name}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "click", function () {
          // 마커 위에 인포윈도우를 표시합니다
          infowindow.open(map, marker);
        });
      });
  }, []);

  return (
    <>
      {isOpen ? (
        <ShopImageModal
          setOpen={setOpen}
          currentImage={currentImage}
          imageSet={info.shop_pics}
        />
      ) : (
        <></>
      )}
      <ShopImages>
        {info.shop_pics.map((item, i) => {
          return (
            <img
              key={i}
              src={item.pic_URL}
              onClick={() => handleImageClick(item, i)}
            />
          );
        })}
      </ShopImages>
      <ShopBody>
        <ShopBasicInfo>
          <ShopBasicInfoHeader>
            <span>가게 이름 : {info.shop_name}</span>
            <span>평점 : {info.star_avg}</span>
            <Buttons>
              <Link to="/review">
                <ReviewButton>
                  <ReviewIcon />
                  <span>리뷰</span>
                </ReviewButton>
              </Link>

              {/*클릭 시 즐겨찾기 등록 or 해제 */}
              <ReviewButton>
                <BsStar className="favoriteButton" onClick={handleStar} />
                <span>즐겨찾기</span>
              </ReviewButton>
            </Buttons>
          </ShopBasicInfoHeader>
          <ShopDetailInfo>
            <ul>
              <li>주소 : {info.location}</li>
              <li>음식 종류 : {info.genus}</li>
              <li>영업시간 : {info.work_time}</li>
              <li>휴일 : {info.holiday}</li>
              <li>
                {info.menus.map((item) => {
                  return (
                    <div>
                      {item.menu_name} 가격은 {item.price}
                    </div>
                  );
                })}
              </li>
            </ul>
          </ShopDetailInfo>

          <ShopReview>
            {info.reviews === []
              ? info.reviews.map((item, idx) => {
                  return (
                    <div key={idx} style={{ height: 30 }}>
                      아이디 : {item.user_id}
                      코멘트 : {item.comment}
                      평점 : {item.star}
                    </div>
                  );
                })
              : "리뷰 없음"}
          </ShopReview>
        </ShopBasicInfo>
        <ShopLocation id="map"></ShopLocation>
      </ShopBody>
    </>
  );
}
