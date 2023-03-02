import styled from "styled-components";
import ChangeMyinfo from "./ChangeMyinfo/ChangeMyinfo";
import Myreview from "./Myreview/Myreview";
import Cookies from "js-cookie";

const MypageContainer = styled.div`
  padding: 10px;
  font-size: 14px;
  word-break: keep-all;
  min-height: 81vh;
  overflow: auto;
  min-width: 900px;
`;
const MypageLeftContainer = styled.div`
  width: 50%;
  margin: 0 auto;
`;
const MypageTitle = styled.div`
  background-color: #f0c83d;
  font-size: 20px;
  padding: 3px 0;
  width: 200px;
  text-align: center;
  color: white;
  border-radius: 20px;
  margin-top: 30px;
  margin-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
`;
const MypageRightContainer = styled.div`
  margin: 0 auto;
`;
const MypageReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid white;
  margin-right: 400px;
  width: 50%;
  margin: 0 auto;
`;
const MypageMyinfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin-bottom: 15px;
`;

const Myinfo = () => {
  return (
    <>
      {Cookies.get("accessToken") ? (
        <MypageContainer>
          <MypageTitle>마이페이지</MypageTitle>
          <MypageLeftContainer>
            <MypageMyinfoContainer>
              <ChangeMyinfo />
            </MypageMyinfoContainer>
          </MypageLeftContainer>
          <MypageRightContainer>
            <MypageReviewContainer>
              <Myreview />
            </MypageReviewContainer>
          </MypageRightContainer>
        </MypageContainer>
      ) : (
        <div>로그인을 해주세요.</div>
      )}
    </>
  );
};
export default Myinfo;
