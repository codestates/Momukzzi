import React, { useState } from 'react'
import axios from 'axios'

function Loginmodal({ setOpenModal }) {
	const [loginInfo, setLoginInfo] = useState({
		userid: '',
		password: '',
	})

	const handleInputValue = key => e => {
		setLoginInfo({ ...loginInfo, [key]: e.target.value.toLowerCase() })
	}
	console.log(loginInfo)

	const onClickLogin = () => {
		const { userid, password } = loginInfo
		if (userid === '') {
			console.log('아이디를 입력하세요')
			return
		} else if (password === '') {
			console.log('비밀번호를 입력하세요')
			return
		}
		console.log('click login')
		axios
			.post(
				`${process.env.REACT_APP_API_URL}/user/login`,
				{
					userid,
					password,
				},
				{ 'Content-Type': 'application/json' }
			)
			.then(res => {
				console.log(res)
				console.log(res.data.data.accessToken)
				localStorage.setItem('accessToken')
				localStorage.setItem('nickname')
				if (res.data.data.accessToken) {
					localStorage.setItem('accessToken')
				}
				return window.location.replace('/')
			})
			.catch(err => {
				console.log(err)
				alert('아이디와 비밀번호를 확인해 주세요.')
			})
	}

	return (
		<div className="modalBackground">
			<div className="modalContainer">
				<div className="titleCloseBtn">
					<button
						onClick={() => {
							setOpenModal(false)
						}}
					>
						X
					</button>
				</div>
				<div className="title">
					<h1>로그인</h1>
				</div>
				<div className="body">
					<div className="login_id">
						<h4>아이디</h4>
						<input
							type="text"
							placeholder="아이디"
							name="input_id"
							onChange={handleInputValue('userid')}
						/>
					</div>
					<div className="login_pw">
						<h4>비밀번호</h4>
						<input
							type="password"
							name="input_Password"
							placeholder="비밀번호"
							onChange={handleInputValue('password')}
						/>
					</div>
				</div>
				<div className="footer">
					<div className="submit">
						<button onClick={onClickLogin}>로그인</button>
					</div>

					<button
						onClick={() => {
							setOpenModal(false)
						}}
						id="cancelBtn"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
}

export default Loginmodal
