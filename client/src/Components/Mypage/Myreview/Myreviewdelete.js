import React from "react";
import axios from "axios";
import { BsTrash } from "react-icons/bs";

const Myreviewdelete = ({ id }) => {
  const accessToken = localStorage.getItem("accessToken");

  const deleteModal = () => {
    if (window.confirm("정말 리뷰를 삭제하시겠습니까?")) {
      deleteHandler();
    } else {
      console.log("리뷰 취소하기");
    }
  };
  const deleteHandler = () => {
    if (!accessToken) {
      return;
    } else {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/reviews`,
          {
            data: {
              review_id: id,
            },
          },
          {
            headers: { authorization: `Bearer ${accessToken}` },
            "Content-Type": "application/json",
          }
        )
        .then((res) => {
          alert("리뷰가 삭제됐습니다.");
          return window.location.replace("/mypage");
        })
        .catch((err) => {
          console.error("리뷰삭제 에러", err);
        });
    }
  };
  return <BsTrash size="22" onClick={deleteModal} />;
};

export default Myreviewdelete;
