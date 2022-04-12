import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsStar } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import localShopInfo from "../../dummy/localShopInfo";
import dummyKakaoShops from "../../dummy/dummyKakaoShops";
import LoadingIndicator from "../Loading/LoadingIndicator";

const Container = styled.div``;

const EditorPickHeader = styled.div`
  height: 200px;

  text-align: center;
  background-color: whitesmoke;

  div {
    height: 25%;
    line-height: 130px;
  }
  #name {
    font-size: 2.5rem;
  }
  #description {
    font-size: 1.3rem;
    color: rgba(0, 0, 0, 0.3);
  }
`;

const ShopComponent = styled.div`
  display: flex;
  width: 800px;
  height: 300px;
  border-bottom:solid 2px gainsboro ;
  
  margin: 15px auto;
  
  
  .shop_info1 {
    position:relative ;
    width: 300px;
    height: 300px;
  }
  .shop_info2{
   
    width: 500px;
  }
  img {
    width: 90%;
    height: 90%;
    position:absolute ;
    top : 5%;
    left: 5%;
  }
  .review {
   border-top:solid 2px gainsboro ;
    height: 200px ;
    display: flex ;
     padding: 15px 0 0 15px;
  }
  .review > #nickname {
    font-weight:700 ;
    margin-right : 10px;
  }
  .review > #comment
  {
  
  }
  .shop_name {
    text-align:center ;
    height: 100px;
    display: flex ;
    justify-content:space-between ;
  }

  #favorite {
    text-align: right ;
    
    cursor: pointer;
  }
  .staricon{
    font-size:40px;
    margin: 10px;
  }
  
}
`;

const ShopName = styled.div`
  div {
    text-align: center;
    width: 430px;

    margin-top: 10px;
  }

  #name {
    font-size: 1.3rem;
  }
  #address {
    color: rgba(0, 0, 0, 0.3);
  }
`;
const EditorPick = ({ match }) => {
  const dispatch = useDispatch();
  const y = match.params.code.split(",")[0];
  const x = match.params.code.split(",")[1];
  const name = match.params.code.split(",")[2];
  const description = match.params.code.split(",")[3];
  const [shops, setShops] = useState([]);
  const [shopManyReviews, setShopManyReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch({ type: "loading_modal", data: true });
    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=FD6&page=1&size=15&sort=accuracy&x=${x}&y=${y}&radius=2000`,
        {
          headers: {
            Authorization: "KakaoAK 2af87592ef59bb8f2f504dc1544a0a89",
          },
        }
      )
      .then((res) => {
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/data`,
            { data: res.data.documents },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            // console.log(res);

            setShops(res.data.data.result);
            const shopIds = res.data.data.result.map((obj) => {
              return obj.shopinfo.shop_id;
            });
            console.log("sdfsd", shopIds);
            axios
              .post(
                `${process.env.REACT_APP_API_URL}/shopmanyreviews`,
                {
                  shop_ids: shopIds,
                },
                {
                  withCredentials: true,
                }
              )
              .then((res) => {
                console.log(res);
                setShopManyReviews(res.data.data);
                setIsLoading(false);
                dispatch({ type: "loading_modal", data: false });
              });
          });
      });
  }, []);

  // console.log(topicShops);
  // console.log(shopManyReviews);

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
          console.log(JSON.parse(getCookie("bookmark")));
        });
    }
  };
  // console.log("current", currentLocationShops);
  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <Container>
          <EditorPickHeader>
            <div id="name">{name}</div>
            <div id="description">{description}</div>
          </EditorPickHeader>

          {shops.map((obj, i) => {
            return (
              <ShopComponent>
                <div className="shop_info1">
                  <Link to={`/shopdetail/${obj.shopinfo.shop_id}`}>
                    <img src={obj.shoppic.photodatas[0]} />
                  </Link>
                </div>
                <div className="shop_info2">
                  <div className="shop_name">
                    <ShopName>
                      <Link
                        to={`/shopdetail/${obj.shopinfo.shop_id}`}
                        style={{ textDecoration: "none", color: "#555555" }}
                      >
                        <div id="name">{`${i + 1}. ${
                          obj.shopinfo.shopinfo.place_name
                        }`}</div>
                      </Link>
                      <div id="address">
                        {obj.shopinfo.shopinfo.address_name}
                      </div>
                    </ShopName>

                    <div
                      id="favorite"
                      onClick={(e) => {
                        if (!localStorage.getItem("accessToken")) {
                          dispatch({ type: "login modal" });
                        } else {
                          handleStar(obj.shopinfo.shop_id);
                        }
                      }}
                    >
                      {isAddedBookmark(obj.shopinfo.shop_id) ? (
                        <FaStar
                          style={{ color: "#ffba34" }}
                          className="staricon"
                        ></FaStar>
                      ) : (
                        <BsStar
                          style={{ color: "gainsboro" }}
                          className="staricon"
                        />
                      )}
                    </div>
                  </div>
                  <div className="review">
                    <div id="nickname">{shopManyReviews[i][1]?.nickname}</div>
                    <div id="comment">{shopManyReviews[i][0]?.comment}</div>
                  </div>
                </div>
              </ShopComponent>
            );
          })}
        </Container>
      )}
    </>
  );
};

export default EditorPick;
