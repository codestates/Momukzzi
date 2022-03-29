import react from "react";
import styled from "styled-components";

const SlideTopicContainer = styled.div`
  width: 1300px;
  height: 475px;
  border: 1px solid black;
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const SlideTopicShop = styled.div`
  width: 300px;
  height: 235px;
  border: 1px solid black;
`;
const SlideTopicImage = styled.img`
  width: 300px;
  height: 235px;
  border: 1px solid black;
`;

const SlideTopic = () => {
  return <SlideTopicContainer></SlideTopicContainer>;
};

export default SlideTopic;
