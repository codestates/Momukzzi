/* global kakao */

import react, { useEffect, useState, Suspense } from "react";
import { Carousel } from "react-bootstrap";
import styled from "styled-components";
import Slider from "react-slick";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Grid, Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Provider,
  useSelector,
  useDispatch,
  connect,
  shallowEqual,
} from "react-redux";
import { put } from "redux-saga/effects";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { type } from "@testing-library/user-event/dist/type";
import dummyKakaoShops from "../../dummy/dummyKakaoShops";
import SlideShop from "../Mainpage/SlideShop";
import LoadingIndicator from "../Loading/LoadingIndicator";

const ExampleBody = styled.div`
  width: 50%;
  min-height: calc(100vh - 106px);
  margin: 0 auto;
`;

const ExampleTitle = styled.div`
  display: flex;
  padding: 20px 0px 20px 0px;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  & > span {
    padding: 0px 20px 0px 20px;
    font-size: 32px;
    font-weight: bold;
  }
`;

const ExampleImage = styled.div`
  width: 50%;
  margin: 0 auto;
  padding-bottom: 30px;
`;

const ExampleInfo = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  border-top: 1px solid gainsboro;
  min-height: calc(100vh - 625px);
  padding-top: 30px;

  .menu {
    width: 60%;
    padding: 0px 20px 10px 0px;
    & > table > tbody {
      display: table-row-group;
      vertical-align: middle;
      border-color: inherit;
    }

    & > table > tbody > tr {
      display: table-row;
      vertical-align: inherit;
      border-color: inherit;
    }

    & > table > tbody > tr > th {
      width: 110px;
      font-size: 16px;
      color: rgba(79, 79, 79, 0.6);
      line-height: 1.7;
      text-align: left;
      vertical-align: top;
      padding-right: 10px;
      padding-bottom: 5px;
    }

    & > table > tbody > tr > td {
      font-size: 16px;
      color: #4f4f4f;
      line-height: 1.7;
      text-align: left;
      vertical-align: middle;
      padding-bottom: 5px;
    }
  }
  .map {
    width: 40%;
  }
`;

const ExampleOtherButton = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  padding-bottom: 35px;
  & > button {
    width: 250px;
    height: 50px;
    background: #ffba34;
    border-radius: 30px;
    border: none;
    color: white;
    font-weight: bold;
  }

  .other {
    margin-right: 50px;
  }
  .bottomScroll {
    margin-left: 50px;
  }
`;

const Intro = () => {
  const loading = useSelector((state) => state.loading);
  const [randomInt, setRandomInt] = useState(0);

  const dispatch = useDispatch();

  const currentLocationShops = useSelector(
    (state) => state.currentLocationShops
  );

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    function getLocation() {
      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          function (position) {
            dispatch({ type: "loading", data: true });
            dispatch({ type: "loading_modal", data: true });
            axios
              .get(
                `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=FD6&page=1&size=15&sort=accuracy&x=${position.coords.longitude}&y=${position.coords.latitude}&radius=2000`,
                {
                  headers: {
                    Authorization: `KakaoAK ${process.env.REACT_APP_REST_API_KEY}`,
                  },
                }
              )
              .then((res) => {
                // console.log(res.data.documents);

                axios
                  .post(
                    `${process.env.REACT_APP_API_URL}/data`,
                    { data: res.data.documents },
                    {
                      withCredentials: true,
                    }
                  )
                  .then((res) => {
                    console.log(res);

                    dispatch({
                      type: "current_location_shops",
                      data: res.data.data.result,
                    });
                    dispatch({ type: "loading", data: false });
                    dispatch({ type: "loading_modal", data: false });
                    return res;
                  })
                  .then((res) => {
                    setRandomInt(getRandomInt(0, res.data.data.result.length));
                  });
              });
          },
          function (error) {
            console.error(error);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      } else {
        alert("GPS를 지원하지 않습니다");
      }
    }
    getLocation();
  }, []);

  useEffect(() => {
    // const y = Number(res.data.data.result[randomInt].shopinfo.shopinfo.x);
    // const x = Number(res.data.data.result[randomInt].shopinfo.shopinfo.y);
    // console.log(x, y);
    if (!loading) {
      const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(
          parseFloat(currentLocationShops[randomInt].shopinfo?.shopinfo.y),
          parseFloat(currentLocationShops[randomInt].shopinfo?.shopinfo.x)
        ), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      // 마커가 표시될 위치입니다
      var markerPosition = new kakao.maps.LatLng(
        parseFloat(currentLocationShops[randomInt].shopinfo?.shopinfo.y),
        parseFloat(currentLocationShops[randomInt].shopinfo?.shopinfo.x)
      );

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);

      // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
      // marker.setMap(null);
    }
  }, [randomInt]);

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <ExampleBody>
          <ExampleTitle>
            오늘은
            <Link
              to={`/shopdetail/${currentLocationShops[randomInt].shopinfo.shop_id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <span
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  fontSize: 32,
                  fontWeight: "bold",
                }}
              >
                {currentLocationShops[randomInt].shopinfo?.shopinfo.place_name}
              </span>
            </Link>
            어떠세요?
          </ExampleTitle>
          <ExampleImage>
            <Carousel>
              {currentLocationShops[randomInt].shoppic?.photodatas.map(
                (img) => {
                  return (
                    <Carousel.Item>
                      <img width="100%" height="300" src={img} />
                    </Carousel.Item>
                  );
                }
              )}
            </Carousel>
          </ExampleImage>

          <ExampleInfo>
            <div className="menu">
              <table>
                <tbody>
                  <tr>
                    <th>주소</th>
                    <td>
                      {
                        currentLocationShops[randomInt].shopinfo?.shopinfo
                          .address_name
                      }
                    </td>
                  </tr>
                  <tr>
                    <th>음식 종류</th>
                    <td>
                      {
                        currentLocationShops[
                          randomInt
                        ].shopinfo?.shopinfo?.category_name.split(">")[
                          currentLocationShops[
                            randomInt
                          ].shopinfo?.shopinfo?.category_name.split(">")
                            .length - 1
                        ]
                      }
                    </td>
                  </tr>
                  <tr>
                    <th>메뉴</th>
                    <td>
                      <ul style={{ margin: 0, padding: 0 }}>
                        {currentLocationShops[randomInt].menulist?.menulist
                          .slice(0, 6)
                          .filter((menu, i) => {
                            return menu[0] !== null;
                          })
                          .map((menu, i) => {
                            return <li key={i}>{`${menu[0]} - ${menu[1]}`}</li>;
                          })}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div id="map" style={{ width: "400px", height: "300px" }}></div>
          </ExampleInfo>
          <ExampleOtherButton>
            <button
              className="other"
              onClick={() => {
                setRandomInt(getRandomInt(0, currentLocationShops.length));
              }}
            >
              다른 메뉴 추천받기
            </button>
            <button
              className="bottomScroll"
              onClick={() => {
                window.scrollTo({ top: 1000, behavior: "smooth" });
              }}
            >
              더 많은 정보 보기
            </button>
          </ExampleOtherButton>
        </ExampleBody>
      )}
    </>
  );
};

export default Intro;
