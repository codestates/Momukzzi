import react, { useState } from "react";
import styled from "styled-components";

const SkeletonContainer = styled.div`
  width: 1600px;
  height: 300px;
  border-radius: 10px;
  background: #f1f3f5;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Message = styled.div`
  width: 1000px;
  height: 100px;
  margin: 0 auto;
  text-align: center;
  font-size: 16px;
`;

const LocationPermuteBtn = styled.div`
  width: 300px;
  height: 70px;
  color: white;
  background-color: #3e3e3e;
  border-radius: 5px;
  margin: 0 auto;
  text-align: center;
  line-height: 65px;
  font-size: 16px;
  cursor: pointer;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalForm = styled.div`
  margin: 0 auto;
  padding: 40px;
  width: 500px;
  height: 250px;
  transform: translateY(80%);
  border-radius: 5px;
  background-color: white;
  font-size: 14px;
`;

const ModalBtn = styled.div`
  width: 200px;
  height: 50px;
  text-align: center;
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 5px;
  background-color: #3e3e3e;
  color: white;
  line-height: 50px;
  cursor: pointer;
`;

const LocationLoading = () => {
  const [isModal, setIsModal] = useState(false);

  function handlePermission() {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(function (position) {});
        } else if (result.state === "denied") {
          setIsModal(true);
        }
      });
  }
  return (
    <>
      {isModal ? (
        <ModalBackdrop
          onClick={() => {
            setIsModal(false);
          }}
        >
          <ModalForm
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            현재 브라우저 위치정보가 꺼져 있습니다.<br></br> 현위치를 반영하기
            위해서는 이용하시는 브라우저의 위치정보를 '활성화' 시켜주시기
            바랍니다.<br></br>
            위치정보 활성화에 대한 자세한 안내는 이용하는 브라우저 제공사의
            고객센터에 확인 또는 문의하시기 바랍니다.
            <ModalBtn
              onClick={() => {
                setIsModal(false);
              }}
            >
              확인
            </ModalBtn>
          </ModalForm>
        </ModalBackdrop>
      ) : (
        ""
      )}
      <SkeletonContainer>
        <Message>
          사용자의 위치정보를 찾을 수 없습니다.<br></br>
          위치정보를 설정하시면 내주변의 맛집을 검색할 수 있습니다.
        </Message>
        <LocationPermuteBtn onClick={handlePermission}>
          현재 위치정보 켜기
        </LocationPermuteBtn>
      </SkeletonContainer>
    </>
  );
};

export default LocationLoading;
