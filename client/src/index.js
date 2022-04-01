import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { createStore } from "redux";
import {
  Provider,
  useSelector,
  useDispatch,
  connect,
  shallowEqual,
} from "react-redux";
import dummyShops from "./dummy/dummyShops";
import dummyShopPics from "./dummy/dummyShopPics";

const initialState = {
  isLogInOpen: false,
  isSignUpOpen: false,
  isFavoriteModal: false,
  currentLocationShops: dummyShops,
  currentLocationShopPics: dummyShopPics,
  topicShops: dummyShops,
  topicShopPics: dummyShopPics,
  currentShopId: 0,
};

function reducer(currentState = initialState, action) {
  const newState = { ...currentState };
  if (action.type === "login modal") {
    newState.isLogInOpen = !newState.isLogInOpen;
  } else if (action.type === "signup modal") {
    newState.isSignUpOpen = !newState.isSignUpOpen;
  } else if (action.type === "favorite modal") {
    newState.isFavoriteModal = !newState.isFavoriteModal;
  } else if (action.type === "current_location_shops") {
    newState.currentLocationShops = action.data;
  } else if (action.type === "current_location_shop_pics") {
    newState.currentLocationShopPics = action.data;
  } else if (action.type === "topic_shops") {
    newState.topicShops = action.data;
  } else if (action.type === "topic_shop_pics") {
    newState.topicShopPics = action.data;
  }

  return newState;
}
const store = createStore(reducer);

// 사가함수를 작성할땐 * 별포 키워드와 함께 시작하는 것 참고해주세요
// 정확한 이론은 아니니 참고만 해주세요
// 패턴처럼 이해하시면 쉽습니다.

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
