import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
      font-family: 'Roboto', sans-serif;
      margin: 0;
      padding: 0;
  }

  body {
      box-sizing: border-box;
  }
`;

export const ShopHeader = styled.div`
  height: 50px;
  text-align: center;
  border: 1px solid blue;
  margin: 0px 0px 5px 0px;
`;

export const ShopImages = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  border: 1px solid red;
  overflow: auto;

  & > img {
    position: relative;
    margin: 5px 5px 5px 0px;
    width: 33%;
  }
`;

export const ShopBody = styled.div`
  height: auto;
  border: 1px solid brown;
  margin: 0px 0px 5px 0px;
  display: flex;
`;

export const ShopBasicInfo = styled.div`
  border: 1px solid brown;
  width: 70%;
  height: auto;
`;

export const ShopBasicInfoHeader = styled.div`
  border: 1px solid black;
  margin: 5px 5px;
  height: 100px;
  display: flex;
  align-items: center;

  & > span {
    margin-right: 10px;
  }
`;

export const Buttons = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  .favoriteButton {
    display: block;
    width: 35px;
    height: 35px;
  }
  .reviewButton {
    display: block;
    width: 35px;
    height: 35px;
  }
`;

export const ReviewButton = styled.button`
  appearance: none;
  cursor: pointer;
  border: 0px;
  border-radius: 0;
  background-color: transparent;
  & > span {
    font-size: 12px;
  }
  .on {
    color: yellow;
  }
`;

export const ShopDetailInfo = styled.div`
  border: 1px solid black;
  margin: 5px 5px;
  min-height: 200px;
`;

export const ShopReview = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin: 5px 5px;
  height: auto;
`;

export const ShopEachReview = styled.div`
  border: 1px solid blue;
  margin: 5px 5px;
  min-height: 50px;
`;

export const ShopReviewPlusButton = styled.button`
  margin: 5px 5px;
  width: 98%;
  border: none;
  background-color: white;
`;

export const ShopLocation = styled.div`
  border: 1px solid black;
  margin: 5px 5px;
  width: 30%;
  height: 400px;
`;
