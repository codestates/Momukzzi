import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Loginoauth from './Loginoauth'

const ModalBackdrop = styled.div`
	position: fixed;
	z-index: 999;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.4);
`
const LoginForm = styled.div`
	margin: 0 auto;
	width: 550px;
	height: 600px;
	font-weight: 700;
	text-align: left;
	transform: translateY(20%);
	border: 1px solid black;
	background-color: white;
`
const Div = styled.div`
	margin: 0 auto;
	width: 440px;
	border: 1px solid black;
	transform: translateY(20%);
`
const InputForm = styled.div`
	margin: 0 auto;
	margin: 5px;
`

const LoginButton = styled.div`
	width: 430px;
	height: 45px;
	margin: 30px auto 0 auto;
	border: solid 1px gainsboro;
	text-align: center;
	background-color: #2a2a2a;
	color: white;
	cursor: pointer;
	line-height: 40px;
`
const InputBox = styled.div`
	width: 430px;
	height: 40px;
	border: solid 2px gainsboro;
`
const Input = styled.input`
	width: 390px;
	border-style: none;
	height: 39px;
	padding-left: 5px;
	font-size: 13px;
	:focus {
		outline: none;
	}
`

function Loginmodal({ setOpenModal, close }) {
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
		<ModalBackdrop
			onClick={() => {
				close()
			}}
		>
			<LoginForm onClick={e => e.stopPropagation()}>
				<Div>
					<button
						onClick={() => {
							setOpenModal(false)
						}}
					>
						X
					</button>
					<InputForm>
						<h4>아이디</h4>
						<InputBox>
							<Input
								type="text"
								placeholder="아이디"
								name="input_id"
								onChange={handleInputValue('userid')}
							/>
						</InputBox>
					</InputForm>
					<InputForm>
						<h4>비밀번호</h4>
						<InputBox>
							<Input
								type="password"
								name="input_Password"
								placeholder="비밀번호"
								onChange={handleInputValue('password')}
							/>
						</InputBox>
					</InputForm>
					<LoginButton onClick={onClickLogin}>로그인</LoginButton>
					<hr />
					<Loginoauth />
					{/* <button
						onClick={() => {
							setOpenModal(false)
						}}
						id="cancelBtn"
					>
						Cancel
					</button> */}
				</Div>
			</LoginForm>
		</ModalBackdrop>
	)
}

export default Loginmodal