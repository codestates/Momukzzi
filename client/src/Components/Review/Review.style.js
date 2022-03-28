import styled from "styled-components";

export const ReviewBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 300px 300px;
`;

export const ReviewInputText = styled.textarea.attrs({
  placeholder: "이곳에 리뷰를 작성해주세요.",
})`
  resize: none;
  width: 80%;
  height: 300px;
`;

export const ReviewThumbnail = styled.div`
  margin: 10px 0 0 0;
  width: 80%;
  height: 100px;
  display: flex;
  & > img {
    width: 50px;
    height: 50px;
  }
`;

export const ReviewLabelButton = styled.label`
  padding: 6px 6px;
  background-color: #ff6600;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  width: 50px;
  height: 50px;
`;
