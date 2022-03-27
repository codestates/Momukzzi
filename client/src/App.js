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
import Loginbtn from "../src/Components/Login/Loginbtn";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Mypage from "./Components/Mypage/Mypage";
import SlideTopic from "./Components/Mainpage/SlideTopic";
import Hashtag from "./Components/Mainpage/Hashtag";
import Loginmodal from "./Components/Login/Loginmodal";
import Favorite from "./Components/Favorites/Favorites";
import TodaysPick from "./Components/Mainpage/TodaysPick";
function App() {
  const isLogInOpen = useSelector((state) => state.isLogInOpen);
  const isSignUpOpen = useSelector((state) => state.isSignUpOpen);
  const isFavoriteModal = useSelector((state) => state.isFavoriteModal);
  return (
    <div className="App">
      {/* <BrowserRouter>
        <Header />
        {isLogInOpen ? <Loginmodal /> : ""}
        {isSignUpOpen ? <Signup /> : ""}
        {isFavoriteModal ? <Favorite /> : ""}
        <Switch>
          <Route exact path="/">
            <Hashtag />
            <SlideShop />
            <SlidePick />
            <SlideTopic />
          </Route>
          <Route path="/mypage">
            <Mypage />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter> */}
      {/* <TodaysPick /> */}
      <Intro />
    </div>
  );
}

export default App;
