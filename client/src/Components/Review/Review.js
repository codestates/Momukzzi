import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import axios from "axios";
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

export default function Review() {
  const [selectedStar, setSelectedStar] = useState(0);
  const [inputText, setInputText] = useState("");
  const [uploadImage, setUploadImage] = useState([]);
  const [thumbnailImage, setThumbnailImage] = useState([]);

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
    reviewData.append("text", inputText);
    uploadImage.map((item) => {
      return reviewData.append("img", item);
    });

    axios
      .post("https://localhost:4000/reviews", reviewData)
      .then((res) => console.log(res));
  };

  useEffect(() => {
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
        <Link to="/">
          <button>취소</button>
        </Link>
        <button onClick={uploadReview}>리뷰 올리기</button>
      </div>
    </ReviewBody>
  );
}
