import react from "react";
import styled from "styled-components";

const HashtagContainer = styled.div`
  border: 1px solid black;
  height: 100px;
  display: flex;
  align-items: center;
`;

const Tag = styled.div`
  border: 1px solid black;
  width: 100px;
  height: 50px;
  border-radius: 25px;
  margin: auto 15px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
`;

const Hashtag = () => {
  const dummy = ["양식", "일식", "중식", "한식", "우리지역"];
  return (
    <HashtagContainer>
      {dummy.map((data, i) => {
        return <Tag key={i}>{`# ${data}`}</Tag>;
      })}
    </HashtagContainer>
  );
};

export default Hashtag;
