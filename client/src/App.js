import logo from './logo.svg'
import './App.css'
import { createStore } from 'redux'
import {
<<<<<<< HEAD
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
import Signout from "./Components/Mypage/Signout";
import Review from "./Components/Mypage/Review";
import Favorite from "./Components/Favorites/Favorites";
import ShopDetail from "./Components/ShopDetail/ShopDetail";
import { useEffect } from "react";
import axios from "axios";
function App() {
  const isLogInOpen = useSelector((state) => state.isLogInOpen);
  const isSignUpOpen = useSelector((state) => state.isSignUpOpen);
  const isFavoriteModal = useSelector((state) => state.isFavoriteModal);
  const shopInfo = useSelector((state) => state.shopInfo);
  const shopDetailInfo = useSelector((state) => state.shopDetailInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          function (position) {
            axios
              .get(
                `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=FD6&page=1&size=15&sort=accuracy&x=${position.coords.longitude}&y=${position.coords.latitude}&radius=2000`,
                {
                  headers: {
                    Authorization: "KakaoAK 2af87592ef59bb8f2f504dc1544a0a89",
                  },
                }
              )
              .then((res) => {
                dispatch({
                  type: "shop_info",
                  data: res.data.documents,
                });
                // console.log(res.data.documents);
                axios
                  .post(
                    "https://localhost:4000/data",
                    { data: res.data.documents },
                    {
                      withCredentials: true,
                    }
                  )
                  .then((res) => {
                    console.log(res.data.data.result);
                    dispatch({
                      type: "shop_detail_info",
                      data: res.data.data.result,
                    });
                  });
              });
          },
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

  useEffect(() => {
    axios
      .get("https://localhost:4000/topicshop/total_review", {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({
          type: "topic_shop_info",
          data: res.data.data.shopInfo,
        });
        dispatch({
          type: "topic_shop_detail_info",
          data: res.data.data.shopPicInfos,
        });
      });
  }, []);
  console.log("카카오로 받아온 정보", shopInfo);
  console.log("크롤링으로 받아온 정보", shopDetailInfo);
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
          <Route path="/shopdetail/:id" exact component={ShopDetail} />\
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App
