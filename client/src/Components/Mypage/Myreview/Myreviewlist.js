import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Styled } from "./style";
import Myreviewdelete from "./Myreviewdelete";

const Myreviewlist = ({ comment, shop_name, createdAt, star, pic, id }) => {
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
  );
};
export default Myreviewlist;
