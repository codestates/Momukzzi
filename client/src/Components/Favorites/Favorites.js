import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Provider, useSelector, useDispatch, connect } from "react-redux";
import { AiOutlineStar } from "react-icons/ai";
import { FaBlackberry, FaStar } from "react-icons/fa";
import { BsStar } from "react-icons/bs";
import { Link } from "react-router-dom";

const BackDropModal = styled.div`
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ExampleBody = styled.div`
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

const ButtonDiv = styled.div`
  display: flex;

  & > button {
    padding-top: 10px;
    padding-bottom: 10px;
    width: 50%;
    background-color: white;
    border: none;
  }
  .clicked {
    border-bottom: 3px solid #ffba34;
    color: #ffba34;
  }
`;

const InfoDiv = styled.div`
  display: flex;
  padding: 10px;

  & > img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    margin-right: 15px;
    flex-shrink: 0;
    cursor: pointer;
  }
  & > div {
    flex-grow: 1;
  }
  & > span {
    flex-shrink: 0;
    width: 30px;
  }
`;

const MenuScore = styled.div`
  & > span {
    margin-right: 5px;
  }
`;

const InfoContainer = styled.div`
  display: block;
`;

const Favorite = () => {
  // document.body.style.overflow = "hidden";
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
      console.log(shop.id, id);
      return shop.id === id;
    });
    console.log(filteredCookie);
    if (filteredCookie.length === 0) {
      console.log("hello");
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

          console.log("즐겨찾기 응답", res);
          console.log(JSON.parse(getCookie("bookmark")));
        });
    } else {
      console.log("hello");
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

          console.log("즐겨찾기 응답", res);
          console.log("쿠키", JSON.parse(getCookie("bookmark")));
        });
    }
  };
  console.log("방문한 페이지", visited);
  return (
    <BackDropModal
      onClick={() => {
        dispatch({ type: "favorite modal" });
      }}
    >
      <ExampleBody onClick={(e) => e.stopPropagation()}>
        <ButtonDiv>
          <button
            className={isBookMarkMenu ? "none" : "clicked"}
            onClick={() => {
              setIsBookMarkMenu(false);
            }}
          >
            최근 본 맛집
          </button>
          <button
            className={isBookMarkMenu ? "clicked" : "none"}
            onClick={() => {
              if (!localStorage.getItem("accessToken")) {
                dispatch({ type: "login modal" });
                return;
              } else {
                setIsBookMarkMenu(true);
              }
            }}
          >
            가고 싶다
          </button>
        </ButtonDiv>

        {isBookMarkMenu ? (
          <InfoContainer>
            {cookie.map((obj, i) => {
              return (
                <InfoDiv>
                  <img
                    src={obj.pic_URL}
                    alt="shop_pic"
                    onClick={() => {
                      window.location.replace(`/shopdetail/${obj.id}`);
                    }}
                  />
                  <div>
                    <MenuScore>
                      <span>{obj.shop_name}</span>
                      <span style={{ color: "#ffba34" }}>
                        {obj.star_avg?.toFixed(1)}
                      </span>
                    </MenuScore>
                    <span style={{ color: "grey", fontSize: 12 }}>
                      {obj.genus}
                    </span>
                  </div>
                  <span>
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
                  </span>
                </InfoDiv>
              );
            })}
          </InfoContainer>
        ) : (
          <InfoContainer>
            {visited.map((obj, i) => {
              return (
                <InfoDiv>
                  <img
                    src={obj.shop_pic}
                    onClick={() => {
                      window.location.replace(`/shopdetail/${obj.id}`);
                    }}
                    cursor="pointer"
                  />
                  <div>
                    <MenuScore>
                      <span>{obj.shop_name}</span>
                      <span style={{ color: "#ffba34" }}>
                        {obj.star_avg?.toFixed(1)}
                      </span>
                    </MenuScore>
                    <span style={{ color: "grey", fontSize: 12 }}>
                      {obj.genus}
                    </span>
                  </div>
                  <span>
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
                  </span>
                </InfoDiv>
              );
            })}
          </InfoContainer>
        )}
        {/* </FavoriteContainer> */}
      </ExampleBody>
    </BackDropModal>
  );
};

export default Favorite;
