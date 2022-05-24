import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import dummyShops from "./dummy/dummyShops";

const initialState = {
  isLogInOpen: false,
  isSignUpOpen: false,
  isFavoriteModal: false,
  currentLocationShops: dummyShops,
  currentShopName: 0,
  loading: true,
  loadingModal: false,
};

function reducer(currentState = initialState, action) {
  const newState = { ...currentState };
  if (action.type === "login modal") {
    newState.isLogInOpen = !newState.isLogInOpen;
    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "visible";
    } else {
      document.body.style.overflow = "hidden";
    }
  } else if (action.type === "signup modal") {
    newState.isSignUpOpen = !newState.isSignUpOpen;
    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "visible";
    } else {
      document.body.style.overflow = "hidden";
    }
  } else if (action.type === "favorite modal") {
    newState.isFavoriteModal = !newState.isFavoriteModal;
    if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "visible";
    } else {
      document.body.style.overflow = "hidden";
    }
  } else if (action.type === "current_location_shops") {
    newState.currentLocationShops = action.data;
  } else if (action.type === "current_shop_name") {
    newState.currentShopName = action.payload.shop_name;
  } else if (action.type === "loading") {
    newState.loading = action.data;
  } else if (action.type === "loading_modal") {
    newState.loadingModal = action.data;
  }

  return newState;
}
const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
