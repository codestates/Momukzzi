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
import ShopDetail2 from "./Components/ShopDetail/ShopDetail2";
import EditorPick from "./Components/EditorPick/EditorPick";
import { useEffect, useState } from "react";
import axios from "axios";

import dummyTopicShopInfo from "./dummy/dummyTopicShopInfo";
import Myreview from "./Components/Mypage/Myreview/Myreview";

function App() {
  document.body.style.overflow = "hidden";
  const isLogInOpen = useSelector((state) => state.isLogInOpen);
  const isSignUpOpen = useSelector((state) => state.isSignUpOpen);
  const isFavoriteModal = useSelector((state) => state.isFavoriteModal);
  const shopInfo = useSelector((state) => state.shopInfo);
  const shopDetailInfo = useSelector((state) => state.shopDetailInfo);
  const dispatch = useDispatch();

  const [topicInfo, setTopicInfo] = useState(dummyTopicShopInfo);

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

  // useEffect(() => {
  // 	axios
  // 		.get('https://localhost:4000/topicshop/total_review', {
  // 			withCredentials: true,
  // 		})
  // 		.then(res => {
  // 			dispatch({
  // 				type: 'topic_shop_info',
  // 				data: res.data.data.shopInfo,
  // 			})
  // 			dispatch({
  // 				type: 'topic_shop_detail_info',
  // 				data: res.data.data.shopPicInfos,
  // 			})
  // 			setTopicInfo(res.data.data.shopInfo)
  // 		})
  // }, [])

  if (localStorage.getItem("visited") === null) {
    localStorage.setItem("visited", JSON.stringify([]));
  }

  // console.log("카카오로 받아온 정보", shopInfo);
  // console.log("크롤링으로 받아온 정보", shopDetailInfo);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {isLogInOpen ? (
          <Loginmodal />
        ) : (
          (document.body.style.overflow = "unset")
        )}
        {isSignUpOpen ? <Signup /> : (document.body.style.overflow = "unset")}
        {isFavoriteModal ? (
          <Favorite />
        ) : (
          (document.body.style.overflow = "unset")
        )}
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
          <Route path="/shopdetail/:id" exact component={ShopDetail} />
          <Route path="/shopdetail2/:id" component={ShopDetail2} />
          <Route path="/review" component={Review} />
          <Route path="/editor_pick/:code" component={EditorPick} />
        </Switch>
        <Footer />
      </BrowserRouter>
      {/* <EditorPick /> */}
    </div>
  );
}
export default App;
