import React from 'react';
import styled from 'styled-components';
import logoImage from '../assets/images/MeetPickLogo.png'
import mateImage from '../assets/images/MateImage.png'
import Slider from '../components/Slider'
import GroupIcon from '../components/GroupIcon'
import { Icon } from '@iconify/react';
import { GoArrowRight } from "react-icons/go";

// 스타일 컴포넌트 정의
const LookingPageWrapper = styled.div`
    font-family: Arial, sans-serif;
    text-align: left;
    padding: 20px;
`;

const TopNavbar = styled.div`
    text-align: left;
    padding-left: 0; /* 왼쪽 간격을 없앰 */
`;

const LogoIcon = styled.img`
  width: 137px;
  height: 37px;    
  object-fit: cover;
  margin-left: -15px; /* 로고를 왼쪽으로 더 이동 */
`;

const SubTitle = styled.p`
    font-size: 20px;
    color: #000000;
    margin-bottom: 40px;
    font-family: "Pretendard Variable";
    text-align: left;
    font-weight: 700;

    // '메이트'만 파란색으로 강조
    & span {
        color: #007aff;
        font-weight: 700;
        font-family: "Pretendard Variable";
    }

    /* 줄바꿈을 적용할 스타일 */
    .break {
        display: block;
    }
`;

const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

const Card = styled.div`
    background-color: #eef5fe;
    padding: 20px;
    border-radius: 8px;
    position: relative; /* 상대적 위치 설정 */
`;

const CardTitle = styled.h2`
    font: pretendard variable;
    font-size: 17px;
    font-family: "Pretendard Variable";
    color: #000000;
    display: flex;
    align-items: left;
    justify-content: left;
    gap: 3px; /* 아이콘과 텍스트 간 간격 */
`;

const CardDescription = styled.p`
    font-size: 12px;
    font-family: "Pretendard Variable";
    color: #222222;
    margin-bottom: 30px;
    text-align: left;
    font-weight: 400;

`;

const Button = styled.button`
    padding: 0px 5px;
    background-color: #eef5fe;
    color: grey;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 28px;
    position: absolute; /* 절대적 위치 설정 */
    bottom: 5px; /* 하단 20px */
    right: 5px; /* 오른쪽 20px */
`;

const GroupIconContainer = styled.div`
  width: 20px;
  height: 20px;
  transform: scale(0.67); /* 크기 조정 비율 */
`;

const CategorySection = styled.div`
  margin-top: 40px;
  text-align: left;
  padding: 3px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #000;
  font-family: "Pretendard Variable";
  align-items: center; /* 이미지와 텍스트 세로 정렬 */
  display: inline-flex; /* 텍스트와 이미지를 한 줄로 배치 */
  span {
    color: #1A6AFF;
  }
  
  img {
    margin-left: 1px; /* 이미지와 텍스트 간격 */
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 10px;
  justify-content: left;
`;


const CategoryTab = styled.button`
  border: 1px solid #d9d9d9;
  padding: 5px 15px;
  background-color: #ffffff;
  border-radius: 50px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  font-family: "Pretendard Variable";
  color: #000000;

  border: ${(props) => (props.active ? "1px solid #007AFF" : "1px solid #D9D9D9")};
  color: ${(props) => (props.active ? "#007AFF" : "#373E4B")};
  cursor: pointer;
  font-size: 14px;
`;

const MateCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  padding: 10px;
  margin: 20px 0;
  display: flex;
  align-items: left;
  flex-direction: column; /* 세로로 배치 */
`;

const MateCardInfo = styled.div`
  margin-left: 3px;
  align-items: center;
  width: 100%;
  display: flex; /* 가로로 정렬 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  flex-direction: row; /* 이미지와 설명을 가로로 배치 */
`;

const MateCardTitle = styled.h3`
  font-family: "Pretendard Variable";
  font-size: 16px;
  margin-bottom: 5px;
  margin-left: 10px;
  text-align: left; /* 제목을 왼쪽 정렬 */
`;

const MateImage = styled.img`
    margin-right: 10px;
    margin-bottom: 15px;
    border-radius: 100px;
    width: 60px;
    height: 60px;
`;

const MateCardDesc = styled.p`
  font-family: "Pretendard Variable";
  font-size: 14px;
  color: #555;
  display: inline-block; /* 이미지와 같은 줄에 배치 */
`;

const LookingMate = () => {
    
    // 로그인 상태를 확인하여 카테고리 선택 시 동작 구현 해야함함

    return (
        <LookingPageWrapper>
            <TopNavbar>
                <LogoIcon src={logoImage}/>
            </TopNavbar>
            <SubTitle>
                숭실대학교에서 
                <br className="break" /> {/* 줄바꿈 추가 */}
                나와 맞는 <span>메이트</span>를 찾아보세요 😉
            </SubTitle>
            <CardContainer>
                <Card>
                    <CardTitle>
                        혼밥 구제 <Icon icon="fluent-color:food-20" width="24" height="24" />
                    </CardTitle>
                    <CardDescription>취향에 맞는 혼밥 메이트 찾아보세요!</CardDescription>
                    <Button> <GoArrowRight /> </Button>
                </Card>
                <Card>
                    <CardTitle>
                        함께 운동 <Icon icon="fluent-color:sport-16" width="24" height="24" />
                    </CardTitle>
                    <CardDescription>운동하기 심심할 때는? 운동 메이트와 함께!</CardDescription>
                    <Button> <GoArrowRight /> </Button>
                </Card>
                <Card>
                    <CardTitle>
                        열심히 공부 <Icon icon="fluent-color:edit-24" width="24" height="24" />
                    </CardTitle>
                    <CardDescription>같이 공부할 때, 집중력 UP!</CardDescription>
                    <Button> <GoArrowRight /> </Button>
                </Card>
                <Card>
                    <CardTitle>
                        싸게 공구
                        <GroupIconContainer>
                            <GroupIcon size={30} /> 
                        </GroupIconContainer>
                    </CardTitle>
                    <CardDescription>자취러, 기숙사러 모여라!</CardDescription>
                    <Button> <GoArrowRight /> </Button>
                </Card>
            </CardContainer>
            <CategorySection>
                  <SectionTitle><span>Pick!</span>&nbsp;실시간 메이트 찾아보기🔥</SectionTitle>
                  <CategoryTabs>
                      <CategoryTab active>혼밥</CategoryTab>
                      <CategoryTab>운동</CategoryTab>
                      <CategoryTab>공부</CategoryTab>
                      <CategoryTab>공구</CategoryTab>
                  </CategoryTabs>
                  <Slider>
                    {[1, 2, 3, 4].map((_, index) => (
                      <div key={index}>
                        <MateCard>
                          <MateCardTitle>중앙대학교 메이트 {index + 1}</MateCardTitle>
                          <MateCardInfo>
                            <MateImage src={mateImage} alt="mate profile" />
                            <MateCardDesc>
                              좋아하는 음식 취향 성별 등을 카테고리로... 찾아봐!
                            </MateCardDesc>
                          </MateCardInfo>
                        </MateCard>
                      </div>
                    ))}
                  </Slider>
            </CategorySection>
        </LookingPageWrapper>
    );
};

export default LookingMate;