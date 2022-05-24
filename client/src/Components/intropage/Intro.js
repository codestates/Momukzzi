/* global kakao */

import react, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import styled from "styled-components";

// Import Swiper React components

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import LocationLoading from "../Loading/LocationLoading";

const RecommenedShopContainer = styled.div`
  width: 60%;
  min-height: calc(100vh - 106px);
  margin: 0 auto;
`;

const ShopTitle = styled.div`
  display: flex;
  padding: 20px 0;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ShopName = styled.span`
  padding: 0px 20px 0px 20px;
  font-size: 32px;
  font-weight: bold;
`;

const ShopImageContainer = styled.div`
  width: 400px;
  margin: 0 auto;
  padding-bottom: 30px;
`;

const ShopImage = styled.img`
  width: 100%;
  height: 300px;
`;

const RecommendShopInfo = styled.div`
  display: flex;
  border-top: 1px solid gainsboro;
  min-height: calc(100vh - 800px);
  padding-top: 30px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ShopMenu = styled.div`
  width: 400px;
  margin: 0 0 0 auto;
`;

const ShopMenuDetailContainer = styled.div`
  display: flex;
`;

const ShopMenuDetail1 = styled.div`
  width: 120px;
  font-size: 16px;
  color: rgba(79, 79, 79, 0.6);
  line-height: 1.7;
  text-align: left;
  vertical-align: top;
  padding-right: 10px;
  padding-bottom: 5px;
`;
const ShopMenuDetail2 = styled(ShopMenuDetail1)`
  width: 280px;
  font-size: 16px;
  color: #4f4f4f;
  line-height: 1.7;
  text-align: left;
  vertical-align: middle;
  padding-bottom: 5px;
  list-style-type: none;
  @media screen and (max-width: 768px) {
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  padding-bottom: 35px;
`;

const OtherMenuButton = styled.button`
  width: 250px;
  height: 50px;
  background: #ffba34;
  border-radius: 30px;
  border: none;
  color: white;
  font-weight: bold;
  margin-right: 50px;
`;

const ScrollButton = styled.button`
  width: 250px;
  height: 50px;
  background: #ffba34;
  border-radius: 30px;
  border: none;
  color: white;
  font-weight: bold;
  margin-left: 50px;
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
<<<<<<< HEAD
=======
                console.log(res.data.documents);

>>>>>>> 3c1aa55e765ccb78bf7236a0785c182ffeaf2b74
                axios
                  .post(
                    `${process.env.REACT_APP_API_URL}/data`,
                    { data: res.data.documents },
                    {
                      withCredentials: true,
                    }
                  )
                  .then((res) => {
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
                  })
                  .catch((err) => {});
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
        <LocationLoading />
      ) : (
        <RecommenedShopContainer>
          <ShopTitle>
            오늘은
            <Link
              to={`/shopdetail/${currentLocationShops[randomInt].shopinfo.shop_id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ShopName>
                {currentLocationShops[randomInt].shopinfo?.shopinfo.place_name}
              </ShopName>
            </Link>
            어떠세요?
          </ShopTitle>
          <ShopImageContainer>
            <Carousel>
              {currentLocationShops[randomInt].shoppic?.photodatas.map(
                (img) => {
                  return (
                    <Carousel.Item>
                      <ShopImage src={img} />
                    </Carousel.Item>
                  );
                }
              )}
            </Carousel>
          </ShopImageContainer>

          <RecommendShopInfo>
            <ShopMenu>
              <ShopMenuDetailContainer>
                <ShopMenuDetail1>주소</ShopMenuDetail1>
                <ShopMenuDetail2>
                  {
                    currentLocationShops[randomInt].shopinfo?.shopinfo
                      .address_name
                  }
                </ShopMenuDetail2>
              </ShopMenuDetailContainer>
              <ShopMenuDetailContainer>
                <ShopMenuDetail1>음식 종류</ShopMenuDetail1>
                <ShopMenuDetail2>
                  {
                    currentLocationShops[
                      randomInt
                    ].shopinfo?.shopinfo?.category_name.split(">")[
                      currentLocationShops[
                        randomInt
                      ].shopinfo?.shopinfo?.category_name.split(">").length - 1
                    ]
                  }
                </ShopMenuDetail2>
              </ShopMenuDetailContainer>
              <ShopMenuDetailContainer>
                <ShopMenuDetail1>메뉴</ShopMenuDetail1>
                <ShopMenuDetail2>
                  {currentLocationShops[randomInt].menulist?.menulist
                    .slice(0, 6)
                    .filter((menu, i) => {
                      return menu[0] !== null;
                    })
                    .map((menu, i) => {
                      return <li key={i}>{`${menu[0]} - ${menu[1]}`}</li>;
                    })}
                </ShopMenuDetail2>
              </ShopMenuDetailContainer>
            </ShopMenu>
            <div
              id="map"
              style={{
                width: "300px",
                height: "300px",
                margin: "0 auto",
              }}
            ></div>
          </RecommendShopInfo>
          <ButtonContainer>
            <OtherMenuButton
              className="other"
              onClick={() => {
                setRandomInt(getRandomInt(0, currentLocationShops.length));
              }}
            >
              다른 메뉴 추천받기
            </OtherMenuButton>
            <ScrollButton
              className="bottomScroll"
              onClick={() => {
                window.scrollTo({ top: 1000, behavior: "smooth" });
              }}
            >
              더 많은 정보 보기
            </ScrollButton>
          </ButtonContainer>
        </RecommenedShopContainer>
      )}
    </>
  );
};

export default Intro;
