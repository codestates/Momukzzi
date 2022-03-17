import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Provider, useSelector, useDispatch, connect } from "react-redux";

const SignUpForm = styled.div`
  margin: 0 auto;
  width: 550px;
  height: 600px;
  font-weight: 700;
  text-align: left;
  transform: translateY(20%);
  border: 1px solid black;
`;

const Div = styled.div`
  margin: 0 auto;
  width: 440px;
  border: 1px solid black;
  transform: translateY(20%);
`;

const InputForm = styled.div`
  margin: 0 auto;
  margin: 5px;
`;
const ValidateMsg = styled.div`
  display: ${(props) => (props.hide ? "none" : "")};
  margin: 5px;
`;

const Input = styled.input`
  width: 390px;
  border-style: none;
  height: 39px;
  padding-left: 5px;
  font-size: 13px;
  :focus {
    outline: none;
  }
`;

const InputBox = styled.div`
  width: 430px;
  height: 40px;
  border: solid 2px gainsboro;
`;

const SignUpButton = styled.div`
  width: 430px;
  height: 45px;
  margin: 30px auto 0 auto;
  border: solid 1px gainsboro;
  text-align: center;
  background-color: #2a2a2a;
  color: white;
  cursor: pointer;
  line-height: 40px;
`;

function Signup() {
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

  const isMoreThan4Length = () => {
    if (userId.length < 4) {
      setHideLengthFail(() => false);
      return false;
    } else {
      setHideLengthFail(() => true);
      return true;
    }
  };

  const onlyNumberAndEnglish = () => {
    if (/^[A-Za-z][A-Za-z0-9]*$/.test(userId)) {
      setHideIDFail(() => true);
      return true;
    } else {
      setHideIDFail(() => false);
      return false;
    }
  };

  // const idCheck = () => {
  //   axios
  //     .post(`${process.env.REACT_APP_API_URL}/user/checkid`, {
  //       userid: userId,
  //     })
  //     .then((response) => {
  //       if (response.data.message === "exist") {
  //         setHideIDCheckFail(false);
  //       } else if (response.data.message === "new") {
  //         setHideIDCheckFail(true);
  //       }
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  //   console.log(hideIDCheckFail);
  // };

  const isEmailValidate = () => {};
  const isPasswordEquel = () => {
    if (password === passwordRetype) {
      setHidePasswordEquelFail(() => true);
      return true;
    } else {
      setHidePasswordEquelFail(() => false);
      return false;
    }
  };

  const isPasswordValidate = () => {
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      setHidePasswordFail(() => true);
      return true;
    } else {
      setHidePasswordFail(() => false);
      return false;
    }
  };

  const nameCheck = () => {
    if (name === "") {
      setHideNameFail(() => false);
      return false;
    } else {
      setHideNameFail(() => true);
      return true;
    }
  };

  const history = useHistory();

  const submit = () => {
    if (
      isMoreThan4Length() &&
      onlyNumberAndEnglish() &&
      isPasswordEquel() &&
      isPasswordValidate() &&
      nameCheck()
      // idCheck() &&
    ) {
      
      axios
        .post(`${process.env.REACT_APP_API_URL}/user/signup`, {
          userid: userId,
          password: password,
          fullname: name,
        })
        .then((response) => {
          history.push("/");
        })
        .catch((err) => {
          throw err;
        });
    }
  };

  const isSignup = (callback) => {
    return new Promise((resolve, reject) => {
      resolve(callback);
    });
  };
  return (
    <SignUpForm>
      <Div>
        <InputForm>
          <div>아이디</div>
          <InputBox>
            <Input type="text" onChange={(e) => setUserId(e.target.value)} />
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
          <div>Email</div>
          <InputBox>
            <Input type="text" onChange={(e) => setEmail(e.target.value)} />
          </InputBox>
          <ValidateMsg hide={hideEmailFail}>
            올바른 이메일 형식을 입력해주세요
          </ValidateMsg>
        </InputForm>

        <InputForm>
          <div>비밀번호</div>
          <InputBox>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputBox>
        </InputForm>

        <InputForm>
          <div>비밀번호 확인</div>
          <InputBox>
            <Input
              type="password"
              onChange={(e) => setPasswordRetype(e.target.value)}
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
          <div>이름</div>
          <InputBox>
            <Input type="text" onChange={(e) => setName(e.target.value)} />
          </InputBox>
          <ValidateMsg hide={hideNameFail}>이름은 필수입력입니다.</ValidateMsg>
        </InputForm>

        <SignUpButton onClick={submit}>가입하기</SignUpButton>
      </Div>
    </SignUpForm>
  );
}

export default Signup;