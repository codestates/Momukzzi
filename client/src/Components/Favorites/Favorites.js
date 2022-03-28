import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Provider, useSelector, useDispatch, connect } from "react-redux";
import { AiOutlineStar } from "react-icons/ai";

const BackDropModal = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;
const FavoriteContainer = styled.div`
  background-color: white;
  width: 320px;
  height: 500px;
  border: 1px solid black;
  position: absolute;
  top: 70px;
  right: 10px;
`;

const FavoriteHeader = styled.div`
  display: flex;
  height: 50px;
  border-bottom: 1px solid black;
  align-items: center;
  > div {
    display: inline-block;
    text-align: center;
    flex: 1 1 auto;
  }
`;

const FavoriteBody = styled.div`
  height: 390px;
`;

const FavoriteContent = styled.div`
  display: flex;
  border: 1px solid black;
  height: 80px;
  > div {
    flex: 1 1 auto;
  }
  img {
    width: 60px;
    height: 60px;
  }
  .favorite-shopinfo {
    line-height: 35px;
  }
  #icon-container {
    position: relative;
  }
  .staricon {
    position: absolute;
    font-size: 40px;
    color: gainsboro;
    top: 10px;
    right: 5px;
  }
`;

const Favorite = () => {
  const dispatch = useDispatch();
  return (
    <BackDropModal
      onClick={() => {
        dispatch({ type: "favorite modal" });
      }}
    >
      <FavoriteContainer onClick={(e) => e.stopPropagation()}>
        <FavoriteHeader>
          <div>최근 본 맛집</div>
          <div>가고 싶다</div>
        </FavoriteHeader>
        <FavoriteBody>
          <FavoriteContent>
            <div>
              <img src="https://src.hidoc.co.kr/image/lib/2019/6/12/20190612112121719_0.jpg"></img>
            </div>
            <div>
              <div className="favorite-shopinfo">설빙 서울중앙대점</div>
              <div className="favorite-shopinfo">서대문구 - 디저트</div>
            </div>
            <div id="icon-container">
              <AiOutlineStar className="staricon" />
            </div>
          </FavoriteContent>
          <FavoriteContent>
            <div>
              <img src="https://src.hidoc.co.kr/image/lib/2019/6/12/20190612112121719_0.jpg"></img>
            </div>
            <div>
              <div className="favorite-shopinfo">설빙 서울중앙대점</div>
              <div className="favorite-shopinfo">서대문구 - 디저트</div>
            </div>
            <div id="icon-container">
              <AiOutlineStar className="staricon" />
            </div>
          </FavoriteContent>
          <FavoriteContent>
            <div>
              <img src="https://src.hidoc.co.kr/image/lib/2019/6/12/20190612112121719_0.jpg"></img>
            </div>
            <div>
              <div className="favorite-shopinfo">설빙 서울중앙대점</div>
              <div className="favorite-shopinfo">서대문구 - 디저트</div>
            </div>
            <div id="icon-container">
              <AiOutlineStar className="staricon" />
            </div>
          </FavoriteContent>
          <FavoriteContent>
            <div>
              <img src="https://src.hidoc.co.kr/image/lib/2019/6/12/20190612112121719_0.jpg"></img>
            </div>
            <div>
              <div className="favorite-shopinfo">설빙 서울중앙대점</div>
              <div className="favorite-shopinfo">서대문구 - 디저트</div>
            </div>
            <div id="icon-container">
              <AiOutlineStar className="staricon" />
            </div>
          </FavoriteContent>
          <FavoriteContent>
            <div>
              <img src="https://src.hidoc.co.kr/image/lib/2019/6/12/20190612112121719_0.jpg"></img>
            </div>
            <div>
              <div className="favorite-shopinfo">설빙 서울중앙대점</div>
              <div className="favorite-shopinfo">서대문구 - 디저트</div>
            </div>
            <div id="icon-container">
              <AiOutlineStar className="staricon" />
            </div>
          </FavoriteContent>
        </FavoriteBody>
      </FavoriteContainer>
    </BackDropModal>
  );
};

export default Favorite;
