import { useState, useEffect} from "react";
import BasicNavbar from "../components/navbar/BasicNavbar";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import RecommendBox from "../components/RecommendBox";
import { useFetchLikes } from "../apis/matchingRecommend/matchingHeart";


const LikePage = () => {
  const [activeButton, setActiveButton] = useState("혼밥"); // 현재 활성화된 탭 상태
  const mateType = activeButton === "혼밥"? "혼밥" : activeButton === "운동"?  "운동" : "공부";
  

  // 서버에서 찜한 목록 불러오기
  const { data: likedMates=[], isLoading } = useFetchLikes(mateType);

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  useEffect(() => {
    console.log("🔍 찜한 목록 데이터:", likedMates);
}, [likedMates]);


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
          likedMates.flat().map((data: any) => (
            <RecommendBox
                category="혼밥"
                key={data.memberProfile.profileId}  // profileId를 requestId로 사용
                requestId={data.memberProfile.profileId}  // requestId가 필요한 곳에 매핑
                text1={data.memberProfile.nickName}
                text2={`# ${data.memberProfile.gender} # ${data.memberProfile.profileAge}`}
                text3={`# ${data.memberProfile.studentNumber} # ${data.memberProfile.mbti}`}
                number1={"0"} // 기본값 설정
                number2={"3"} // 기본값 설정
                $backgroundColor="#EEF5FD"
                width="160px"
                color="#5D5D5D"
                detail1={data.gender}
                detail2={data.isPeer}
                detail3={data.foodTypes?.join(", ") || ""}
                detail4={`${data.age}살`}
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