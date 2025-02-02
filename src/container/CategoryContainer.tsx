import React from "react";
import styled from "styled-components";
import trust from '../assets/homeImg/trust.png';
import hotdog from '../assets/homeImg/hotdog.png';
import pencil from '../assets/homeImg/pencil.png';
import sparkling from '../assets/homeImg/sparkling.png';
import basketball from '../assets/homeImg/basketball.png';
import smiling from '../assets/homeImg/smiling.png';

// Container를 수정하여 한 번에 두 개의 SlidingContent를 보여줍니다.
const CategotyContainer = () => {
  return (
    <Container>
      <SlidingContent>
        <Content1 /> {/* 첫 번째 컨텐츠 */}
        <Content2 />
        <Content3 />
      </SlidingContent>
    </Container>
  );
};

// 반복할 컨텐츠를 하나의 컴포넌트로 추출
const Content1 = () => (
  <>
    <Row $shift={0}>
      <Emoji src={trust} alt="trust emoji" />
      <Category>새로운 친구를 만들고 싶을 때</Category>
      <Emoji src={hotdog} alt="hotdog emoji" />
      <Category>혼밥 하기 싫은 날에</Category>
      <Emoji src={trust} alt="trust emoji" />
      <Category>새로운 친구를 만들고 싶을 때</Category>
      <Emoji src={hotdog} alt="hotdog emoji" />
      <Category>혼밥 하기 싫은 날에</Category>
      <Emoji src={trust} alt="trust emoji" />
      <Category>새로운 친구를 만들고 싶을 때</Category>
      <Emoji src={hotdog} alt="hotdog emoji" />
      <Category>혼밥 하기 싫은 날에</Category>
      <Emoji src={trust} alt="trust emoji" />
      <Category>새로운 친구를 만들고 싶을 때</Category>
      <Emoji src={hotdog} alt="hotdog emoji" />
      <Category>혼밥 하기 싫은 날에</Category>
    </Row>
  </>
);

const Content2 = () => (
  <>
    <Row $shift={40}>
      <Emoji src={pencil} alt="pencil emoji" />
      <Category>공부에 집중이 안될 때</Category>
      <Emoji src={sparkling} alt="sparkling emoji" />
      <Category>특별한 하루를 보내고 싶을 때</Category>
      <Emoji src={pencil} alt="pencil emoji" />
      <Category>공부에 집중이 안될 때</Category>
      <Emoji src={sparkling} alt="sparkling emoji" />
      <Category>특별한 하루를 보내고 싶을 때</Category>
      <Emoji src={pencil} alt="pencil emoji" />
      <Category>공부에 집중이 안될 때</Category>
      <Emoji src={sparkling} alt="sparkling emoji" />
      <Category>특별한 하루를 보내고 싶을 때</Category>
      <Emoji src={pencil} alt="pencil emoji" />
      <Category>공부에 집중이 안될 때</Category>
      <Emoji src={sparkling} alt="sparkling emoji" />
      <Category>특별한 하루를 보내고 싶을 때</Category>
    </Row>
  </>
);

const Content3 = () => (
  <>
    <Row $shift={10}>
      <Emoji src={basketball} alt="basketball emoji" />
      <Category>같이 운동하고 싶을 때</Category>
      <Emoji src={smiling} alt="smiling emoji" />
      <Category>같이 공부하고 싶은 날에</Category>
      <Emoji src={basketball} alt="basketball emoji" />
      <Category>같이 운동하고 싶을 때</Category>
      <Emoji src={smiling} alt="smiling emoji" />
      <Category>같이 공부하고 싶은 날에</Category>
      <Emoji src={basketball} alt="basketball emoji" />
      <Category>같이 운동하고 싶을 때</Category>
      <Emoji src={smiling} alt="smiling emoji" />
      <Category>같이 공부하고 싶은 날에</Category>
      <Emoji src={basketball} alt="basketball emoji" />
      <Category>같이 운동하고 싶을 때</Category>
      <Emoji src={smiling} alt="smiling emoji" />
      <Category>같이 공부하고 싶은 날에</Category>
    </Row>
  </>
);

export default CategotyContainer;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

const SlidingContent = styled.div`
  width: calc(200%); /* 복제된 컨텐츠로 인해 너비가 두 배 */
  display: flex;
  flex-direction: column;
  animation: slideLeft 20s linear infinite;
  white-space: nowrap; /* 한 줄로 유지 */

  @keyframes slideLeft {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-120%);
    }
  }
`;

const Row = styled.div<{ $shift: number }>` // shift prop 타입 정의
  display: flex;
  justify-content: flex-start; /* 기본 왼쪽 정렬 */
  gap: 10px; /* 버튼 간 간격 */
  transform: translateX(${(props) => props.$shift}px); /* 행마다 시작 위치 이동 */
  white-space: nowrap; /* 행을 한 줄로 유지 */
`;

const Emoji = styled.img`
  margin-bottom: 34px;
  width: 40px;
  height: 40px;    
  object-fit: cover;
`;

const Category = styled.button`
  display: inline-block;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 100px;
  font-size: 13px;
  height: 44px; 
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  cursor: default; /* 커서가 눌리는 버튼 효과 제거 */
`;
