import React from 'react'
import { Styled } from './style'
import MypageImg from '../케이크.jpeg'

const Empty = () => {
	return (
		<Styled.ContentEmpty>
			<span className="imtext"> 새로운 리뷰를 작성해보세요 !</span>
			<img src={MypageImg} className="blur"></img>
		</Styled.ContentEmpty>
	)
}

export default Empty
