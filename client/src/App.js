import logo from "./logo.svg";
import "./App.css";
import { createStore } from "redux";
import {
  Provider,
  useSelector,
  useDispatch,
  connect,
  shallowEqual,
} from "react-redux";
import SlideShop from "./Components/Mainpage/SlideShop";
import SlidePick from "./Components/Mainpage/SlidePick";
import Header from "./Components/Mainpage/Header";
import Footer from "./Components/Mainpage/Footer";
import "./App.css";
import Signup from "./Components/Signup/Signup";
import Intro from "./Components/intropage/Intro";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SlideTopic from "./Components/Mainpage/SlideTopic";
import Hashtag from "./Components/Mainpage/Hashtag";
import Loginmodal from "./Components/Login/Loginmodal";
import Mypage from "./Components/Mypage/Mypage";
import Signout from "./Components/Mypage/Signout/Signout";
import Review from "./Components/Review/Review";
import Favorite from "./Components/Favorites/Favorites";
import ShopDetail from "./Components/ShopDetail/ShopDetail";
import EditorPick from "./Components/EditorPick/EditorPick";
import { useEffect, useState } from "react";
import axios from "axios";
import Myreview from "./Components/Mypage/Myreview/Myreview";

function App() {
  const isLogInOpen = useSelector((state) => state.isLogInOpen);
  const isSignUpOpen = useSelector((state) => state.isSignUpOpen);
  const isFavoriteModal = useSelector((state) => state.isFavoriteModal);

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          function (position) {},
          function (error) {
            console.error(error);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          }
        );
      } else {
        alert("GPS를 지원하지 않습니다");
      }
    }
    getLocation();
  }, []);

  if (localStorage.getItem("visited") === null) {
    localStorage.setItem("visited", JSON.stringify([]));
  }

  // console.log("카카오로 받아온 정보", shopInfo);
  // console.log("크롤링으로 받아온 정보", shopDetailInfo);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {isLogInOpen ? <Loginmodal /> : ""}
        {isSignUpOpen ? <Signup /> : ""}
        {isFavoriteModal ? <Favorite /> : ""}
        <Switch>
          <Route exact path="/">
            <Intro />
            <SlideShop />
            <SlidePick />
            <SlideTopic />
          </Route>
          <Route path="/mypage">
            <Mypage />
          </Route>
          <Route path="/signout">
            <Signout />
          </Route>
          <Route path="/shopdetail/:id" component={ShopDetail} />
          <Route path="/editor_pick/:code" component={EditorPick} />
          <Route path="/review" component={Review} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
