import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { createStore } from "redux";
import {
  Provider,
  useSelector,
  useDispatch,
  connect,
  shallowEqual,
} from "react-redux";


const initialState = {
  isLogInOpen: false,
  isSignUpOpen: false,
  isFavoriteModal: false,
  shopInfo: [
    {
      address_name: null,
      category_group_code: null,
      category_group_name: null,
      category_name: null,
      distance: "",
      id: null,
      phone: null,
      place_name: null,
      place_url: null,
      road_address_name: null,
      x: null,
      y: null,
    },
  ],
};

function reducer(currentState = initialState, action) {
  const newState = { ...currentState };
  if (action.type === "login modal") {
    newState.isLogInOpen = !newState.isLogInOpen;
  } else if (action.type === "signup modal") {
    newState.isSignUpOpen = !newState.isSignUpOpen;
  } else if (action.type === "favorite modal") {
    newState.isFavoriteModal = !newState.isFavoriteModal;
  } else if (action.type === "shopinfo") {
    newState.shopInfo = action.data;
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
