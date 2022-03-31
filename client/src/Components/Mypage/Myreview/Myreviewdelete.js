import React, { useState, useEffect } from "react";
import axios from "axios";

const Myreviewdelete = () => {
  const accessToken = localStorage.getItem("accessToken");

  const [changeInfo, setchangeInfo] = useState({
    review_id: "",
  });
  const userInfoHandler = () => {
    if (!accessToken) {
      return;
    } else {
      axios
        .get("https://localhost:4000/users", {
          headers: { authorization: `Bearer ${accessToken}` },
          "Content-Type": "application/json",
        })
        .then((res) => {
          setchangeInfo(res.data.data.userInfo.reviews[0].id);
          console.log(
            "개인정보가져오기 성공",
            res.data.data.userInfo.reviews[0]
          );
        })
        .catch((err) => {
          console.log("개인가져오기 에러", err);
        });
    }
  };

  useEffect(() => {
    if (!accessToken) {
      return;
    } else {
      axios
        .get("https://localhost:4000/users", {
          headers: { authorization: `Bearer ${accessToken}` },
          "Content-Type": "application/json",
        })
        .then((res) => {
          setchangeInfo(res.data.data.userInfo.reviews[0].id);
          console.log(
            "개인정보가져오기 성공",
            res.data.data.userInfo.reviews[0]
          );
        })
        .catch((err) => {
          console.log("개인가져오기 에러", err);
        });
    }
  }, []);

  const deleteModal = () => {
    if (window.confirm("정말 리뷰를 삭제하시겠습니까?")) {
      deleteHandler();
    } else {
      console.log("리뷰 취소하기");
    }
  };
  const deleteHandler = () => {
    const { review_id } = changeInfo;

    if (!accessToken) {
      return;
    } else {
      axios
        .delete(
          "https://localhost:4000/reviews",
          {
            review_id,
          },
          {
            headers: { authorization: `Bearer ${accessToken}` },
            "Content-Type": "application/json",
          }
        )
        .then((res) => {
          console.log("리뷰삭제");
          alert("리뷰가 삭제됐습니다.");
        })
        .catch((err) => {
          console.log("리뷰삭제 에러", err);
          // alert("잘못된 요청입니다");
        });
    }
  };
  return (
    <div className="deleteBtn">
      <button onClick={deleteModal}>x</button>
    </div>
  );
};

export default Myreviewdelete;
