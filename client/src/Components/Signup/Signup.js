import React from "react";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const SignUpForm = styled.div`
  margin: 0 auto;
  width: 550px;
  height: 760px;
  font-weight: 700;
  text-align: left;
  transform: translateY(5%);
  border-radius: 5px;
  background-color: white;
`;

const SignUpBody = styled.div`
  margin: 0 auto;
  padding-top: 20px;
  width: 440px;
  height: 100%;
`;

const Logo = styled.img`
  width: 300px;
  margin-left: 75px;
`;

const InputForm = styled.div`
  margin: 0 auto;
  margin: 5px;
`;
const ValidateMsg = styled.div`
  display: ${(props) => (props.hide ? "none" : "")};
  color: #f6bfbf;
  margin: 5px;
`;

const Input = styled.input`
  width: 390px;
  border-style: none;
  height: 40px;
  margin-left: 5px;
  font-size: 13px;
  :focus {
    outline: none;
  }
`;

const InputBox = styled.div`
  width: 430px;
  height: 45px;
  border: solid 2px gainsboro;
  border-radius: 5px;
`;

const SignUpButton = styled.div`
  width: 430px;
  height: 45px;
  margin: 30px auto 0 auto;

  border-radius: 5px;
  text-align: center;
  background-color: #ffba34;
  color: white;
  cursor: pointer;
  line-height: 40px;
`;

const SignUpLabel = styled.div``;
const CloseBtn = styled.div`
  position: relative;
`;
const CloseImg = styled.img`
  width: 15px;
  height: 15px;
  float: right;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
`;

function Signup(props) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [hideLengthFail, setHideLengthFail] = useState(true);
  const [hideIDFail, setHideIDFail] = useState(true);
  const [hideIDCheckFail, setHideIDCheckFail] = useState(true);
  const [hideEmailFail, setHideEmailFail] = useState(true);
  const [hidePasswordEquelFail, setHidePasswordEquelFail] = useState(true);
  const [hidePasswordFail, setHidePasswordFail] = useState(true);
  const [hideNameFail, setHideNameFail] = useState(true);

  const [userIdStyle, setUserIdStyle] = useState({});
  const [passwordStyle, setPasswordStyle] = useState({});
  const [emailStyle, setEmailStyle] = useState({});
  const [nameStyle, setNameStyle] = useState({});

  const isMoreThan4Length = (userId) => {
    if (userId.length < 4) {
      setHideLengthFail(false);
      setUserIdStyle({ borderColor: "#f6bfbf" });
      return false;
    } else {
      setHideLengthFail(true);
      return true;
    }
  };

  const onlyNumberAndEnglish = (userId) => {
    if (/^[A-Za-z][A-Za-z0-9]*$/.test(userId)) {
      setHideIDFail(true);
      return true;
    } else {
      setHideIDFail(false);
      setUserIdStyle({ borderColor: "#f6bfbf" });
      return false;
    }
  };

  const isEmailValidate = (email) => {
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]+$/.test(email)) {
      setHideEmailFail(true);
      setEmailStyle({ borderColor: "#c4e7c4" });
      return true;
    } else {
      setHideEmailFail(false);
      setEmailStyle({ borderColor: "#f6bfbf" });
      return false;
    }
  };
  const isPasswordEquel = (passwordRetype) => {
    if (password === passwordRetype) {
      setHidePasswordEquelFail(true);
      return true;
    } else {
      setHidePasswordEquelFail(false);
      setPasswordStyle({ borderColor: "#f6bfbf" });
      return false;
    }
  };

  const isPasswordValidate = (password) => {
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      setHidePasswordFail(true);
      return true;
    } else {
      setHidePasswordFail(false);
      setPasswordStyle({ borderColor: "#f6bfbf" });
      return false;
    }
  };

  const nameCheck = (name) => {
    if (name === "") {
      setHideNameFail(false);
      setNameStyle({ borderColor: "#f6bfbf" });
      return false;
    } else {
      setHideNameFail(true);
      setNameStyle({ borderColor: "#c4e7c4" });
      return true;
    }
  };

  const submit = () => {
    if (
      isMoreThan4Length(userId) &&
      onlyNumberAndEnglish(userId) &&
      isEmailValidate(email) &&
      isPasswordEquel(passwordRetype) &&
      isPasswordValidate(password) &&
      nameCheck(name)
    ) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/users`,
          {
            userid: userId,
            password: password,
            nickname: name,
            email: email,
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data.message === "exist") {
            setHideIDCheckFail(false);
          } else if (response.data.message === "created") {
            setHideIDCheckFail(true);
            window.location.replace("/");
          }
        })
        .catch((err) => {
          throw err;
        });
    }
  };
  const dispatch = useDispatch();
  return (
    <ModalBackdrop
      onClick={() => {
        dispatch({ type: "signup modal" });
      }}
    >
      <SignUpForm onClick={(e) => e.stopPropagation()}>
        <CloseBtn
          onClick={() => {
            dispatch({ type: "signup modal" });
          }}
        >
          <CloseImg src="https://cdn-icons-png.flaticon.com/512/458/458595.png" />
        </CloseBtn>
        <SignUpBody>
          <Logo src="https://cdn.discordapp.com/attachments/947685049682247701/961421667157016686/logo-removebg-preview.png"></Logo>
          <InputForm>
            <SignUpLabel>아이디</SignUpLabel>
            <InputBox style={userIdStyle}>
              <Input
                type="text"
                onChange={(e) => {
                  setUserId(e.target.value);
                  isMoreThan4Length(e.target.value);
                  onlyNumberAndEnglish(e.target.value);
                  if (
                    isMoreThan4Length(e.target.value) &&
                    onlyNumberAndEnglish(e.target.value)
                  ) {
                    if (onlyNumberAndEnglish(userId)) {
                      setUserIdStyle({ borderColor: "#c4e7c4" });
                    }
                  }
                }}
              />
            </InputBox>
            <ValidateMsg hide={hideLengthFail}>
              아이디는 네 글 자 이상이여야 합니다.
            </ValidateMsg>
            <ValidateMsg hide={hideIDFail}>
              아이디는 영어 또는 숫자만 가능합니다.
            </ValidateMsg>
            <ValidateMsg hide={hideIDCheckFail}>
              중복된 아이디 입니다.
            </ValidateMsg>
          </InputForm>

          <InputForm>
            <SignUpLabel>Email</SignUpLabel>
            <InputBox style={emailStyle}>
              <Input
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                  isEmailValidate(e.target.value);
                }}
              />
            </InputBox>
            <ValidateMsg hide={hideEmailFail}>
              올바른 이메일 형식을 입력해주세요
            </ValidateMsg>
          </InputForm>

          <InputForm>
            <SignUpLabel>비밀번호</SignUpLabel>
            <InputBox style={passwordStyle}>
              <Input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  isPasswordValidate(e.target.value);
                  if (
                    isPasswordEquel(passwordRetype) &&
                    isPasswordValidate(e.target.value)
                  ) {
                    setPasswordStyle({ borderColor: "#c4e7c4" });
                  }
                }}
              />
            </InputBox>
          </InputForm>

          <InputForm>
            <SignUpLabel>비밀번호 확인</SignUpLabel>
            <InputBox style={passwordStyle}>
              <Input
                type="password"
                onChange={(e) => {
                  setPasswordRetype(e.target.value);
                  isPasswordEquel(e.target.value);
                  if (
                    isPasswordEquel(e.target.value) &&
                    isPasswordValidate(password)
                  ) {
                    setPasswordStyle({ borderColor: "#c4e7c4" });
                  }
                }}
              />
            </InputBox>
            <ValidateMsg hide={hidePasswordEquelFail}>
              비밀번호가 일치하지 않습니다.
            </ValidateMsg>
            <ValidateMsg hide={hidePasswordFail}>
              비밀번호는 최소 8자 이상, 알파벳과 숫자 및 특수문자를 포함해야
              합니다.
            </ValidateMsg>
          </InputForm>

          <InputForm>
            <SignUpLabel>이름</SignUpLabel>
            <InputBox style={nameStyle}>
              <Input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                  nameCheck(e.target.value);
                }}
              />
            </InputBox>
            <ValidateMsg hide={hideNameFail}>
              이름은 필수입력입니다.
            </ValidateMsg>
          </InputForm>

          <SignUpButton onClick={submit}>가입하기</SignUpButton>
        </SignUpBody>
      </SignUpForm>
    </ModalBackdrop>
  );
}

export default Signup;
