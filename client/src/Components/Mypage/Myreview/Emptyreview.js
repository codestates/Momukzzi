import React from 'react'
import { Styled } from './style'
import MypageImg from '../21631.jpg'

const Empty = () => {
	return (
		<Styled.ContentEmpty>
			새로운 리뷰를 작성해보세요 !<img src={MypageImg}></img>
		</Styled.ContentEmpty>
	)
}

export default Empty
