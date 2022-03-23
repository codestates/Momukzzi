import logo from "./logo.svg";
import "./App.css";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch, connect,shallowEqual } from "react-redux";
import SlideShop from "./Components/Mainpage/SlideShop";
import SlidePick from "./Components/Mainpage/SlidePick";
import Header from "./Components/Mainpage/Header";
import Footer from "./Components/Mainpage/Footer";
import './App.css'
import Signup from './Components/Signup/Signup'
import Intro from './Components/intropage/Intro'
import Loginbtn from '../src/Components/Login/Loginbtn'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Mypage from './Components/Mypage/Mypage'

function reducer(currentState, action) {
	if (currentState === undefined) {
		return {}
	}

	const newState = { ...currentState }
	return newState
}
const store = createStore(reducer)

function App() {
	return (
		<div className="App">
			<Loginbtn />
			<Mypage />
		</div>
	)
}

export default App
