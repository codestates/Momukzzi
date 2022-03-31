import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Myreviewlist from './Myreviewlist'
import styled from 'styled-components'
import { Styled } from './style'

function Myreview() {
	const [userReview, setUserReview] = useState([])

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
					console.log(
						'img',
						res.data.data.userInfo.reviews[0].review_pics[0].pic_URL
					)
					console.log('review', res.data.data.userInfo.reviews)
					setUserReview(res.data.data.userInfo.reviews)
					console.log(
						'rrrr',
						...res.data.data.userInfo.reviews[0].comment.slice(0, 4)
					)

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

	let newUserReview = [...userReview.slice(0, 3)]

	return (
		<>
			<div>
				{newUserReview &&
					newUserReview.map((el, i) => {
						return (
							<Myreviewlist
								key={i}
								comment={el.comment}
								createdAt={el.createdAt.slice(0, 10)}
								shop_name={el.shop.shop_name}
								star={el.star}
								pic={el.review_pics[1].pic_URL}
							/>
						)
					})}
			</div>
		</>
	)
}

export default Myreview
