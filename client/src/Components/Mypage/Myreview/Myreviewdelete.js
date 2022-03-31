import axios from 'axios'
import React from 'react'

const Myreviewdelete = () => {
	const accessToken = localStorage.getItem('accessToken')
	const deleteModal = () => {
		if (window.confirm('정말 리뷰를 삭제하시겠습니까?')) {
			deleteHandler()
		} else {
			console.log('리뷰 취소하기')
		}
	}
	const deleteHandler = () => {
		if (!accessToken) {
			return
		} else {
			axios
				.delete('https://localhost:4000/reviews', {
					headers: { authorization: `Bearer ${accessToken}` },
					'Content-Type': 'application/json',
				})
				.then(res => {
					console.log('리뷰삭제')
					alert('리뷰가 삭제됐습니다.')
				})
				.catch(err => {
					console.log('리뷰삭제 에러', err)
					// alert("잘못된 요청입니다");
				})
		}
	}

	return (
		<div className="deleteBtn">
			<button onClick={deleteModal}>x</button>
		</div>
	)
}

export default Myreviewdelete
