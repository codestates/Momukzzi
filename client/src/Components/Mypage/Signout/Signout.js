import React, { useState } from "react";
import axios from "axios";
import { Out } from "./Signout.style";

function Signout({ close }) {
  const accessToken = localStorage.getItem("accessToken");

  const [agreeChecked, setAgreeChecked] = useState(false);
  const [fillinText, setFillinText] = useState("");

  const agreeCheckHandler = () => {
    setAgreeChecked(!agreeChecked);
  };
  const fillinCheckHandler = (e) => {
    setFillinText(e.target.value);
  };

  const signoutSubmitHandler = () => {
    if (!accessToken) {
      return;
    }
    axios
      .delete(`${process.env.REACT_APP_API_URL}/users`, {
        headers: { authorization: `Bearer ${accessToken}` },
        "Content-Type": "application/json",
      })
      .then((res) => {
        console.log("회원탈퇴성공");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("email");
        alert("회원 탈퇴가 완료되었습니다.");
        // openAlertHandler();
        window.location.replace("/");
      })
      .catch((err) => {
        alert("잘못된 요청입니다");
        // openWarningAlertHandler();
        console.log("회원탈퇴실패", err);
      });
  };
  return (
    <>
      <Out.ModalBackdrop
        onClick={() => {
          close();
        }}
      >
        <Out.Container onClick={(e) => e.stopPropagation()}>
          <Out.ContentContainer>
            <Out.Title>탈퇴 안내</Out.Title>
            <Out.ContentText>
              회원탈퇴를 신청하기 전에 안내사항입니다. <br />
              오늘 뭐먹지에서 등록하셨던 개인정보는 모두 삭제되며, 다시 복구 할
              수 없습니다.
            </Out.ContentText>
            <br />

            <Out.ContentText>
              회원탈퇴 전에 안내사항을 확인해주세요.
            </Out.ContentText>
            <Out.CheckboxContainer>
              <input
                className="checkbox-input-check"
                type="checkbox"
                onClick={agreeCheckHandler}
              />
              <div className="checkbox-agree-text">
                안내사항에 동의하면 체크해주세요.
              </div>
            </Out.CheckboxContainer>
            <Out.MiddleContainer>
              <div className="fillin-text">[회원탈퇴]를 입력해주세요.</div>
              <input className="fillin-input" onChange={fillinCheckHandler} />
            </Out.MiddleContainer>
            <div>
              <Out.SubmitButtonDiv>
                {agreeChecked === true && fillinText === "회원탈퇴" ? (
                  <button
                    className="submit"
                    disabled={false}
                    onClick={signoutSubmitHandler}
                  >
                    탈퇴하기
                  </button>
                ) : (
                  <button className="submit" disabled={true}>
                    탈퇴하기
                  </button>
                )}
                <button
                  className="cancel"
                  onClick={() => window.location.replace("/")}
                >
                  취소 (홈으로)
                </button>
              </Out.SubmitButtonDiv>
            </div>
          </Out.ContentContainer>
        </Out.Container>
      </Out.ModalBackdrop>
    </>
  );
}

export default Signout;
