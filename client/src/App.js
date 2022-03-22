import logo from './logo.svg'
import './App.css'
import Signup from './Components/Signup/Signup'
import Intro from './Components/intropage/Intro'
import { createStore } from 'redux'
import {
	Provider,
	useSelector,
	useDispatch,
	connect,
	shallowEqual,
} from 'react-redux'
import Loginbtn from '../src/Components/Login/Loginbtn'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

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
			{/* <Signup /> */}
			<Router>
				<Route path="/">
					<Loginbtn />
				</Route>
			</Router>
		</div>
	)
}

export default App
