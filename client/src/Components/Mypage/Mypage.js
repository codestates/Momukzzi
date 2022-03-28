import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import Review from './Review'
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

	const [userInfo, setUserInfo] = useState('')
	const [fixNicknameToggle, setFixNicknameToggle] = useState(false)
	const [changeInfo, setchangeInfo] = useState({
		user_id: '',
		nickname: '',
		user_password: '',
		// verifyPassword: '',
		// user_phone_number: '',
		verification_code: '',
	})
	const [message, setMessage] = useState({
		password: '비밀번호는 8글자 이상, 영문, 숫자 조합이어야 합니다.',
		// verifyPassword: '비밀번호를 확인해주세요.',
		userNickname: '닉네임은 특수문자를 제외한 2 ~ 6 글자이어야 합니다.',
	})
	const [validation, setValidation] = useState({
		userNickname: false,
		checkNickname: false,
		password: false,
		// verifyPassword: false,
	})
	const isValidForNickname = validation.userNickname && validation.checkNickname

	function isNickname(asValue) {
		let regExp = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,6}$/
		return regExp.test(asValue)
	}

	const fixNicknameToggleHandler = () => {
		setFixNicknameToggle(!fixNicknameToggle)
	}

	const handleInputValue = key => e => {
		setchangeInfo({ ...changeInfo, [key]: e.target.value })
	}
	const fixNicknameHandler = () => {
		const { nickname } = changeInfo
		console.log('userid', changeInfo.user_id)
		axios
			.patch('https://localhost:4000/users', {
				user_id: changeInfo.user_id,
				nickname,
			})
			.then(res => {
				console.log('닉네임 패치', res)
				console.log('유저정보변경')
				alert('닉네임이 변경되었습니다.')
				// openAlertHandler();
				fixNicknameToggleHandler()
				return window.location.replace('/mypage')
			})
			.catch(err => {
				alert('닉네임 변경 오류입니다.')
				// openWarningAlertHandler();
				console.log('닉네임 패치오류', err)
			})
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
					setchangeInfo(res.data.data.userInfo)
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

	const handleOnblurName = key => e => {
		const { nickname } = changeInfo
		if (!isNickname(changeInfo.nickname)) {
			setMessage({
				...message,
				userNickname: '닉네임 양식을 맞춰주세요.',
			})
			return
		}
		if (changeInfo.nickname.length > 6 || changeInfo.nickname.length < 2) {
			setMessage({ ...message, userNickname: '2 ~ 6 글자이어야 합니다.' })
			return
		}
		axios
			.post('https://localhost:4000/users/check', {
				nickname,
				// [key]: e.target.value,
			})
			.then(res => {
				console.log('닉네임 사용가능', res)
				setValidation({ ...validation, checkNickname: true })
				setMessage({ ...message, userNickname: '사용 가능한 닉네임입니다.' })
			})
			.catch(err => {
				console.log('닉네임 중복', err)
				setValidation({ ...validation, checkNickname: false })
				setMessage({ ...message, userNickname: '중복된 닉네임입니다.' })
			})
	}

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
							<span className="FixToggleBtn" onClick={fixNicknameToggleHandler}>
								닉네임 수정
							</span>
							{fixNicknameToggle ? (
								<form
									className="Fix-toggle-container"
									onSubmit={e => e.preventDefault()}
								>
									<div>
										<div className="Fix-toggle-title">닉네임</div>
										<div className="Fix-toggle-container">
											<input
												className="Fix-toggle-input"
												onChange={handleInputValue('nickname')}
												onBlur={handleOnblurName('nickname')}
											/>
											{message.userNickname ===
											'닉네임은 특수문자를 제외한 2 ~ 6 글자이어야 합니다.' ? (
												<div>{message.userNickname}</div>
											) : message.userNickname ===
											  '사용 가능한 닉네임입니다.' ? (
												<div>{message.userNickname}</div>
											) : (
												<div>{message.userNickname}</div>
											)}
											<button
												className="FixToggleBtn"
												onClick={fixNicknameHandler}
											>
												수정
											</button>
											{/* {isValidForNickname ? (
												<button
													className="FixToggleBtn"
													onClick={fixNicknameHandler}
													type="submit"
												>
													수정
												</button>
											) : (
												<button className="FixToggleBtn" disabled={true}>
													수정
												</button>
											)} */}
										</div>
									</div>
								</form>
							) : null}

							<button
								className="mypage-signout-button"
								onClick={() => window.location.replace('/signout')}
							>
								회원탈퇴
							</button>
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
