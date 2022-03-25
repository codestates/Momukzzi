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
axios.defaults.withCredentials = true;

function reducer(currentState, action) {
  if (currentState === undefined) {
    return {
      isLogInOpen: false,
      isSignUpOpen: false,
    };
  }

  const newState = { ...currentState };
  if (action.type === "login modal") {
    newState.isLogInOpen = !newState.isLogInOpen;
  } else if (action.type === "signup modal") {
    newState.isSignUpOpen = !newState.isSignUpOpen;
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
