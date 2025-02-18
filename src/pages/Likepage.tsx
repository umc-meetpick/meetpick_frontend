import { useState} from "react";
import BasicNavbar from "../components/navbar/BasicNavbar";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import RecommendBox from "../components/RecommendBox";
import { useFetchLikes } from "../apis/matchingRecommend/matchingHeart";

// ✅ 찜한 데이터 타입 정의
interface LikedMate {
  requestId: number;
  category: string;
  text1: string;
  text2: string;
  text3: string;
  number1: string;
  number2: string;
  $backgroundColor?: string;
  width?: string;
  color?: string;
  detail1?: string;
  detail2?: string;
  detail3?: string;
  detail4?: string;
  detail5?: string;
  detail6?: string;
}

const LikePage = () => {
  const [activeButton, setActiveButton] = useState("혼밥"); // 현재 활성화된 탭 상태
  const mateType = activeButton === "혼밥"? "혼밥" : activeButton === "운동"?  "운동" : "공부";

  // 서버에서 찜한 목록 불러오기
  const { data: likedMates=[], isLoading } = useFetchLikes(mateType);

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  return (
    <div>
      <BasicNavbar title="찜한 mate" before={true} />
      <Buttons>
        <Category active={activeButton === "혼밥"} onClick={() => handleButtonClick("혼밥")}>
          <Icon icon="fluent-color:food-20" width="15" height="15" />
          혼밥
        </Category>
        <Category active={activeButton === "운동"} onClick={() => handleButtonClick("운동")}>
          <Icon icon="fluent-color:sport-16" width="15" height="15" />
          운동
        </Category>
        <Category active={activeButton === "공부"} onClick={() => handleButtonClick("공부")}>
          <Icon icon="fluent-color:edit-24" width="15" height="15" />
          공부
        </Category>
      </Buttons>
      <BoxList>
        {isLoading ? (
          <NoMateText>로딩 중...</NoMateText>
        ) : likedMates.length === 0 ? (
          <NoMateText>찜한 메이트가 없습니다.</NoMateText>
        ) : (
          likedMates.map((data:LikedMate) => (
              <RecommendBox
              category={data.category}
              key={data.requestId}
              requestId={data.requestId}
              text1={data.text1}
              text2={data.text2}
              text3={data.text3}
              number1={data.number1}
              number2={data.number2}
              $backgroundColor={data.$backgroundColor}
              width="160px"
              color={data.color}
              detail1={data.detail1}
              detail2={data.detail2}
              detail3={data.detail3}
              detail4={data.detail4}
              detail5={data.detail5}
              detail6={data.detail6}
              />
            
          ))
        )}
      </BoxList>
    </div>
  );
};

export default LikePage;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  margin-left: 15px;
  margin-top:10px;
  z-index: 1000; /* 다른 요소 위로 배치 */
`;

const Category = styled.button<{ active: boolean }>`
  position: relative;
  border: 1px solid ${(props) => (props.active ? "#1A6AFF" : "#E5E6E9")};
  background-color: ${(props) => (props.active ? "#1A6AFF" : "white")};
  color: ${(props) => (props.active ? "white" : "black")};
  border-radius: 100px;
  width: 68px;
  height: 32px;
  font-size: 13px;
  font-weight: 400;
  padding: 0 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;

const BoxList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding:0 20px;
`;

const NoMateText = styled.div`
  display:flex;
  width:330px;
  justify-content:center;
  height:300px;
  align-items:center;
`