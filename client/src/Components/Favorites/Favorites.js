import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Provider, useSelector, useDispatch, connect } from "react-redux";
import { AiOutlineStar } from "react-icons/ai";
import { FaBlackberry } from "react-icons/fa";
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
const FavoriteContainer = styled.div`
  background-color: white;
  width: 320px;
  height: 500px;
  border: 1px solid black;
  position: absolute;
  top: 70px;
  right: 10px;
`;

const FavoriteHeader = styled.div`
  display: flex;
  height: 50px;
  border-bottom: 1px solid black;
  align-items: center;
  > div {
    display: inline-block;
    text-align: center;
    flex: 1 1 auto;
    cursor: pointer;
  }
`;

const FavoriteBody = styled.div`
  height: 390px;
`;

const FavoriteContent = styled.div`
  display: flex;
  border: 1px solid black;
  height: 80px;
  > div {
    flex: 1 1 auto;
  }
  img {
    width: 60px;
    height: 60px;
  }
  .favorite-shopinfo {
    line-height: 35px;
  }
  #icon-container {
    position: relative;
    cursor: pointer;
  }
  .staricon {
    position: absolute;
    font-size: 40px;
    color: gainsboro;
    top: 10px;
    right: 5px;
  }
  .on {
    color: yellow;
  }
`;

const Favorite = () => {
  // document.body.style.overflow = "hidden";
  const dispatch = useDispatch();
  const visited = JSON.parse(localStorage.getItem("visited"));
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
          "https://localhost:4000/bookmark",
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
            e.target.classname = "staricon on";
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
          "https://localhost:4000/bookmark",
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
            e.target.classname = "staricon";
            setCookie(JSON.parse(getCookie("bookmark")));
          } else if (res.data.message === "not authorized") {
            dispatch({ type: "login modal" });
          }

          console.log("즐겨찾기 응답", res);
          console.log(JSON.parse(getCookie("bookmark")));
        });
    }
  };

  return (
    <BackDropModal
      onClick={() => {
        dispatch({ type: "favorite modal" });
      }}
    >
      <FavoriteContainer onClick={(e) => e.stopPropagation()}>
        <FavoriteHeader>
          <div
            onClick={() => {
              setIsBookMarkMenu(false);
            }}
          >
            최근 본 맛집
          </div>
          <div
            onClick={() => {
              if (!cookie) {
                dispatch({ type: "login modal" });
                return;
              }
              setIsBookMarkMenu(true);
            }}
          >
            가고 싶다
          </div>
        </FavoriteHeader>
        {isBookMarkMenu ? (
          <FavoriteBody>
            {cookie.map((obj, i) => {
              return (
                <FavoriteContent key={i}>
                  <div>
                    <Link
                      to={`/shopdetail/${obj.id}`}
                      onClick={() => {
                        window.location.replace(`/shopdetail/${obj.id}`);
                      }}
                    >
                      <img src={obj.pic_URL} alt="shop_pic" />
                    </Link>
                  </div>
                  <div>
                    <div className="favorite-shopinfo">
                      {obj.shop_name} - {obj.genus}
                    </div>
                    <div className="favorite-shopinfo">{obj.location}</div>
                  </div>
                  <div
                    id="icon-container"
                    onClick={(e) => {
                      if (!localStorage.getItem("accessToken")) {
                        dispatch({ type: "login modal" });
                      } else {
                        handleStar(obj.id, e);
                      }
                    }}
                  >
                    <AiOutlineStar className="staricon on" />
                  </div>
                </FavoriteContent>
              );
            })}
          </FavoriteBody>
        ) : (
          <FavoriteBody>
            {visited.map((obj, i) => {
              return (
                <FavoriteContent key={i}>
                  <div
                    onClick={() => {
                      window.location.replace(`/shopdetail/${obj.id}`);
                    }}
                  >
                    <img src={obj.shop_pic}></img>
                  </div>
                  <div>
                    <div className="favorite-shopinfo">
                      {obj.shop_name} - {obj.genus}
                    </div>
                    <div className="favorite-shopinfo">{obj.location}</div>
                  </div>
                  <div
                    id="icon-container"
                    onClick={(e) => {
                      if (!localStorage.getItem("accessToken")) {
                        dispatch({ type: "login modal" });
                      } else {
                        handleStar(obj.id, e);
                      }
                    }}
                  >
                    <AiOutlineStar
                      className={
                        isAddedBookmark(obj.id) ? "staricon on" : "staricon"
                      }
                    />
                  </div>
                </FavoriteContent>
              );
            })}
          </FavoriteBody>
        )}
      </FavoriteContainer>
    </BackDropModal>
  );
};

export default Favorite;
