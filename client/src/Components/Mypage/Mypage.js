import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

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
	.MyinfoContainer {
		height: 650px;
		padding-left: 25px;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-ms-flex-direction: column;
		flex-direction: column;
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
		height: 670px;
		overflow: auto;
	}
`
const LeftContainer = styled.div``

function Mypage() {
	return (
		<PageContainer>
			<div className="LeftContainer">
				<div className="Title">내 정보</div>
				<div className="MyinfoContainer">
					<div className="MyinfoNickname">
						{/* 환영합니다! '{userInfo.user_nickname}'님 */}
					</div>
					<span
						className="FixToggleBtn"
						// onClick={openFixNicknameToggleHandler}
					>
						닉네임 수정
					</span>
					{/* {isOpenFixNicknameToggle ? (
						<form
							className="mypage-fix-toggle-container"
							onSubmit={e => e.preventDefault()}
						>
							<div className="nickname-container">
								<div className="fix-toggle-title">닉네임</div>
								<div className="fix-toggle-container">
									<input
										className="fix-toggle-input"
										onChange={handleInputValue('user_nickname')}
										onBlur={handleOnblurName('user_nickname')}
									/>
									{message.nickname ===
									'닉네임은 특수문자를 제외한 2 ~ 20 글자이어야 합니다.' ? (
										<div className="signup-validation-message">
											{message.nickname}
										</div>
									) : message.nickname === '사용 가능한 닉네임입니다.' ? (
										<div className="signup-validation-ok">
											{message.nickname}
										</div>
									) : (
										<div className="signup-validation-error">
											{message.nickname}
										</div>
									)}
									{isValidForNickname ? (
										<button
											className="fix-toggle-button"
											onClick={fixNicknameHandler}
											type="submit"
										>
											수정
										</button>
									) : (
										<button className="fix-toggle-button" disabled={true}>
											수정
										</button>
									)}
								</div>
							</div>
						</form>
					) : null} */}
					{/* <div className="mypage-myinfo-email">
						{userInfo.user_email === ''
							? '이메일 제공 동의를 하지 않으셨습니다.'
							: userInfo.user_email}
					</div> */}
					{/* {isKakaoLogin === 'kakao' ? (
						<span
							className="mypage-fix-myinfo-not-toggle-button"
							disabled={true}
						>
							카카오 계정으로 로그인 하신 계정은 비밀번호 수정을 하실 수
							없습니다
						</span>
					) : (
						<span
							className="mypage-fix-myinfo-toggle-button"
							onClick={openFixPasswordToggleHandler}
						>
							비밀번호 수정
						</span>
					)} */}

					{/* {isOpenFixPasswordToggle ? (
						<form
							className="mypage-fix-toggle-container"
							onSubmit={e => e.preventDefault()}
						>
							<div className="password-container">
								<div className="fix-toggle-title">비밀번호</div>
								<input
									className="fix-toggle-input"
									type="password"
									onChange={handleInputValue('user_password')}
								/>
								{message.password ===
								'비밀번호는 8글자 이상, 영문, 숫자 조합이어야 합니다.' ? (
									<div className="signup-validation-message">
										{message.password}
									</div>
								) : message.password === '사용할 수 있는 비밀번호 입니다.' ? (
									<div className="signup-validation-ok">{message.password}</div>
								) : (
									<div className="signup-validation-error">
										{message.password}
									</div>
								)}
							</div>
							<div className="password-container">
								<div className="fix-toggle-title">비밀번호 확인</div>
								<input
									className="fix-toggle-input"
									type="password"
									onChange={handleInputValue('verifyPassword')}
								/>
								{isValidForPassword ? (
									<button
										className="fix-toggle-button"
										onClick={fixPasswordHandler}
									>
										수정
									</button>
								) : (
									<button className="fix-toggle-button" disabled={true}>
										수정
									</button>
								)}
								{message.verifyPassword === '비밀번호를 확인해주세요.' ? (
									<div className="signup-validation-message">
										{message.verifyPassword}
									</div>
								) : message.verifyPassword === '비밀번호가 일치합니다.' ? (
									<div className="signup-validation-ok">
										{message.verifyPassword}
									</div>
								) : (
									<div className="signup-validation-error">
										{message.verifyPassword}
									</div>
								)}
							</div>
						</form>
					) : null} */}
					{/* {isVerification ? (
						<div className="mypage-phone-verification-success-container">
							<div className="mypage-phone-verification-success-text">
								휴대폰 인증
							</div>
							<img
								className="mypage-phone-verification-check"
								src={require('../img/check.png').default}
								alt=""
							/>
						</div>
					) : (
						<div className="mypage-phone-verification-failure-container">
							<div
								className="mypage-phone-verification-button"
								onClick={openPhoneModalHandler}
							>
								휴대폰 인증
							</div>
							<img
								className="mypage-phone-verification-not-check"
								src={require('../img/notcheck.png').default}
								alt=""
							/>
						</div>
					)} */}

					{/* <button
						className="mypage-withdrawal-button"
						onClick={() => navigate('/withdrawal')}
					>
						회원탈퇴
					</button> */}
					{/* <img
						className="mypage-myinfo-deco-image"
						src={require('../img/mypage-myinfo.png').default}
						alt=""
					/> */}
				</div>
			</div>
			<div className="RightContainer">
				<div className="Title">최근 리뷰 내역</div>
				<div className="ReviewContainer">
					{/* <Review
						navigate={navigate}
						alertMessage={alertMessage}
						setAlertMessage={setAlertMessage}
						openAlertHandler={openAlertHandler}
					/> */}
					리뷰
				</div>
			</div>
			{/* {isOpenPhoneModal ? (
				<PhoneVerificationModal
					signupInfo={signupInfo}
					setSignupInfo={setSignupInfo}
					isNumberAlert={isNumberAlert}
					setIsNumberAlert={setIsNumberAlert}
					openPhoneModalHandler={openPhoneModalHandler}
					phoneVerification={phoneVerification}
					phoneVerificationComplete={phoneVerificationComplete}
				/>
			) : null} */}
		</PageContainer>
	)
}
export default Mypage
