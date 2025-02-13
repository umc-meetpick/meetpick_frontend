import { useState, useEffect } from "react";
import BasicNavbar from "../components/navbar/BasicNavbar";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import RecommendBox from "../components/RecommendBox";
import { recommendData } from "../data/recommendData"; // 전체 데이터를 불러옴
import { ExerciserecommendData } from "../data/exerciseRecommendData";
import { StudyrecommendData } from "../data/studyRecommendData";

const LikePage = () => {
  // 카테고리별 찜한 목록 저장하는 상태
  const [favorites, setFavorites] = useState<{ [key: string]: any[] }>({
    exercise: [],
    food: [],
    study: [],
  });

  const [activeButton, setActiveButton] = useState("혼밥"); // 현재 활성화된 탭 상태

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  useEffect(() => {
    console.log("📌 localStorage 변경 감지됨 → 찜 목록 업데이트!");

    const storedFavorites: { [key: string]: any[] } = {
      exercise: [],
      food: [],
      study: [],
    };

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("heart_")) {
        const isFavorite = JSON.parse(localStorage.getItem(key) || "false");
        if (isFavorite) {
          // 키에서 카테고리와 id 추출 (예: heart_food_1 -> food, 1)
          const parts = key.split("_");
          if (parts.length === 3) {
            const category = parts[1]; // "exercise" | "food" | "study"
            const mateId = parts[2]; // ID 값

            // recommendData에서 해당 ID에 맞는 데이터 찾기
            const foundData = 
            category === "food" ? recommendData.find((item)=> item.requestId === parseInt(mateId))
            :category ==="exercise"? ExerciserecommendData.find((item)=> item.requestId === parseInt(mateId))
            : StudyrecommendData.find((item)=> item.requestId === parseInt(mateId));

             // **📌 foundData가 존재하면 해당 카테고리에 추가**
            if (foundData) {
              storedFavorites[category].push(foundData);
            }
          }
        }
      }
    }
    setFavorites(storedFavorites);
  }, []);

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
        {favorites[activeButton === "혼밥" ? "food" : activeButton === "운동" ? "exercise" : "study"].length === 0 ? (
          <NoMateText>찜한 메이트가 없습니다.</NoMateText>
        ) : (
          favorites[activeButton === "혼밥" ? "food" : activeButton === "운동" ? "exercise" : "study"].map((data) => (
            <RecommendBox
              category={data.category}
              key={data.id}
              requestId={data.requestId}
              text1={data.text1}
              text2={data.text2}
              text3={data.text3}
              number1={data.number1}
              number2={data.number2}
              $backgroundColor={data.$backgroundColor}
              width={data.width}
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
    padding:0 30px;
`;

const NoMateText = styled.div`
  display:flex;
  width:330px;
  justify-content:center;
  height:350px;
  align-items:center;
`