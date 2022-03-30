import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Myreviewlist from './Myreviewlist'

function Myreview() {
	const [userReview, setUserReview] = useState('')
	const [isLoading, setIsLoading] = useState(true)

	const accessToken = localStorage.getItem('accessToken')

	const getReviewHandler = () => {
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
					console.log('review', res.data.data.userInfo.reviews)
					setUserReview(res.data.data.userInfo.reviews)
					console.log('개인정보가져오기 성공')
				})
				.catch(err => {
					console.log('개인가져오기 에러', err)
				})
		}
	}
	useEffect(() => {
		getReviewHandler()
	}, [])

	return (
		<>
			{userReview &&
				userReview.map((el, i) => {
					return (
						<Myreviewlist
							key={i}
							comment={el.comment.slice(0, 10)}
							createdAt={el.createdAt}
							shop_name={el.shop.shop_name}
						/>
					)
				})}
		</>
	)
}

export default Myreview
