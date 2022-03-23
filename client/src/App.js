import logo from "./logo.svg";
import "./App.css";
import Signup from "./Components/Signup/Signup";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch, connect } from "react-redux";
import SlideShop from "./Components/Mainpage/SlideShop";
import SlidePick from "./Components/Mainpage/SlidePick";
import Header from "./Components/Mainpage/Header";
import Footer from "./Components/Mainpage/Footer";
function reducer(currentState, action) {
  if (currentState === undefined) {
    return {};
  }

  const newState = { ...currentState };
  return newState;
}
const store = createStore(reducer);

function App() {
  return (
    <div className="App">
      <Header />
      <SlideShop />
      <SlidePick />
      <Footer />
    </div>
  );
}

export default App;
