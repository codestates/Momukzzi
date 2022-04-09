import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsStar, BsPersonCircle } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import ShopImageModal from "./ShopImageModal";
import ReviewPhotoModal from "./ReviewPhotoModal";
import Loader from "./Loader";
import {
  ShopImages,
  ShopBody,
  ShopBasicInfo,
  ShopBasicInfoHeader,
  ShopDetailInfo,
  ShopReviewHeader,
  ShopReview,
  ShopEachReview,
  ShopReviewPlusButton,
  ShopLocation,
  Buttons,
  ReviewButton,
  ShopReviewUserPart,
  ShopReviewCommentPart,
} from "./ShopDetail.style";
import { useDispatch } from "react-redux";
import { MdWavingHand } from "react-icons/md";

/*global kakao*/

const createArray = (length) => [...Array(length)];

const Star = ({ selected = false }) => {
  return (
    <FaStar
      color={selected ? "#ffba34" : "grey"}
      style={{ width: 16, height: 16 }}
    />
  );
};

export default function ShopDetail({ match }) {
  const [isOpen, setOpen] = useState(false); // 음식점 이미지 Modal
  const [isReviewOpen, setReviewOpen] = useState(false); // 리뷰 업로드 사진 Modal
  const [currentImage, setCurrentImage] = useState("");
  const [currentReview, setCurrentReview] = useState(0);
  const [info, setInfo] = useState({ shop_pics: [], menus: [], reviews: [] });

  const [isLoaded, setIsLoaded] = useState(false);
  const [reviewCount, setReviewCount] = useState(4);

  const [bookmark, setBookmark] = useState(false);

  const dispatch = useDispatch();

  const handleImageClick = (idx) => {
    setOpen(true);
    setCurrentImage(idx);
  };

  const handleReviewClick = (idx) => {
    setReviewOpen(true);
    setCurrentReview(idx);
  };

  const getCookie = function (name) {
    var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return value ? decodeURIComponent(value[2]) : null;
  };

  const handleStar = () => {
    // 즐겨찾기 bookmark 상태변수 true or false, 별모양 빈거/채워진거
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/bookmark`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          shop_id: match.params.id,
          bookmark: bookmark,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (
          res.data.message === "add success" ||
          res.data.message === "remove success"
        ) {
          setBookmark(!bookmark);
        } else if (res.data.message === "not authorized") {
          dispatch({ type: "login modal" });
        }

        console.log("즐겨찾기 응답", res);
        console.log(JSON.parse(getCookie("bookmark")));
      });
  };

  const handleReviewButton = () => {
    if (!localStorage.getItem("accessToken")) {
      dispatch({ type: "login modal" });
    } else window.location.replace(`/review/${match.params.id}`);
  };

  const handleReviewPlus = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setReviewCount(reviewCount + 4);
    setIsLoaded(false);
  };

  useEffect(() => {
    const cookie = JSON.parse(getCookie("bookmark"));
    if (cookie) {
      for (let i = 0; i < cookie.length; i++) {
        if (cookie[i].id === Number(match.params.id)) {
          setBookmark(true);
        }
      }
    }
    console.log(cookie);

    // match.params.id 활용
    axios
      .get(`${process.env.REACT_APP_API_URL}/shops/${match.params.id}`)
      .then((res) => {
        // 방문한페이지 추가하는 로직 추가----------------------------
        if (
          window.location.href.includes(
            `${process.env.REACT_APP_CLIENT_URL}/shopdetail`
          )
        ) {
          const visited = JSON.parse(localStorage.getItem("visited"));
          let alreadyVisited = false;

          visited.forEach((e) => {
            if (e.id === Number(match.params.id)) {
              alreadyVisited = true;
            }
          });

          if (!alreadyVisited) {
            visited.unshift({
              shop_pic: res.data.data.targetshop.shop_pics[0]?.pic_URL,
              shop_name: res.data.data.targetshop.shop_name,
              location: res.data.data.targetshop.location,
              genus: res.data.data.targetshop.genus,
              id: res.data.data.targetshop.id,
              star_avg: res.data.data.targetshop.star_avg,
            });
            localStorage.setItem("visited", JSON.stringify(visited));
          }
        }

        setInfo(res.data.data.targetshop);
        console.log(res.data.data.targetshop);

        // dispatch({
        //   type: "current_shop_name",
        //   payload: {
        //     shop_name: res.data.data.targetshop.shop_name,
        //   },
        // });

        return res.data.data.targetshop;
      })
      // KAKAO map api and marker
      .then((res) => {
        var container = document.getElementById("map");
        var options = {
          center: new kakao.maps.LatLng(res.y, res.x),
          level: 4,
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
        <ShopBasicInfoHeader>
          <span
            style={{
              marginLeft: 30,
              marginRight: 15,
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            {info.shop_name}
          </span>
          <span style={{ fontSize: 24, fontWeight: "bold", color: "red" }}>
            {!info.star_avg ? "0.0" : info.star_avg?.toFixed(1)}
          </span>
          <Buttons>
            <ReviewButton onClick={handleReviewButton}>
              <BiMessageDetail className="reviewButton" color="gainsboro" />
              <span>리뷰쓰기</span>
            </ReviewButton>

            <ReviewButton>
              {bookmark ? (
                <FaStar
                  className="favoriteButton"
                  onClick={handleStar}
                  color="#ffba34"
                />
              ) : (
                <BsStar
                  className="favoriteButton"
                  onClick={handleStar}
                  color="gainsboro"
                />
              )}
              <span>즐겨찾기</span>
            </ReviewButton>
          </Buttons>
        </ShopBasicInfoHeader>

        <ShopBasicInfo>
          <ShopDetailInfo>
            <table>
              <tbody>
                <tr>
                  <th>주소</th>
                  <td>{info.location}</td>
                </tr>
                <tr>
                  <th>음식 종류</th>
                  <td> {info.genus}</td>
                </tr>
                <tr>
                  <th>영업시간</th>
                  <td>{info.work_time}</td>
                </tr>
                <tr>
                  <th>휴일</th>
                  {info.holiday ? <td>{info.holiday}</td> : <td>정보 없음</td>}
                </tr>
                <tr>
                  <th>메뉴</th>
                  <td>
                    <ul style={{ margin: 0, padding: 0 }}>
                      {info.menus.map((item) => {
                        return (
                          <li>
                            {item.menu_name} : {item.price}원
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </ShopDetailInfo>
          <ShopLocation id="map"></ShopLocation>
        </ShopBasicInfo>
        {!info.total_review ? (
          ""
        ) : (
          <ShopReviewHeader>리뷰 ( {info.total_review} )</ShopReviewHeader>
        )}

        <ShopReview>
          {info.reviews.length !== 0 ? (
            info.reviews.slice(0, reviewCount).map((el, idx) => {
              return (
                <ShopEachReview
                  key={idx}
                  onClick={() => {
                    if (el.review_pics.length === 0) {
                      console.log("업로드된 사진 없음");
                    } else handleReviewClick(idx);
                  }}
                >
                  <ShopReviewUserPart>
                    <BsPersonCircle className="userIcon" />
                    <span>{el.user.nickname}</span>
                  </ShopReviewUserPart>

                  <ShopReviewCommentPart>
                    <div
                      style={{
                        height: 30,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ color: "grey", marginRight: 10 }}>
                        {el.updatedAt.slice(0, 10)}
                      </span>
                      {createArray(5).map((item, idx) => {
                        return <Star key={idx} selected={el.star > idx} />;
                      })}
                    </div>
                    <div style={{ marginTop: 15, minHeight: 80 }}>
                      {el.comment}
                    </div>
                    <div>
                      {el.review_pics.map((picArr, idx) => {
                        return (
                          <img
                            key={idx}
                            src={picArr.pic_URL}
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: 4,
                              marginRight: 5,
                              marginTop: 20,
                            }}
                          />
                        );
                      })}
                    </div>
                  </ShopReviewCommentPart>
                </ShopEachReview>
              );
            })
          ) : (
            <div style={{ marginLeft: 30 }}>등록된 리뷰가 없습니다.</div>
          )}
          {isLoaded ? (
            <Loader />
          ) : (
            <ShopReviewPlusButton onClick={handleReviewPlus}>
              {reviewCount < info.total_review ? "더 보기" : " "}
            </ShopReviewPlusButton>
          )}
        </ShopReview>
      </ShopBody>
    </>
  );
}
