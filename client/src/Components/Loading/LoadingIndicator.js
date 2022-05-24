import react from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules

import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  width: 1600px;
  height: 700px;
`;
const Title = styled.div`
  height: 50px;
`;
const SlideContainer = styled.div`
  height: 650px;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const SlideSkeleton = styled.div`
  width: 500px;
  height: 300px;
  border-radius: 10px;

  background: #f1f3f5;
`;
const LoadingIndicator = () => {
  return (
    <>
      <Container>
        <Title></Title>
        <SlideContainer>
          <SlideSkeleton />
          <SlideSkeleton />
          <SlideSkeleton />
          <SlideSkeleton />
          <SlideSkeleton />
          <SlideSkeleton />
        </SlideContainer>
      </Container>
    </>
  );
};

export default LoadingIndicator;
