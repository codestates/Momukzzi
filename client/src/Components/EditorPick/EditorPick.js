import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsStar } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LoadingIndicator2 from "../Loading/LoadingIndicator2";

const Container = styled.div``;

const EditorPickHeader = styled.div`
  height: 200px;
  text-align: center;
  background-color: whitesmoke;

  div {
    height: 25%;
    line-height: 130px;
  }
`;

const EditorPickTitle = styled.div`
  font-size: 2.5rem;
`;

const EditorPickDescription = styled.div`
  font-size: 1.3rem;
  color: rgba(0, 0, 0, 0.3);
`;

const ShopComponent = styled.div`
  display: flex;
  width: 800px;
  height: 300px;
  border-bottom:solid 2px gainsboro ;
  margin: 15px auto;

  .staricon{
    font-size:40px;
    margin: 10px;
  }
  
}
`;

const NickName = styled.div`
  font-weight: 700;
  margin-right: 10px;
`;

const Comment = styled.div``;

const ShopReviewContainer = styled.div`
  border-top: solid 2px gainsboro;
  height: 200px;
  display: flex;
  padding: 15px 0 0 15px;
`;

const Favorite = styled.div`
  text-align: right;

  cursor: pointer;
`;

const ShopPhotoContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
`;

const ShopPhoto = styled.img`
  width: 90%;
  height: 90%;
  position: absolute;
  top: 5%;
  left: 5%;
`;

const ShopInfoContainer = styled.div`
  width: 500px;
`;

const ShopTitleContainer = styled.div`
  text-align: center;
  height: 100px;
  display: flex;
  justify-content: space-between;
`;

const ShopTitle = styled.div`
  div {
    text-align: center;
    width: 430px;

    margin-top: 10px;
  }
`;

const ShopName = styled.div`
  font-size: 1.3rem;
`;

const ShopAddress = styled.div`
  color: rgba(0, 0, 0, 0.3);
`;
const EditorPick = ({ match }) => {
  const dispatch = useDispatch();
  const y = match.params.code.split(",")[0];
  const x = match.params.code.split(",")[1];
  const editorPickTitle = match.params.code.split(",")[2];
  const editorPickDescription = match.params.code.split(",")[3];
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
            Authorization: `KakaoAK ${process.env.REACT_APP_REST_API_KEY}`,
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
            setShops(res.data.data.result);
            const shopIds = res.data.data.result.map((obj) => {
              return obj.shopinfo.shop_id;
            });
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
                setShopManyReviews(res.data.data);
                setIsLoading(false);
                dispatch({ type: "loading_modal", data: false });
              });
          })
          .catch((err) => {
            window.location.replace(window.location.pathname);
          });
      });
  }, []);

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
    <>
      {isLoading ? (
        <LoadingIndicator2 />
      ) : (
        <Container>
          <EditorPickHeader>
            <EditorPickTitle>{editorPickTitle}</EditorPickTitle>
            <EditorPickDescription>
              {editorPickDescription}
            </EditorPickDescription>
          </EditorPickHeader>

          {shops.map((obj, i) => {
            return (
              <ShopComponent>
                <ShopPhotoContainer>
                  <Link to={`/shopdetail/${obj.shopinfo.shop_id}`}>
                    <ShopPhoto
                      src={
                        obj.shoppic.photodatas[0] ||
                        "https://media.istockphoto.com/vectors/no-photo-available-vector-icon-default-image-symbol-picture-coming-vector-id1354776450?k=20&m=1354776450&s=612x612&w=0&h=hnTHv1X0Fu4viDTpJmBoJipQwoslNJbzVuF8IqI9vgY="
                      }
                    />
                  </Link>
                </ShopPhotoContainer>
                <ShopInfoContainer>
                  <ShopTitleContainer>
                    <ShopTitle>
                      <Link
                        to={`/shopdetail/${obj.shopinfo.shop_id}`}
                        style={{ textDecoration: "none", color: "#555555" }}
                      >
                        <ShopName>{`${i + 1}. ${
                          obj.shopinfo.shopinfo.place_name
                        }`}</ShopName>
                      </Link>
                      <ShopAddress>
                        {obj.shopinfo.shopinfo.address_name}
                      </ShopAddress>
                    </ShopTitle>
                    <Favorite
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
                    </Favorite>
                  </ShopTitleContainer>
                  <ShopReviewContainer>
                    <NickName>{shopManyReviews[i][1]?.nickname}</NickName>
                    <Comment>{shopManyReviews[i][0]?.comment}</Comment>
                  </ShopReviewContainer>
                </ShopInfoContainer>
              </ShopComponent>
            );
          })}
        </Container>
      )}
    </>
  );
};

export default EditorPick;
