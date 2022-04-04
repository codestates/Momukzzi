import styled from "styled-components";

export const ReviewBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 300px 300px;
`;

export const ReviewShopName = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

export const ReviewInputText = styled.textarea.attrs({
  placeholder: "이곳에 리뷰를 작성해주세요.",
})`
  resize: none;
  width: 100%;
  height: 300px;
`;

export const ReviewThumbnail = styled.div`
  margin: 10px 0 0 0;
  width: 100%;
  height: 100px;
  display: flex;
  & > img {
    width: 80px;
    height: 80px;
    border: 1px solid black;
    margin: 5px;
  }
`;

export const ReviewLabelButton = styled.label`
  padding: 6px 6px;
  background-color: #ff6600;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  width: 100px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;
