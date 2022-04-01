import react, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineConsoleSql, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import localShopInfo from "../../dummy/localShopInfo";
import dummyKakaoShops from "../../dummy/dummyKakaoShops";
const Container = styled.div``;

const EditorPickHeader = styled.div`
  height: 200px;
  border: 1px solid black;
  text-align: center;
  div {
    height: 50px;
    line-height: 130px;
  }
`;

const ShopComponent = styled.div`
  display: flex;
  width: 800px;
  height: 300px;
  border: 1px solid black;
  margin: 0 auto;
  .shop_info1 {
    border: 1px solid black;
    width: 300px;
    height: 300px;
  }
  .shop_info2{
    border: 1px solid black;
  }
  img {
    width: 300px;
    height: 300px;
    margin:0 auto;
  }
  .review {
    border: 1px solid black;
    height: 200px ;
    display: flex ;
     img {
       width:50px;
       height:50px;
       border-radius:50% ;
     }
  }

  .shop_name {
    height: 100px;
    display: flex ;
    justify-content:space-between ;
  }

  #favorite {
    text-align: right ;
    border:1px solid black ;

  }
  .staricon {
     font-size:40px;
     color:gainsboro;
     margin: 10px;
  }
}
`;
const EditorPick = ({ match }) => {
  const dispatch = useDispatch();
  const y = match.params.code.split(",")[0];
  const x = match.params.code.split(",")[1];
  const name = match.params.code.split(",")[2];
  const description = match.params.code.split(",")[3];
  const [shopDetailInfo, setShopDetailInfo] = useState([
    { shoppic: [], menulist: [] },
    { shoppic: [], menulist: [] },
    { shoppic: [], menulist: [] },
    { shoppic: [], menulist: [] },
    { shoppic: [], menulist: [] },
    { shoppic: [], menulist: [] },
    { shoppic: [], menulist: [] },
    { shoppic: [], menulist: [] },
    { shoppic: [], menulist: [] },
    { shoppic: [], menulist: [] },
    { shoppic: [], menulist: [] },
    { shoppic: [], menulist: [] },
    { shoppic: [], menulist: [] },
    { shoppic: [], menulist: [] },
    { shoppic: [], menulist: [] },
  ]);
  const [shopInfo, setShopInfo] = useState(dummyKakaoShops);
  const currentLocationShops = useSelector(
    (state) => state.currentLocationShops
  );
  const currentLocationShopPics = useSelector(
    (state) => state.currentLocationShopPics
  );

  useEffect(() => {
    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=FD6&page=1&size=15&sort=accuracy&x=${x}&y=${y}&radius=2000`,
        {
          headers: {
            Authorization: "KakaoAK 2af87592ef59bb8f2f504dc1544a0a89",
          },
        }
      )
      .then((res) => {
        setShopInfo(res.data.documents);

        axios
          .post(
            "https://localhost:4000/data",
            { data: res.data.documents },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            setShopDetailInfo(res.data.data.result);
            const shopMapIds = res.data.documents.map((obj) => {
              return obj.id;
            });
            axios
              .post(
                "https://localhost:4000/shopmanyinfo",
                {
                  map_ids: shopMapIds,
                },
                {
                  withCredentials: true,
                }
              )
              .then((res) => {
                // console.log(res.data.data);
                const shopData = res.data.data.filter((obj) => {
                  if (obj !== null) {
                    return obj;
                  }
                });
                // console.log(shopData);
                dispatch({
                  type: "current_location_shops",
                  data: shopData,
                });
                const shopIds = shopData.map((obj) => {
                  return obj.id;
                });
                // console.log(shopIds);
                axios
                  .post(
                    "https://localhost:4000/shopmanypics",
                    {
                      shop_ids: shopIds,
                    },
                    { withCredentials: true }
                  )
                  .then((res) => {
                    // console.log(res.data.data);
                    dispatch({
                      type: "current_location_shop_pics",
                      data: res.data.data,
                    });
                  });
              });
          });
      });
  }, []);
  // console.log(shopInfo);
  // console.log(shopDetailInfo);
  return (
    <Container>
      <EditorPickHeader>
        <div>{name}</div>
        <div>{description}</div>
      </EditorPickHeader>

      {shopInfo.map((obj, i) => {
        return (
          <ShopComponent>
            <div className="shop_info1">
              <img src={shopDetailInfo[i].shoppic[0]}></img>
            </div>
            <div className="shop_info2">
              <div className="shop_name">
                <div>
                  <div>{`${i + 1}. ${obj.place_name}`}</div>
                  <div>{obj.road_address_name}</div>
                </div>

                <div id="favorite">
                  <AiOutlineStar className="staricon" />
                </div>
              </div>
              <div className="review">
                <div>
                  <img src="http://cdn.tgdaily.co.kr/news/photo/202007/301112_61338_3647.png" />
                </div>
                <div>
                  코랄 여기를 가면 피칸테 피자를 먹어야 합니다.! 자신있게 추천
                  간고기가 올라간 매콤한 화덕 피자인데 입에 쫙쫙 붙는 맛이고
                  도우도 쫀득하고..
                  <div>
                    <Link to={`/shopdetail/${currentLocationShops[i]?.id}`}>
                      더보기
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ShopComponent>
        );
      })}
    </Container>
  );
};

export default EditorPick;
