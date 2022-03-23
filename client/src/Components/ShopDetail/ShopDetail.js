import React from "react";
import {
  ShopHeader,
  ShopImages,
  ShopBody,
  ShopBasicInfo,
  ShopBasicInfoHeader,
  ShopDetailInfo,
  ShopReview,
  ShopLocation,
  Buttons,
  ReviewButton,
  ReviewIcon,
  FavoriteButton,
} from "./ShopDetail.style";
import { useEffect } from "react";
import axios from "axios";

/*global kakao*/

//TODO: <nav> - <ShopImages> - <ShopBody> + <map> - <footer>

//TODO: 이미지 어떻게 가져올 것인가? 음식점 정보를 redux 상태로 관리 - 상세정보 및 이미지들 받아오기 , 카카오맵 지도

//TODO: Modal Component 2개 필요할 듯, 이미지 클릭 / 리뷰 클릭 (사진 여러개 때문)

export default function ShopDetail() {
  useEffect(() => {
    // 카카오 map 객체 생성
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(37.63462628004234, 126.83257800122841),
      level: 3,
    };
    var map = new kakao.maps.Map(container, options);
  }, []);

  const handleStar = () => {
    // 즐겨찾기 true or false, 별모양 빈거/채워진거
    // axios.post()
    console.log("hello");
  };

  // ShopHeader - 임시 <nav>

  return (
    <>
      <ShopHeader>Momukzzi</ShopHeader>

      <ShopImages>
        {/* map 함수 사용. 메인페이지에서도 쓴다면 새 컴포넌트로 분할? */}
        <img src="https://www.canceranswer.co.kr/news/photo/202103/2199_3592_056.jpg" />
        <img src="https://t1.daumcdn.net/thumb/R720x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/8HVV/image/5myTVbYI5dTqDxySE9mmlwlze3s.png" />
        <img src="https://w.namu.la/s/1bfbdabde6f79ac2f05843636edaa87a8e03419bf86205eabe0e33e76c16b1a02be6d9458d5fe7ab418ce21dc1eb3a831f20c8ba793514b71773858a625cdb63f8a2e67d5afe0de42f187499c7058d48a8414df8a68a31ab9d4bf7c70448e028" />
        <img src="https://ww.namu.la/s/e807d34001fcd78d9a00e07234d2b0c7bb06f117dc750ee2add18c43db878cd361dc63fde7c8d35e62deb806b1bf6cf33a1d280a7867ebc1a4ad6ce1b31f4d12de6a6bb3014e627981a698dfec1f03d6cdc9f03b3886c88317b57082217153db" />
        <img src="https://www.canceranswer.co.kr/news/photo/202103/2199_3592_056.jpg" />
        <img src="https://www.canceranswer.co.kr/news/photo/202103/2199_3592_056.jpg" />
      </ShopImages>
      <ShopBody>
        <ShopBasicInfo>
          <ShopBasicInfoHeader>
            <span>가게이름</span>
            <span>평점</span>
            {/*클릭 시 리뷰 페이지로 이동*/}
            {/* <Link to="/"> */}
            <Buttons>
              <ReviewButton>
                <ReviewIcon />
                <span>리뷰</span>
              </ReviewButton>
              {/* </Link> */}

              {/*클릭 시 즐겨찾기 등록 or 해제 */}
              <FavoriteButton onClick={handleStar}>즐겨찾기</FavoriteButton>
            </Buttons>
          </ShopBasicInfoHeader>
          {/* table tag (th,td) 활용 */}
          <ShopDetailInfo>가게 상세 info</ShopDetailInfo>

          <ShopReview>
            리뷰들
            <div>안녕하세요</div>
            <div>리뷰1</div>
            <div>리뷰2</div>
            <div>리뷰3</div>
            <div>리뷰4</div>
          </ShopReview>
        </ShopBasicInfo>
        <ShopLocation id="map"></ShopLocation>
      </ShopBody>
    </>
  );
}
