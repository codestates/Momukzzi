import styled from "styled-components";

export const ReviewBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding-top: 200px;
  margin: 0 auto;
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
  border: 1px solid grey;
`;

export const ReviewThumbnail = styled.div`
  margin: 10px 0 0 0;
  width: 100%;
  height: 100px;
  display: flex;
  & > img {
    width: 100px;
    height: 100px;
    border-radius: 4px;
    border: 1px solid grey;
    margin-right: 5px;
  }
`;

export const ReviewLabelButton = styled.label`
  padding: 6px 6px;
  background-color: white;
  border-radius: 4px;
  color: black;
  border: 1px dotted grey;
  font-size: 24px;
  cursor: pointer;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ReviewSubmitButtonDiv = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 100px;
  display: flex;

  & > button {
    padding: 6px 6px;
    background-color: #ff6600;
    border-radius: 4px;
    border: none;
    color: white;
    cursor: pointer;
    width: 100px;
    height: 50px;
  }
  .cancel {
    margin-left: auto;
    margin-right: 5px;
  }
  .submit {
  }
`;
