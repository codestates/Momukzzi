import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { BsStar } from "react-icons/bs";

const BackDropModal = styled.div`
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const FavoritesContainer = styled.div`
  position: absolute;
  top: 70px;
  right: 10px;
  display: flex;
  flex-direction: column;
  max-width: 320px;
  min-width: 320px;
  min-height: 500px;
  max-height: 500px;
  margin: 0 auto;
  border-radius: 5px;
  overflow: auto;
  background-color: white;
`;

const FavoritesSubject = styled.div`
  display: flex;
  .clicked {
    border-bottom: 3px solid #ffba34;
    color: #ffba34;
  }
`;

const RecentlyViewedPage = styled.button`
  padding-top: 10px;
  padding-bottom: 10px;
  width: 50%;
  background-color: white;
  border: none;
`;

const PlaceWantToGo = styled.button`
  padding-top: 10px;
  padding-bottom: 10px;
  width: 50%;
  background-color: white;
  border: none;
`;

const InfoDiv = styled.div`
  display: flex;
  padding: 10px;
`;

const BookMark = styled.div`
  width: 30px;
`;

const ShopTitle = styled.div`
  flex: 1 1 auto;
`;

const ShopImg = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  margin-right: 15px;
  flex-shrink: 0;
  cursor: pointer;
`;

const Title = styled.div``;

const ShopName = styled.span`
  margin-right: 5px;
`;
const StarAvg = styled.span`
  margin-right: 5px;
  color: #ffba34;
`;

const ShopGenus = styled.div`
  color: grey;
  font-size: 13px;
`;

const InfoContainer = styled.div`
  display: block;
`;

const Favorite = () => {
  const dispatch = useDispatch();
  const visited = JSON.parse(localStorage.getItem("visited")).slice(0, 9);
  const [isBookMarkMenu, setIsBookMarkMenu] = useState(false);

  const getCookie = function (name) {
    var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return value ? decodeURIComponent(value[2]) : null;
  };
  const [cookie, setCookie] = useState(JSON.parse(getCookie("bookmark")));
  const isAddedBookmark = (id) => {
    let result = false;
    if (!cookie) {
      return;
    }
    for (let i = 0; i < cookie.length; i++) {
      if (id === cookie[i].id) {
        result = true;
      }
    }
    return result;
  };
  const handleStar = (id, e) => {
    const filteredCookie = cookie.filter((shop) => {
      return shop.id === id;
    });

    if (filteredCookie.length === 0) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/bookmark`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            shop_id: id,
            bookmark: false,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data.message === "add success") {
            setCookie(JSON.parse(getCookie("bookmark")));
          } else if (res.data.message === "not authorized") {
            dispatch({ type: "login modal" });
          }
        });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/bookmark`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            shop_id: id,
            bookmark: true,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.data.message === "remove success") {
            setCookie(JSON.parse(getCookie("bookmark")));
          } else if (res.data.message === "not authorized") {
            dispatch({ type: "login modal" });
          }
        });
    }
  };

  return (
    <BackDropModal
      onClick={() => {
        dispatch({ type: "favorite modal" });
      }}
    >
      {/* ????????? ???????????? ?????? ??????????????? ??????????????? ???????????? ????????? ??? stopPropagation??? ?????? ??????????????? ?????????????
      -> ???????????? ?????????????????? ????????? ??????. ????????? ???????????? ??????????????? ?????? ??????????????? ???????????? ?????????(?????? ????????? ?????????)??? 
      ????????? ????????? ????????? ???????????? ????????? ??? ????????? ?????? ?????????????????? ????????? ???????????? ??????????????? ?????????. */}
      <FavoritesContainer onClick={(e) => e.stopPropagation()}>
        {/* ?????? ??? ??????, ?????? ?????? ?????? ?????????????????? ???????????? ????????? ????????? ???????????? ?????? ???????????????, ????????? */}
        <FavoritesSubject>
          <RecentlyViewedPage
            className={isBookMarkMenu ? "" : "clicked"}
            onClick={() => {
              setIsBookMarkMenu(false);
            }}
          >
            ?????? ??? ??????
          </RecentlyViewedPage>
          <PlaceWantToGo
            className={isBookMarkMenu ? "clicked" : ""}
            onClick={() => {
              if (!localStorage.getItem("accessToken")) {
                dispatch({ type: "login modal" });
                return;
              } else {
                setIsBookMarkMenu(true);
              }
            }}
          >
            ?????? ??????
          </PlaceWantToGo>
        </FavoritesSubject>

        {isBookMarkMenu ? (
          <InfoContainer>
            {cookie
              .filter((obj) => {
                return obj !== null;
              })
              .map((obj, i) => {
                return (
                  <InfoDiv>
                    <ShopImg
                      src={obj.pic_URL}
                      alt="shop_pic"
                      onClick={() => {
                        window.location.replace(`/shopdetail/${obj.id}`);
                      }}
                    />
                    <ShopTitle>
                      <Title>
                        <ShopName>{obj.shop_name}</ShopName>
                        <StarAvg>{obj.star_avg?.toFixed(1)}</StarAvg>
                      </Title>
                      <ShopGenus>{obj.genus}</ShopGenus>
                    </ShopTitle>
                    <BookMark>
                      <FaStar
                        color="#ffba34"
                        style={{
                          width: 30,
                          height: 30,
                        }}
                        onClick={(e) => {
                          if (!localStorage.getItem("accessToken")) {
                            dispatch({ type: "login modal" });
                          } else {
                            handleStar(obj.id, e);
                          }
                        }}
                        cursor="pointer"
                      />
                    </BookMark>
                  </InfoDiv>
                );
              })}
          </InfoContainer>
        ) : (
          <InfoContainer>
            {visited.map((obj, i) => {
              return (
                <InfoDiv>
                  <ShopImg
                    src={obj.shop_pic}
                    onClick={() => {
                      window.location.replace(`/shopdetail/${obj.id}`);
                    }}
                    cursor="pointer"
                  />
                  <ShopTitle>
                    <Title>
                      <ShopName>{obj.shop_name}</ShopName>
                      <StarAvg>{obj.star_avg?.toFixed(1)}</StarAvg>
                    </Title>
                    <ShopGenus>{obj.genus}</ShopGenus>
                  </ShopTitle>
                  <BookMark>
                    {isAddedBookmark(obj.id) ? (
                      <FaStar
                        style={{
                          width: 30,
                          height: 30,
                        }}
                        onClick={(e) => {
                          if (!localStorage.getItem("accessToken")) {
                            dispatch({ type: "login modal" });
                          } else {
                            handleStar(obj.id);
                          }
                        }}
                        color="#ffba34"
                        cursor="pointer"
                      />
                    ) : (
                      <BsStar
                        style={{
                          width: 30,
                          height: 30,
                        }}
                        onClick={(e) => {
                          if (!localStorage.getItem("accessToken")) {
                            dispatch({ type: "login modal" });
                          } else {
                            handleStar(obj.id);
                          }
                        }}
                        color="gainsboro"
                        cursor="pointer"
                      />
                    )}
                  </BookMark>
                </InfoDiv>
              );
            })}
          </InfoContainer>
        )}
        {/* </FavoriteContainer> */}
      </FavoritesContainer>
    </BackDropModal>
  );
};

export default Favorite;
