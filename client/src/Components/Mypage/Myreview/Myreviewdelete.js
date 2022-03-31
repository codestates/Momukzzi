import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BsTrash } from 'react-icons/bs'

const Myreviewdelete = () => {
	const accessToken = localStorage.getItem('accessToken')

	const [changeInfo, setchangeInfo] = useState({
		id: '',
		review_id: '',
	})
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
					setchangeInfo(res.data.data.userInfo.reviews[0])
					console.log(
						'개인정보가져오기 성공',
						res.data.data.userInfo.reviews[0]
					)
				})
				.catch(err => {
					console.log('개인가져오기 에러', err)
				})
		}
	}
	useEffect(() => {
		userInfoHandler()
	}, [])

	const deleteModal = () => {
		if (window.confirm('정말 리뷰를 삭제하시겠습니까?')) {
			deleteHandler()
		} else {
			console.log('리뷰 취소하기')
		}
	}
	const deleteHandler = () => {
		const { id } = changeInfo

		if (!accessToken) {
			return
		} else {
			axios
				.delete(
					'https://localhost:4000/reviews',
					{
						data: {
							review_id: id,
						},
					},
					{
						headers: { authorization: `Bearer ${accessToken}` },
						'Content-Type': 'application/json',
					}
				)
				.then(res => {
					console.log('리뷰삭제')
					alert('리뷰가 삭제됐습니다.')
					return window.location.replace('/mypage')
				})
				.catch(err => {
					console.log('리뷰삭제 에러', err)
					// alert("잘못된 요청입니다");
				})
		}
	}
	return <BsTrash onClick={deleteModal} />
}

export default Myreviewdelete
