import logo from './logo.svg'
import './App.css'
import { createStore } from 'redux'
import {
	Provider,
	useSelector,
	useDispatch,
	connect,
	shallowEqual,
} from 'react-redux'
import SlideShop from './Components/Mainpage/SlideShop'
import SlidePick from './Components/Mainpage/SlidePick'
import Header from './Components/Mainpage/Header'
import Footer from './Components/Mainpage/Footer'
import './App.css'
import Signup from './Components/Signup/Signup'
import Intro from './Components/intropage/Intro'
import Loginbtn from '../src/Components/Login/Loginbtn'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Mypage from './Components/Mypage/Mypage'
import Signout from './Components/Mypage/Signout'

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
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<Intro />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/signout" element={<Signout />} />
					<Route path="/login" element={<Loginbtn />} />
					<Route path="/mypage">
						<Mypage />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
