import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoImage from '../assets/images/MeetPickLogo.png'
import mateImage from '../assets/images/MateImage.png'
import Slider from '../components/Slider'
import { useLocation } from "react-router-dom";
import { Icon } from '@iconify/react';
import { GoArrowRight } from "react-icons/go";


const LookingMate = () => {

  const location = useLocation();
  const universityName = location.state?.universityName || "대학교";

    return (
        <LookingPageWrapper>
            <TopNavbar>
                <LogoIcon src={logoImage}/>
            </TopNavbar>
            <SubTitle>
                {universityName}에서 
                <br className="break" /> {/* 줄바꿈 추가 */}
                나와 맞는 <span>메이트</span>를 찾아보세요 😉
            </SubTitle>
            <CardContainer>
              <Container1>
                {/* 혼밥 카드 */}
                <Card>
                  <Link to ="/recommend/food">
                    <CardTitle>
                      혼밥 구제 <Icon icon="fluent-color:food-20" width="24" height="24" />
                    </CardTitle>
                    <CardDescription>취향에 맞는 혼밥 메이트 찾아보세요!</CardDescription>
                    <Button>
                      <GoArrowRight />
                    </Button>
                  </Link>
                </Card>

                {/* 공부 카드 */}
                <Card>
                  <Link to = "/recommend/study">
                    <CardTitle>
                      열심히 공부 <Icon icon="fluent-color:edit-24" width="24" height="24" />
                    </CardTitle>
                    <CardDescription>같이 공부할 때, 집중력 UP!</CardDescription>
                    <Button>
                      <GoArrowRight />
                    </Button>
                  </Link>
                </Card>
              </Container1>
                
              <Container2>
                {/* 운동 카드 */}
                <Card $align="center" $justify="center">
                   <Link to ="/recommend/exercise">
                    <CardTitle>
                      함께 운동 <Icon icon="fluent-color:sport-16" width="24" height="24" />
                    </CardTitle>
                    <CardDescription>운동하기 심심할 때는? 운동 메이트와 함께!</CardDescription>
                    <Button>
                      <GoArrowRight />
                    </Button>
                  </Link>
                </Card>
              </Container2> 
            </CardContainer>
            <CategorySection>
                  <SectionTitle><span>Pick!</span>&nbsp;실시간 메이트 찾아보기🔥</SectionTitle>
                  <CategoryTabs>
                      <CategoryTab $active>혼밥</CategoryTab>
                      <CategoryTab>운동</CategoryTab>
                      <CategoryTab>공부</CategoryTab>
                      <CategoryTab>전체</CategoryTab>
                  </CategoryTabs>
                  <Slider>
                    {[1, 2, 3, 4].map((_, index) => (
                      <div key={index}>
                        <MateCard>
                          <MateCardInfo1>
                            <MateCardTitle>{universityName}</MateCardTitle> 
                            <MateImage src={mateImage} alt="mate profile" />
                            </MateCardInfo1>
                          <MateCardInfo2>
                            <TagContainer>
                              <Tag>여성</Tag>
                              <Tag>20학번</Tag>
                              <Tag>자연과학계열</Tag>
                            </TagContainer>
                            <MateMessage>
                              같이 고기 구워먹어요~! 🥩
                            </MateMessage>
                          </MateCardInfo2>
                        </MateCard>
                      </div>
                    ))}
                  </Slider>
            </CategorySection>
        </LookingPageWrapper>
    );
};

export default LookingMate;

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
  display: flex;
  flex-direction: row;
  max-width: 600px;
  gap: 5px;
`;

const Container1 = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(2, auto); /* 두두 행 */
    gap: 10px;
    max-width: 300px;
`;

const Container2 = styled.div`
    margin-left: 5px;
    display: flex;
    grid-template-columns: repeat(1, 1fr);
    max-width: 300px;
`;

const Card = styled.div<{ $align?: string; $justify?: string }>`
    max-width: 156px;
    background-color: #eef5fe;
    padding: 5px 20px;
    border-radius: 8px;
    position: relative; /* 상대적 위치 설정 */
    height:156px;

    /* 위치 조정 */
    align-self: ${({ $align }) => $align || "auto"};
    justify-self: ${({ $justify }) => $justify || "auto"};
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
    font-weight: 700;
`;

const CardDescription = styled.p`
    font-size: 12px;
    font-family: "Pretendard Variable";
    color: #222222;
    margin-bottom: 20px;
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


const CategoryTab = styled.button<{ $active?: boolean }>`
  border: 1px solid #d9d9d9;
  padding: 5px 15px;
  background-color: #ffffff;
  border-radius: 50px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  font-family: "Pretendard Variable";
  color: #000000;

  border: ${(props) => (props.$active ? "1px solid #007AFF" : "1px solid #D9D9D9")};
  color: ${(props) => (props.$active ? "#007AFF" : "#373E4B")};
  cursor: pointer;
  font-size: 14px;
`;


const MateCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  padding: 0 15px;
  margin: 20px 0;
  display: flex;
  align-items: left;
  flex-direction: row; /* 세로로 배치 */
`;

const MateCardInfo1 = styled.div`
  padding: 0 20px 0 15px;
  align-items: center;
  display: flex; /* 가로로 정렬 */
  flex-direction: column; /* 이미지와 설명을 가로로 배치 */
`;

const MateCardInfo2 = styled.div`
  align-items: center;
  display: flex; 
  justify-content: flex-start; /* 왼쪽 정렬 */
  flex-direction: column; 
`;

const MateCardTitle = styled.h3`
  margin-top: 20px;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 5px;
  text-align: center; /* 제목을 왼쪽 정렬 */
  word-wrap: break-word;  // 긴 텍스트가 넘칠 때 줄 바꿈
  word-break: break-word;  // 너무 긴 단어는 줄 바꿈
  white-space: normal; // 기본적으로 텍스트가 넘치면 자동으로 줄 바꿈
`;

const MateImage = styled.img`
  border-radius: 100px;
  border: 1px solid #E1E2E6;
  width: 60px;
  height: 60px;
`;

const TagContainer = styled.div`
  margin-top: 12px;
  flex-direction: row;
  display: flex;
  gap: 4px;
  margin-bottom: 10px;
  justify-content: left;
  align-items: left;
  flex-wrap: wrap; /* 줄 바꿈 가능 */
`;

const Tag = styled.span`
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 100px;
  border: 0.8px solid #E1E2E6;
  padding: 0px 10px;
  font-size: 10.5px;
  color: #555;
  font-weight: 500;
`;

const MateMessage = styled.div`
  width: 168px;
  height: 35px;
  background-color: #f9f9f9;
  border-radius: 7px;
  margin-bottom: 15px;
  padding: 10px;
  display: flex;
  align-items: center;
  font-size: 11.5px;
  font-weight: 500;
  color: #60656F;
`;
