import React from 'react'
// import { Card, Row, Col } from 'react-bootstrap'
import { Styled } from './style'
import Myreviewdelete from './Myreviewdelete'

const Myreviewlist = ({
	comment,
	shop_name,
	createdAt,
	star,
	pic,
	userDelte,
}) => {
	return (
		<>
			<Styled.Wrapper>
				<Styled.CommentWrapper>
					<Styled.Comment>
						<Styled.ProfileBox>
							<Styled.Profile>
								<Styled.ProfileImgBox>
									<Styled.ProfileImg src={pic} />
								</Styled.ProfileImgBox>
								<Styled.NickName>{shop_name}</Styled.NickName>
							</Styled.Profile>
						</Styled.ProfileBox>
						<Styled.ContentBox>
							<Styled.ContentWrapper>
								<Styled.Content name="comment" className="comment-read">
									{comment}
								</Styled.Content>
								{/* <Styled.UserLocationWrapper>
									<span className="user-location">평점:</span>
									<span className="user-place">{` ${star}점`}</span>
								</Styled.UserLocationWrapper> */}
							</Styled.ContentWrapper>
						</Styled.ContentBox>
						<Styled.BtnBox>
							<Styled.BtnWrapper>
								<Styled.BtnOne>
									<Myreviewdelete />
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
		// <div class="container">
		// 	<div class="row">
		// 		<div class="col-8">
		// 			<div class="card">
		// 				<div class="row no-gutters">
		// 					<div class="col-4">
		// 						<img src={pic} alt="" class="card-img" />
		// 					</div>
		// 					<div class="col-8">
		// 						<div class="card-body">
		// 							<p class="card-text">{shop_name} </p>
		// 							<p class="card-text">{comment} </p>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
		// <Reviewimgcontainer>
		// 	<Reviewstoreimg src={pic} alt="" />
		// 	<Reviewstoreinfocontainer>
		// 		<Reviewmenutitle>{comment}</Reviewmenutitle>
		// 		<Card.Text>{createdAt}</Card.Text>
		// 	</Reviewstoreinfocontainer>
		// </Reviewimgcontainer>
		// <>
		// 	<div class="media">
		// 		<div class="media-left media-middle">
		// 			<a href="#">
		// 				<img class="media-object" src={pic} alt="" />
		// 			</a>
		// 		</div>
		// 		<div class="media-body">
		// 			<h4 class="media-heading">Middle aligned media</h4>
		// 			...
		// 		</div>
		// 	</div>
		// </>
		// <Row xs={1} md={1} className="g-4">
		// 	{Array.from({ length: 1 }).map((_, idx) => (
		// 		<Col>
		// 			<Card>
		// 				<img
		// 					variant="top"
		// 					src={pic}
		// 					className="img-thumbnail"
		// 					// className="rounded-circle"
		// 					// claaName="img-fluid"
		// 					alt=""
		// 				/>
		// 				<Card.Body>
		// 					<Card.Title>{shop_name}</Card.Title>
		// 					<Card.Text>{comment} </Card.Text>
		// 					<Card.Text>{createdAt} </Card.Text>
		// 				</Card.Body>
		// 			</Card>
		// 		</Col>
		// 	))}
		// </Row>
	)
}
export default Myreviewlist
