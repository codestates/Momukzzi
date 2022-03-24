import React, { useState } from 'react'
import axios from 'axios'

function Signout({ setIsLogin }) {
	const goSignout = () => {
		window.location.replace('/signout')
	}

	const [agreeChecked, setAgreeChecked] = useState(false)
	const [fillinText, setFillinText] = useState('')

	const agreeCheckHandler = () => {
		setAgreeChecked(!agreeChecked)
	}
	const fillinCheckHandler = e => {
		setFillinText(e.target.value)
	}

	const signoutSubmitHandler = () => {
		axios
			.delete('https://localhost:4000/users', {
				headers: {
					authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					'Content-Type': 'application/json',
				},
			})
			.then(res => {
				console.log('회원탈퇴성공')
				setIsLogin(false)
				alert('회원 탈퇴가 완료되었습니다. 다음에 또 만나요!')
				// openAlertHandler();
				// navigate('/')
			})
			.catch(err => {
				alert('잘못된 요청입니다')
				// openWarningAlertHandler();
				console.log('회원탈퇴실패', err)
			})
	}
	return (
		<>
			<div className="signout-container">
				<div className="signout-title">탈퇴 안내</div>
				<div className="signout-content-container">
					<div className="signout-content-text">
						회원탈퇴를 신청하기 전에 안내사항을 꼭 확인해주세요.
					</div>
					<div className="signout-checkbox-container">
						<input
							className="checkbox-input-check"
							type="checkbox"
							onClick={agreeCheckHandler}
						/>
						<div className="checkbox-agree-text">
							안내사항을 모두 확인하였으며, 이에 동의합니다
						</div>
					</div>
					<div className="signout-fillin-container">
						<div className="fillin-text">
							"확인했습니다"를 정확히 입력해주세요.
						</div>
						<input className="fillin-input" onChange={fillinCheckHandler} />
					</div>
					<div className="signout-button-container">
						{agreeChecked === true && fillinText === '확인했습니다' ? (
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
						<button className="signout-submit-button" onClick={goSignout}>
							취소 (홈으로)
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Signout
