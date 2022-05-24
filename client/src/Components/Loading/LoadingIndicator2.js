import react from "react";
import styled from "styled-components";

const ShopComponent = styled.div`
  display: flex;
  width: 800px;
  
  margin: 15px auto;
  border-radius: 5px ;
  .staricon{
    font-size:40px;
    margin: 10px;
  }
  
  background: #f1f3f5;
}
`;

const ShopPhotoContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
`;

const ShopInfoContainer = styled.div`
  width: 500px;
`;

const ShopTitleContainer = styled.div`
  text-align: center;
  height: 100px;
  display: flex;
  justify-content: space-between;
`;

const LoadingIndicator2 = () => {
  return (
    <>
      <ShopComponent>
        <ShopPhotoContainer></ShopPhotoContainer>
        <ShopInfoContainer>
          <ShopTitleContainer></ShopTitleContainer>
        </ShopInfoContainer>
      </ShopComponent>
      <ShopComponent>
        <ShopPhotoContainer></ShopPhotoContainer>
        <ShopInfoContainer>
          <ShopTitleContainer></ShopTitleContainer>
        </ShopInfoContainer>
      </ShopComponent>
      <ShopComponent>
        <ShopPhotoContainer></ShopPhotoContainer>
        <ShopInfoContainer>
          <ShopTitleContainer></ShopTitleContainer>
        </ShopInfoContainer>
      </ShopComponent>
    </>
  );
};

export default LoadingIndicator2;
