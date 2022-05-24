import React, { useState, useEffect } from "react";
import axios from "axios";
import Myreviewlist from "./Myreviewlist";
import { Styled } from "./style";
import Emptyreview from "./Emptyreview";
import MoreviewLoader from "./MoreviewLoader";

function Myreview() {
  const [userReview, setUserReview] = useState([]);

  const accessToken = localStorage.getItem("accessToken");

  const getReviewHandler = () => {
    if (!accessToken) {
      return;
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/users`, {
          headers: { authorization: `Bearer ${accessToken}` },
          "Content-Type": "application/json",
        })
        .then((res) => {
          setUserReview(res.data.data.userInfo.reviews);
          console.log("개인정보가져오기 성공");
        })
        .catch((err) => {
          console.log("개인가져오기 에러", err);
        });
    }
  };
  useEffect(() => {
    getReviewHandler();
  }, []);

  let newUserReview = [...userReview];

  const [isLoaded, setIsLoaded] = useState(false);
  const [reviewCount, setReviewCount] = useState(4);

  const handleReviewMore = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setReviewCount(reviewCount + 4);
    setIsLoaded(false);
  };
  useEffect(() => {}, [reviewCount]);

  return (
    <Styled.ReviewContainer>
      {newUserReview.length !== 0 ? (
        newUserReview.slice(0, reviewCount).map((el, i) => {
          return (
            <Myreviewlist
              id={el.id}
              comment={el.comment.slice(0, 25)}
              createdAt={el.createdAt.slice(0, 10)}
              shop_name={el.shop.shop_name}
              star={el.star}
              pic={el.review_pics[0]?.pic_URL}
            />
          );
        })
      ) : (
        <Emptyreview />
      )}
      {isLoaded ? (
        <MoreviewLoader />
      ) : (
        <Styled.ShopReviewPlusButton onClick={handleReviewMore}>
          {reviewCount < newUserReview.length ? "더 보기" : " "}
        </Styled.ShopReviewPlusButton>
      )}
    </Styled.ReviewContainer>
  );
}

export default Myreview;
