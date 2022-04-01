import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  ReviewBody,
  ReviewInputText,
  ReviewThumbnail,
  ReviewLabelButton,
} from "./Review.style";

const createArray = (length) => [...Array(length)];

const Star = ({ selected = false, handleSelect = (f) => f }) => {
  return <FaStar color={selected ? "orange" : "grey"} onClick={handleSelect} />;
};

export default function Review({ history, match }) {
  const [selectedStar, setSelectedStar] = useState(0);
  const [inputText, setInputText] = useState("");
  const [uploadImage, setUploadImage] = useState([]);
  const [thumbnailImage, setThumbnailImage] = useState([]);

  // const shopId = useSelector((state) => state.currentShopId);

  const handleInputText = (e) => {
    setInputText(e.target.value);
  };

  const onImageChange = (e) => {
    setThumbnailImage([
      ...thumbnailImage,
      URL.createObjectURL(e.target.files[0]),
    ]);
    setUploadImage([...uploadImage, e.target.files[0]]);
  };

  const uploadReview = () => {
    const reviewData = new FormData();
    reviewData.append("star", selectedStar);
    reviewData.append("comment", inputText);
    reviewData.append("shop_id", match.params.shop_id);
    uploadImage.map((item) => {
      return reviewData.append("img", item);
    });

    axios
      .post("https://localhost:4000/reviews", reviewData, {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log(res);
        alert("리뷰 작성이 완료되었습니다.");
        history.goBack();
      });
  };

  useEffect(() => {
    console.log(`리뷰 남길 가게 id = ${match.params.shop_id}`);
    console.log(`평점 : ${selectedStar}`);
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
  }, [selectedStar, thumbnailImage]);

  return (
    <ReviewBody>
      {/* 가게 이름 상태로 내려받기 */}
      <div>가게 이름에 대한 리뷰를 작성해주세요.</div>
      <div>
        평점
        {createArray(5).map((item, idx) => {
          return (
            <Star
              key={idx}
              selected={selectedStar > idx}
              handleSelect={() => {
                setSelectedStar(idx + 1);
              }}
            />
          );
        })}
      </div>
      <ReviewInputText onChange={handleInputText} />
      <ReviewThumbnail>
        {thumbnailImage.map((item, idx) => {
          return <img key={idx} src={item} />;
        })}
        <ReviewLabelButton htmlFor="upload_file">사진 업로드</ReviewLabelButton>
        <input
          type="file"
          id="upload_file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onImageChange}
        />
      </ReviewThumbnail>
      <div>
        <button
          onClick={() => {
            if (window.confirm("리뷰 작성을 취소하시겠습니까?")) {
              history.goBack();
            }
          }}
        >
          취소
        </button>

        <button onClick={uploadReview}>리뷰 올리기</button>
      </div>
    </ReviewBody>
  );
}
