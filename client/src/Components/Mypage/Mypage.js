import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
const PageContainer = styled.div`
  padding: 10px;
  font-size: 14px;
  word-break: keep-all;
  min-height: 81vh;
  @media only screen and (min-width: 1024px) {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-top: 60px;
    min-height: 79.6vh;
    font-size: 23px;
  }
  .LeftContainer {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 50%;
    margin-right: 30px;
  }
  .RightContainer {
    width: 50%;
  }
  .MyinfoContainer {
    height: 650px;
    padding-left: 25px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .Title {
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: bolder;
  }
  .MyinfoNickname {
    margin-top: 20px;
  }
  .FixToggleBtn {
    margin: 5px 0 5px 0;
    opacity: 0.5;
    cursor: pointer;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
  }
  .ReviewContainer {
    height: 670px;
    overflow: auto;
  }
  .Fix-toggle-container {
    padding: 5px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  .Fix-toggle-input {
    font-size: 13px;
    border: 2px solid;
    border-radius: 5px;
    -webkit-transition: 100ms ease all;
    transition: 100ms ease all;
    height: 20px;
    padding: 2px 0 2px 0;
    margin-top: 4px;
    margin-bottom: 5px;
  }

  .Fix-toggle-input:focus {
    border: 2px solid #ffcc1d;
    outline: none;
  }
`;

const LeftContainer = styled.div``;

function Mypage({ goSignout }) {
  const accessToken = localStorage.getItem("accessToken");

  const [userInfo, setUserInfo] = useState({});
  const [fixNicknameToggle, setFixNicknameToggle] = useState(false);
  const [changeInfo, setchangeInfo] = useState({
    user_nickname: "",
    user_password: "",
    // verifyPassword: '',
    // user_phone_number: '',
    verification_code: "",
  });
  const [message, setMessage] = useState({
    password: "비밀번호는 8글자 이상, 영문, 숫자 조합이어야 합니다.",
    // verifyPassword: '비밀번호를 확인해주세요.',
    nickname: "닉네임은 특수문자를 제외한 2 ~ 20 글자이어야 합니다.",
  });
  const [validation, setValidation] = useState({
    nickname: false,
    checkNickname: false,
    password: false,
    // verifyPassword: false,
  });
  const isValidForNickname = validation.nickname && validation.checkNickname;

  function isNickname(asValue) {
    let regExp = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;
    return regExp.test(asValue);
  }

  const fixNicknameHandler = () => {
    setFixNicknameToggle(!fixNicknameToggle);
  };

  const handleInputValue = (key) => (e) => {
    setchangeInfo({ ...changeInfo, [key]: e.target.value });
  };

  const handleOnblurName = (key) => (e) => {
    if (!isNickname(changeInfo.user_nickname)) {
      setMessage({ ...message, nickname: "특수문자는 입력이 불가능 합니다." });
      return;
    }
    if (
      changeInfo.user_nickname.length > 20 ||
      changeInfo.user_nickname.length < 2
    ) {
      setMessage({ ...message, nickname: "2 ~ 20 글자이어야 합니다." });
      return;
    }
    axios
      .patch("https://localhost:4000/users", {
        [key]: e.target.value,
      })
      .then((res) => {
        setValidation({ ...validation, checkNickname: true });
        setMessage({ ...message, nickname: "사용 가능한 닉네임입니다." });
      })
      .catch((err) => {
        setValidation({ ...validation, checkNickname: false });
        setMessage({ ...message, nickname: "중복된 닉네임입니다." });
      });
  };
  return (
    <>
      {localStorage.getItem("accessToken") ? (
        <PageContainer>
          <div className="LeftContainer">
            <div className="Title">내 정보</div>
            <div className="MyinfoContainer">
              <div className="MyinfoNickname">윤혁2님 오늘 뭐먹죠?</div>
              <span className="FixToggleBtn" onClick={fixNicknameHandler}>
                닉네임 수정
              </span>
              {fixNicknameToggle ? (
                <form
                  className="Fix-toggle-container"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div>
                    <div className="Fix-toggle-title">닉네임</div>
                    <div className="Fix-toggle-container">
                      <input
                        className="Fix-toggle-input"
                        onChange={handleInputValue("user_nickname")}
                        onBlur={handleOnblurName("user_nickname")}
                      />
                      {message.nickname ===
                      "닉네임은 특수문자를 제외한 2 ~ 20 글자이어야 합니다." ? (
                        <div>{message.nickname}</div>
                      ) : message.nickname === "사용 가능한 닉네임입니다." ? (
                        <div>{message.nickname}</div>
                      ) : (
                        <div>{message.nickname}</div>
                      )}
                      {isValidForNickname ? (
                        <button
                          className="FixToggleBtn"
                          onClick={fixNicknameHandler}
                          type="submit"
                        >
                          수정
                        </button>
                      ) : (
                        <button className="FixToggleBtn" disabled={true}>
                          수정
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              ) : null}

              <button className="mypage-withdrawal-button" onClick={goSignout}>
                회원탈퇴
              </button>
            </div>
          </div>
          <div className="RightContainer">
            <div className="Title">최근 리뷰 내역</div>
            <div className="ReviewContainer">리뷰</div>
          </div>
        </PageContainer>
      ) : (
        <>
          {alert("마이페이지는 로그인 상태에서 접근할 수 있습니다.")}
          <Redirect to="/" />
        </>
      )}
    </>
  );
}
export default Mypage;
