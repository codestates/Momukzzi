import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const ModalBackdrop = styled.div`
	position: fixed;
	z-index: 999;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.4);
`
const SignoutForm = styled.div`
	margin: 0 auto;
	width: 550px;
	height: 600px;
	font-weight: 700;
	text-align: left;
	transform: translateY(20%);
	border: 1px solid black;
	background-color: white;
`
const SignoutTitle = styled.div`
	font-size: 20px;
	font-weight: bolder;
	margin-bottom: 5px;
`
const SignoutContainer = styled.div`
	border: 3px solid black;
	border-radius: 10px;
	padding: 10px;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
`
const SignoutMiddleContainer = styled.div`
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;

	.fillin-text {
		margin-bottom: 10px;
		color: red;
	}
	.fillin-input {
		border: 2px solid white;
		-webkit-box-shadow: gray 3px 3px 3px 3px;
		box-shadow: gray 3px 3px 3px 3px;
		border-radius: 5px;
		-webkit-transition: 120ms ease all;
		transition: 120ms ease all;
	}

	.fillin-input:focus {
		outline: none;
		-webkit-box-shadow: gray 2px 2px 2px 2px;
		box-shadow: gray 2px 2px 2px 2px;
		border: black solid 2px;
	}
`

const SignoutText = styled.div`
	font-size: 15px;
	line-height: 25px;
`
const SignoutCheckbox = styled.div`
	display: -webkit-box;
	display: flex;
	display: -ms-flexbox;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	width: 70%;
	margin: 20px;
	margin-bottom: 30px;
	.checkbox-input-check {
		margin-right: 15px;
	}
	.checkbox-agree-text {
		font-size: 12px;
		color: red;
	}
`
const SignoutBtnContainer = styled.div`
	display: -webkit-box;
	display: flex;
	display: -ms-flexbox;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	margin: 15px;

	.signout-submit-button {
		margin: 5px;
	}
	.signout-submit-button:hover {
		-webkit-box-shadow: gray 6px 6px 6px;
		box-shadow: gray 6px 6px 6px;
	}
	.signout-submit-button:before,
	.signout-submit-button:after {
		content: '';
		position: absolute;
		width: 0;
		-webkit-transition: ease all;
		transition: ease all;
	}
	.signout-submit-button:hover:before,
	.signout-submit-button:hover:after {
		width: 100%;
		-webkit-transition: ease all;
		transition: ease all;
	}
	.signout-submit-button:active {
		-webkit-box-shadow: none;
		box-shadow: none;
	}
`

function Signout({ close }) {
	const accessToken = localStorage.getItem('accessToken')

	const [agreeChecked, setAgreeChecked] = useState(false)
	const [fillinText, setFillinText] = useState('')

	const agreeCheckHandler = () => {
		setAgreeChecked(!agreeChecked)
	}
	const fillinCheckHandler = e => {
		setFillinText(e.target.value)
	}

	const signoutSubmitHandler = () => {
		if (!accessToken) {
			return
		}
		axios
			.delete('https://localhost:4000/users', {
				headers: { authorization: `Bearer ${accessToken}` },
				'Content-Type': 'application/json',
			})
			.then(res => {
				console.log('회원탈퇴성공')
				localStorage.removeItem('accessToken')
				localStorage.removeItem('email')
				alert('회원 탈퇴가 완료되었습니다.')
				// openAlertHandler();
				window.location.replace('/')
			})
			.catch(err => {
				alert('잘못된 요청입니다')
				// openWarningAlertHandler();
				console.log('회원탈퇴실패', err)
			})
	}
	return (
		<>
			<ModalBackdrop
				onClick={() => {
					close()
				}}
			>
				<SignoutForm onClick={e => e.stopPropagation()}>
					<SignoutTitle>탈퇴 안내</SignoutTitle>
					<SignoutContainer>
						<SignoutText>
							회원탈퇴를 신청하기 전에 안내사항입니다. <br /> 오늘 뭐먹지에서
							등록하셨던 개인정보는 모두 삭제되며, 다시 복구 할 수 없습니다.
						</SignoutText>
						<br />

						<SignoutText>회원탈퇴 전에 안내사항을 확인해주세요.</SignoutText>
						<SignoutCheckbox>
							<input
								className="checkbox-input-check"
								type="checkbox"
								onClick={agreeCheckHandler}
							/>
							<div className="checkbox-agree-text">
								안내사항에 동의하면 체크해주세요.
							</div>
						</SignoutCheckbox>
						<SignoutMiddleContainer>
							<div className="fillin-text">"회원탈퇴"를 입력해주세요.</div>
							<input className="fillin-input" onChange={fillinCheckHandler} />
						</SignoutMiddleContainer>
						<SignoutBtnContainer>
							{agreeChecked === true && fillinText === '회원탈퇴' ? (
								<button
									className="signout-submit-button"
									disabled={false}
									onClick={signoutSubmitHandler}
								>
									탈퇴하기
								</button>
							) : (
								<button className="signout-submit-button" disabled={true}>
									탈퇴하기
								</button>
							)}
							<button
								className="signout-submit-button"
								onClick={() => window.location.replace('/')}
							>
								취소 (홈으로)
							</button>
						</SignoutBtnContainer>
					</SignoutContainer>
				</SignoutForm>
			</ModalBackdrop>
		</>
	)
}

export default Signout
