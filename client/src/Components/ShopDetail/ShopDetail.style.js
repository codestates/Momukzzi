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
  width: 70%;
  height: 250px;
  display: flex;
  flex-direction: row;
  border: 1px solid red;
  overflow: auto;
  margin: 0 auto;

  & > img {
    position: relative;
    margin: 5px 5px 5px 0px;
    width: 300px;
    object-fit: cover;
  }
`;

export const ShopBody = styled.div`
  width: 100%;
  height: auto;
  margin: 10px 0px 10px 0px;
  display: flex-row;
`;

export const ShopBasicInfoHeader = styled.div`
  margin: 0 auto;
  width: 70%;
  height: 100px;
  display: flex;
  align-items: center;
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
`;

export const ShopBasicInfo = styled.div`
  width: 70%;
  height: auto;
  min-height: 400px;
  display: flex;
  margin: 0 auto;
`;

export const ShopDetailInfo = styled.div`
  margin: 30px 0px 30px 30px;
  min-height: 200px;
  width: 60%;

  & > table > tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }

  & > table > tbody > tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }

  & > table > tbody > tr > th {
    width: 110px;
    font-size: 0.9rem;
    color: rgba(79, 79, 79, 0.6);
    line-height: 1.7;
    text-align: left;
    vertical-align: top;
    padding-right: 10px;
    padding-bottom: 5px;
  }

  & > table > tbody > tr > td {
    font-size: 0.9rem;
    color: #4f4f4f;
    line-height: 1.7;
    text-align: left;
    vertical-align: middle;
    padding-bottom: 5px;
  }
`;

export const ShopLocation = styled.div`
  border: 1px solid black;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 40%;
  height: auto;
`;

export const ShopReview = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin: 0 auto;
  width: 70%;
  height: auto;
`;

export const ShopEachReview = styled.div`
  border: 1px solid blue;
  padding-left: 30px;
  padding-top: 5px;
  min-height: 100px;
  display: flex;

  .userIcon {
    width: 32px;
    height: 32px;
  }
`;

export const ShopReviewUserPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > span {
    display: flex-row;
  }
`;

export const ShopReviewCommentPart = styled.div`
  padding-left: 100px;
`;

export const ShopReviewPlusButton = styled.button`
  margin: 5px 5px;
  width: 98%;
  border: none;
  background-color: white;
`;
