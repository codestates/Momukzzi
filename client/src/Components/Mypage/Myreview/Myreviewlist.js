import React from 'react'
import { Styled } from './style'
import Myreviewdelete from './Myreviewdelete'
const Myreviewlist = ({ comment, shop_name, createdAt, star, pic, id }) => {
	return (
		<>
			<Styled.Wrapper>
				<Styled.CommentWrapper>
					<Styled.Comment>
						<Styled.ProfileBox>
							<Styled.Profile>
								{!pic ? (
									<Styled.ProfileImgBox>
										<Styled.ProfileImg src="http://www.billking.co.kr/index/skin/board/basic_support/img/noimage.gif" />
									</Styled.ProfileImgBox>
								) : (
									<Styled.ProfileImgBox>
										<Styled.ProfileImg src={pic} />
									</Styled.ProfileImgBox>
								)}
								<Styled.NickName>{shop_name}</Styled.NickName>
							</Styled.Profile>
						</Styled.ProfileBox>
						<Styled.ContentBox>
							<Styled.ContentWrapper>
								<Styled.Content name="comment" className="comment-read">
									{comment}
								</Styled.Content>
								<Styled.Star>
									<Styled.UserLocationWrapper>
										<span>평점</span>
										<Styled.StarText>{` ${star}`}</Styled.StarText>
									</Styled.UserLocationWrapper>
								</Styled.Star>
							</Styled.ContentWrapper>
						</Styled.ContentBox>
						<Styled.BtnBox>
							<Styled.BtnWrapper>
								<Styled.BtnOne>
									<Myreviewdelete id={id} />
									{/* <Icon
										size={28}
										icon={ic_cancel_outline}
										className="delete-button"
										onClick={handleDeleteCommentModal}
									/> */}
								</Styled.BtnOne>
							</Styled.BtnWrapper>
						</Styled.BtnBox>
						<Styled.Date>{`작성날짜: ${createdAt}`}</Styled.Date>
					</Styled.Comment>
				</Styled.CommentWrapper>
			</Styled.Wrapper>
		</>
	)
}
export default Myreviewlist
