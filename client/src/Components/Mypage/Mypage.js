import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { My } from './Mypage.style'
import { Redirect } from 'react-router-dom'
import Myreview from './Myreview/Myreview'
import Nicknamechange from './NicknameChange/Nicknamechange'
import Passwordchange from './PasswordChange/Passwordchange'
import Signout from './Signout/Signout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'

function Mypage() {
	const accessToken = localStorage.getItem('accessToken')
	const Oauth = localStorage.getItem('Oauth')
	console.log(Oauth)

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
		<div>
			{localStorage.getItem('accessToken') ? (
				<My.MypageContainer>
					<My.MypageLeftContainer>
						<My.MypageTitle>내 정보</My.MypageTitle>
						<My.MypageMyinfoContainer>
							<div>
								{/* <FontAwesomeIcon icon={faUserCircle} className="photo-icon" /> */}
							</div>
							{/* <My.MypageMyinfoNickname>오늘 뭐먹지?</My.MypageMyinfoNickname> */}
							<My.MypageMyinfoNickname>
								닉네임: {userInfo && userInfo.data.data.userInfo.nickname} 님
							</My.MypageMyinfoNickname>
							<My.MypageMyinfoNickname>
								이메일: {userInfo && userInfo.data.data.userInfo.email}
							</My.MypageMyinfoNickname>
							<My.MypageFixMyinfoToggleButton
								onClick={fixNicknameToggleHandler}
							>
								닉네임 수정
							</My.MypageFixMyinfoToggleButton>
							{fixNicknameToggle ? (
								<My.MypageFixToggleContainer onSubmit={e => e.preventDefault()}>
									<div className="nickname-container">
										<Nicknamechange />
									</div>
								</My.MypageFixToggleContainer>
							) : null}
							{Oauth === 'true' ? (
								<div
									className="mypage-fix-myinfo-not-toggle-button"
									disabled={true}
								>
									소셜 계정은 비밀번호 수정을 하실 수 없습니다.
								</div>
							) : (
								<My.MypageFixMyinfoToggleButton
									onClick={fixPasswordToggleHandler}
								>
									비밀번호 수정
								</My.MypageFixMyinfoToggleButton>
							)}
							{fixPasswordToggle ? (
								<My.MypageFixToggleContainer onSubmit={e => e.preventDefault()}>
									<div className="password-container">
										<Passwordchange />
									</div>
								</My.MypageFixToggleContainer>
							) : null}
							<My.MypageSignoutButton>
								<button
									className="submit"
									onClick={() => {
										setSignoutModal(true)
									}}
								>
									회원탈퇴
								</button>
							</My.MypageSignoutButton>
							{signoutModal && <Signout setSignoutModal={setSignoutModal} />}
						</My.MypageMyinfoContainer>
					</My.MypageLeftContainer>
					<My.MypageRightContainer>
						<My.MypageTitle>내 리뷰</My.MypageTitle>
						<My.MypageReviewContainer>
							<Myreview />
						</My.MypageReviewContainer>
					</My.MypageRightContainer>
				</My.MypageContainer>
			) : (
				<Redirect />
			)}
		</div>
	)
}
export default Mypage
