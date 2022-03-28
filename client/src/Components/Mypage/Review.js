import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Loginmodal from '../Login/Loginmodal'
import Mypage from './Mypage'

function Review() {
	const [userReviews, setUserReviews] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const accessToken = localStorage.getItem('accessToken')

	const getReviewHandler = () => {
		axios
			.get('https://localhost:4000/reviews?userid=4', {
				headers: { authorization: `Bearer ${accessToken}` },
				'Content-Type': 'application/json',
			})
			.then(res => {
				console.log('리뷰정보', res.data.data.userreviews)
				setUserReviews(res)
				setIsLoading(false)
			})
			.catch(err => {
				console.log(err)
			})
	}

	useEffect(() => {
		getReviewHandler()
	}, [])

	return (
		<></>
		// <>
		// 	{userReviews&&userReviews.map(el => (
		// 		<div className="review-container">
		// 			<div className="review-title-info-container">
		// 				<div className="review-icon-text-container">
		// 					{/* <img
		// 						className="review-title-icon"
		// 						src={require('../../img/찌개.png').default}
		// 						alt=""
		// 					/> */}
		// 					<div className="store-text">{el.store.store_name}</div>
		// 				</div>
		// 				<div className="review-icon-text-container">
		// 					<i className="far fa-calendar-alt" />
		// 					<div className="store-text">{el.createdAt.slice(0, 10)}</div>
		// 				</div>
		// 			</div>
		// 			<div className="review-img-info-container">
		// 				<img className="review-store-img" src={el.review_image} alt="" />
		// 				<div className="review-store-info-container">
		// 					<div className="review-menu-title">{el.menu.menu_name}</div>
		// 					<div className="store-text">{el.review_content}</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	))}
		// </>
	)
}

export default Review
