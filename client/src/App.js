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
import Loginmodal from "./Components/Login/Loginmodal";
import Mypage from "./Components/Mypage/Mypage";
import Signout from "./Components/Mypage/Signout/Signout";
import Review from "./Components/Review/Review";
import Favorite from "./Components/Favorites/Favorites";
import ShopDetail from "./Components/ShopDetail/ShopDetail";
import EditorPick from "./Components/EditorPick/EditorPick";
import OauthLoding from "./Components/Login/OauthLoading";
import LoadingModal from "./Components/Loading/LoadingModal";

function App() {
  const isLogInOpen = useSelector((state) => state.isLogInOpen);
  const isSignUpOpen = useSelector((state) => state.isSignUpOpen);
  const isFavoriteModal = useSelector((state) => state.isFavoriteModal);
  const loadingModal = useSelector((state) => state.loadingModal);

  if (localStorage.getItem("visited") === null) {
    localStorage.setItem("visited", JSON.stringify([]));
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {isLogInOpen ? <Loginmodal /> : ""}
        {isSignUpOpen ? <Signup /> : ""}
        {isFavoriteModal ? <Favorite /> : ""}
        {loadingModal ? <LoadingModal show={loadingModal} /> : ""}
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
          <Route path={"/review/:shop_id"} component={Review} />
          <Route path="/oauthloding" component={OauthLoding} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
