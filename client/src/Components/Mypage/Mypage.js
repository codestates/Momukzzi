import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import Review from './Review'
import Nicknamechange from './NicknameChange/Nicknamechange'
import Passwordchange from './PasswordChange/Passwordchange'
import Signout from './Signout/Signout'

const PageContainer = styled.div`
	padding: 10px;
	font-size: 14px;
	word-break: keep-all;
	min-height: 81vh;
	@media only screen and (min-width: 1024px) {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		margin-top: 60px;
		min-height: 79.6vh;
		font-size: 23px;
	}
	.LeftContainer {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		width: 50%;
		margin-right: 30px;
	}
	.RightContainer {
		width: 50%;
	}
	.Title {
		margin-bottom: 5px;
		font-size: 20px;
		font-weight: bolder;
	}
	.MyinfoNickname {
		margin-top: 20px;
	}
	.FixToggleBtn {
		margin: 5px 0 5px 0;
		opacity: 0.5;
		cursor: pointer;
		width: -webkit-fit-content;
		width: -moz-fit-content;
		width: fit-content;
	}
	.ReviewContainer {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
		border: 3px solid black;
		border-radius: 10px;
		padding: 5px;
		overflow: auto;
	}
	.Fix-toggle-container {
		padding: 5px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: start;
		-ms-flex-pack: start;
		justify-content: flex-start;
	}
	.Fix-toggle-input {
		font-size: 13px;
		border: 2px solid;
		border-radius: 5px;
		-webkit-transition: 100ms ease all;
		transition: 100ms ease all;
		height: 20px;
		padding: 2px 0 2px 0;
		margin-top: 4px;
		margin-bottom: 5px;
	}

	.Fix-toggle-input:focus {
		border: 2px solid black;
		outline: none;
	}
`
const SignoutBtn = styled.div`
	padding-top: 3px;
	width: 100px;
	margin-top: 4px;
	-webkit-box-shadow: gray 4px 4px 4px;
	box-shadow: gray 4px 4px 4px;
	border-radius: 7px;
	-webkit-transition: 120ms ease;
	transition: 120ms ease;
	background-color: white;
	cursor: pointer;
	.SignoutBtn:hover {
		-webkit-box-shadow: gray 6px 6px 6px;
		box-shadow: gray 6px 6px 6px;
	}
	.SignoutBtn:before,
	.SignoutBtn:after {
		content: '';
		position: absolute;
		width: 0;
		-webkit-transition: ease all;
		transition: ease all;

		.SignoutBtn:hover:before,
		.SignoutBtn:hover:after {
			width: 100%;
			-webkit-transition: ease all;
			transition: ease all;
		}
		.SignoutBtn:active {
			-webkit-box-shadow: none;
			box-shadow: none;
		}
	}
`

const MyinfoContainer = styled.div`
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	border: 3px solid black;
	border-radius: 10px;
	padding: 15px;
	margin-bottom: 15px;
`

function Mypage() {
	const accessToken = localStorage.getItem('accessToken')
	const [signoutModal, setSignoutModal] = useState(false)
	const [userInfo, setUserInfo] = useState('')
	const [fixNicknameToggle, setFixNicknameToggle] = useState(false)
	const [fixPasswordToggle, setFixPasswordToggle] = useState(false)

	const fixNicknameToggleHandler = () => {
		setFixNicknameToggle(!fixNicknameToggle)
	}
	const fixPasswordToggleHandler = () => {
		setFixPasswordToggle(!fixPasswordToggle)
	}

	const userInfoHandler = () => {
		if (!accessToken) {
			return
		} else {
			axios
				.get('https://localhost:4000/users', {
					headers: { authorization: `Bearer ${accessToken}` },
					'Content-Type': 'application/json',
				})
				.then(res => {
					console.log(res)
					console.log(res.data.data)
					setUserInfo(res)
					console.log('개인정보가져오기 성공')
				})
				.catch(err => {
					console.log('개인가져오기 에러', err)
				})
		}
	}
	useEffect(() => {
		userInfoHandler()
	}, [])

	return (
		<>
			{localStorage.getItem('accessToken') ? (
				<PageContainer>
					<div className="LeftContainer">
						<div className="Title">내 정보</div>
						<MyinfoContainer>
							<div className="MyinfoNickname">
								{userInfo && userInfo.data.data.userInfo.nickname} 님 오늘
								뭐먹죠?
							</div>
							<div className="MyinfoNickname">
								{userInfo && userInfo.data.data.userInfo.email}
							</div>
							<span className="FixToggleBtn" onClick={fixNicknameToggleHandler}>
								닉네임 수정
							</span>
							{fixNicknameToggle ? (
								<form
									className="Fix-toggle-container"
									onSubmit={e => e.preventDefault()}
								>
									<div>
										<Nicknamechange />
									</div>
								</form>
							) : null}
							{/* {/* {isKakaoLogin === 'kakao' ? (
              <span className="mypage-fix-myinfo-not-toggle-button" disabled={true}>
                카카오 계정으로 로그인 하신 계정은 비밀번호 수정을 하실 수 없습니다
              </span>
            ) : ( */}
							<span className="FixToggleBtn" onClick={fixPasswordToggleHandler}>
								비밀번호 수정
							</span>
							{/* )} */}

							{fixPasswordToggle ? (
								<form
									className="Fix-toggle-container"
									onSubmit={e => e.preventDefault()}
								>
									<div className="password-container">
										<div className="Fix-toggle-title">비밀번호</div>
										<Passwordchange />
									</div>
								</form>
							) : null}
							<SignoutBtn
								onClick={() => {
									setSignoutModal(true)
								}}
							>
								회원탈퇴
							</SignoutBtn>
							{signoutModal && <Signout setSignoutModal={setSignoutModal} />}
						</MyinfoContainer>
					</div>
					<div className="RightContainer">
						<div className="Title">최근 리뷰 내역</div>
						<div className="ReviewContainer">
							리뷰
							<Review />
						</div>
					</div>
				</PageContainer>
			) : (
				<Redirect />
			)}
		</>
	)
}
export default Mypage
