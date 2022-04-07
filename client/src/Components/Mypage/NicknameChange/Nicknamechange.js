import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const SubmitButtonDiv = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 100px;
  margin-right: 10px;
  display: flex;

  & > button {
    padding: 6px 6px;
    background-color: #ffba34;
    border-radius: 4px;
    border: none;
    color: white;
    cursor: pointer;
    height: 50px;
  }
  .cancel {
    margin-left: 5px;
    margin-right: 5px;
  }
  .submit {
  }
`;
const InputForm = styled.div`
  margin: 0 auto;
  margin: 5px;
`;
const InputBox = styled.div`
	width: 300px;
	height: 300px
	border-bottom: solid 2px gainsboro;
`;
const Input = styled.input`
  width: 200px;
  border-style: none;
  height: 39px;
  padding-left: 5px;
  font-size: 13px;
  border-bottom: solid 2px gainsboro;

  :focus {
    outline: none;
  }
`;
const NickText = styled.div`
  font-size: 20px;
`;
function Nicknamechange() {
  const accessToken = localStorage.getItem("accessToken");

  const [changeInfo, setchangeInfo] = useState({
    user_id: "",
    nickname: "",
  });
  const [message, setMessage] = useState({
    nickname: "닉네임은 특수문자를 제외한 2 ~ 6 글자이어야 합니다.",
  });
  const [validation, setValidation] = useState({
    nickname: false,
  });

  const isValidForNickname = validation.nickname;

  const handleInputValue = (key) => (e) => {
    setchangeInfo({ ...changeInfo, [key]: e.target.value });
  };

  const isNickname = (asValue) => {
    let regExp = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,6}$/;
    return regExp.test(asValue);
  };

  const userInfoHandler = () => {
    if (!accessToken) {
      return;
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/users`, {
          headers: { authorization: `Bearer ${accessToken}` },
          "Content-Type": "application/json",
        })
        .then((res) => {
          setchangeInfo(res.data.data.userInfo);
          console.log("개인정보가져오기 성공");
        })
        .catch((err) => {
          console.log("개인가져오기 에러", err);
        });
    }
  };
  useEffect(() => {
    userInfoHandler();
  }, []);

  const nicknameCheck = (key) => (e) => {
    const { nickname } = changeInfo;
    if (!isNickname(changeInfo.nickname)) {
      setMessage({
        ...message,
        nickname: "닉네임 양식을 맞춰주세요.",
      });
      return;
    }
    if (changeInfo.nickname.length > 6 || changeInfo.nickname.length < 2) {
      setMessage({ ...message, nickname: "2 ~ 6 글자이어야 합니다." });
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/check`, {
        nickname,
      })
      .then((res) => {
        console.log("닉네임 사용가능", res);
        setValidation({ ...validation, nickname: true });
        console.log("validation", validation);
        setMessage({ ...message, nickname: "사용 가능한 닉네임입니다." });
      })
      .catch((err) => {
        console.log("닉네임 중복", err);
        setValidation({ ...validation, nickname: false });
        setMessage({ ...message, nickname: "사용 불가능한 닉네임입니다." });
      });
  };

  const fixNicknameHandler = () => {
    const { nickname } = changeInfo;
    console.log("userid", changeInfo.user_id);
    axios
      .patch(`${process.env.REACT_APP_API_URL}/users`, {
        user_id: changeInfo.user_id,
        nickname,
      })
      .then((res) => {
        console.log("닉네임 패치", res);
        console.log("유저정보변경");
        alert("닉네임이 변경되었습니다.");
        // openAlertHandler();
        // fixNicknameToggleHandler()
        return window.location.replace("/mypage");
      })
      .catch((err) => {
        alert("닉네임 변경 에러입니다.");
        // openWarningAlertHandler();
        console.log("닉네임 패치오류", err);
      });
  };
  return (
    <div>
      {/* <NickText>닉네임</NickText> */}
      <div>
        <Input
          onChange={handleInputValue("nickname")}
          placeholder="닉네임"
          // onBlur={nicknameCheck('nickname')}
        />
        {message.nickname ===
        "닉네임은 특수문자를 제외한 2 ~ 6 글자이어야 합니다." ? (
          <NickText>{message.nickname}</NickText>
        ) : message.nickname === "사용 가능한 닉네임입니다." ? (
          <NickText>{message.nickname}</NickText>
        ) : (
          <NickText>{message.nickname}</NickText>
        )}
        <SubmitButtonDiv>
          <button className="submit" onClick={nicknameCheck("nickname")}>
            중복확인
          </button>
          {isValidForNickname ? (
            <button className="cancel" onClick={fixNicknameHandler}>
              수정
            </button>
          ) : (
            <button className="cancel" disabled={true}>
              수정
            </button>
          )}
        </SubmitButtonDiv>
      </div>
    </div>
  );
}
export default Nicknamechange;
