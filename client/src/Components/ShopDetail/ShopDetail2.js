import React, { memo, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsStar } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import ShopImageModal from "./ShopImageModal";
import ReviewPhotoModal from "./ReviewPhotoModal";
import Loader from "./Loader";
import {
  ShopImages,
  ShopBody,
  ShopBasicInfo,
  ShopBasicInfoHeader,
  ShopDetailInfo,
  ShopReview,
  ShopEachReview,
  ShopReviewPlusButton,
  ShopLocation,
  Buttons,
  ReviewButton,
} from "./ShopDetail.style";
import { useDispatch } from "react-redux";

/*global kakao*/

export default function ShopDetail({ match }) {
  const [isOpen, setOpen] = useState(false); // 음식점 이미지 Modal
  const [isReviewOpen, setReviewOpen] = useState(false); // 리뷰 업로드 사진 Modal
  const [currentImage, setCurrentImage] = useState("");
  const [currentReview, setCurrentReview] = useState(0);
  const [info, setInfo] = useState({ shop_pics: [], menus: [], reviews: [] });

  const [isLoaded, setIsLoaded] = useState(false);
  const [reviewCount, setReviewCount] = useState(4);

  const dispatch = useDispatch();

  const handleImageClick = (idx) => {
    setOpen(true);
    setCurrentImage(idx);
  };

  const handleReviewClick = (idx) => {
    setReviewOpen(true);
    setCurrentReview(idx);
  };

  const handleStar = () => {
    // 즐겨찾기 true or false, 별모양 빈거/채워진거
    // axios.post()
    console.log("hello");
  };

  const handleReviewPlus = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setReviewCount(reviewCount + 4);
    setIsLoaded(false);
  };

  useEffect(() => {
    console.log(reviewCount);
  }, [reviewCount]);

  useEffect(() => {
    // match.params.id 활용
    axios
      .get(`https://localhost:4000/shops2/${match.params.id}`)
      .then((res) => {
        // 방문한페이지 추가하는 로직 추가----------------------------
        if (
          window.location.href.includes("https://localhost:3000/shopdetail")
        ) {
          const visited = JSON.parse(localStorage.getItem("visited"));
          let alreadyVisited = false;

          visited.forEach((e) => {
            if (e.id === info.id) {
              alreadyVisited = true;
            }
          });

          if (!alreadyVisited) {
            visited.push({
              shop_pic: res.data.data.targetshop.shop_pics[0].pic_URL,
              shop_name: res.data.data.targetshop.shop_name,
              location: res.data.data.targetshop.location,
              genus: res.data.data.targetshop.genus,
              id: res.data.data.targetshop.id,
            });
            localStorage.setItem("visited", JSON.stringify(visited));
            console.log(JSON.stringify(visited));
          }
        }
        // -------------------------------------------------
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
      {isReviewOpen ? (
        <ReviewPhotoModal
          setReviewOpen={setReviewOpen}
          imageSet={info.reviews[currentReview].review_pics}
        />
      ) : (
        <></>
      )}
      <ShopImages>
        {info.shop_pics.map((item, idx) => {
          return (
            <img
              key={idx}
              src={item.pic_URL}
              onClick={() => handleImageClick(idx)}
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
                  <BiMessageDetail className="reviewButton" />
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
            {info.reviews.length !== 0
              ? info.reviews.slice(0, reviewCount).map((item, idx) => {
                  return (
                    <ShopEachReview
                      key={idx}
                      style={{ height: 30 }}
                      onClick={() => handleReviewClick(idx)}
                    >
                      아이디 : {item.user_id}
                      코멘트 : {item.comment}
                      평점 : {item.star}
                    </ShopEachReview>
                  );
                })
              : "리뷰 없음"}
            {isLoaded ? (
              <Loader />
            ) : (
              <ShopReviewPlusButton onClick={handleReviewPlus}>
                더 보기
              </ShopReviewPlusButton>
            )}
          </ShopReview>
        </ShopBasicInfo>
        <ShopLocation id="map"></ShopLocation>
      </ShopBody>
    </>
  );
}