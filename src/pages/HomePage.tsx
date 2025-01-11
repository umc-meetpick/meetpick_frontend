import React from 'react';
import styled from 'styled-components';
import { MeetPickText } from '../components/MeetPickText'; 
import { Icon } from '@iconify/react';
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가

// 스타일 컴포넌트 정의
const HomePageWrapper = styled.div`
    font-family: Arial, sans-serif;
    text-align: left;
    padding: 20px;
`;

const TopNavbar = styled.div`
    font-family: Arial, sans-serif;
    text-align: left;
    display: flex; /* Flexbox로 설정 */
    justify-content: space-between; /* 두 요소를 양쪽 끝에 배치 */
    align-items: center; /* 세로로 중앙 정렬 */
`;

// 로그인 버튼 스타일 정의
const LoginButton = styled.button`
    display: inline-flex;
    padding: 3px 17px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    border: 1px solid #A5A5A5;
    background: white;
    color: #A5A5A5;
    font-family: "Pretendard Variable";
    font-size: 13px;
    font-weight: 400;
    line-height: 22px; /* 169.231% */
    text-align: center;
    cursor: pointer;
    position: relative;
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

const GroupEmoji = styled.div`
  width: 15px;
  height: 15px;
  position: relative;
  display: inline-block;
  margin-left: 3px; /* 텍스트와 간격 추가 */
  
  & div {
    position: absolute;
  }

  & div:nth-child(1) {
    width: 7.5px;
    height: 7px;
    left: 0;
    top: 1px;
    background: linear-gradient(137deg, #C09067 0%, #CC7F2E 100%);
  }

  & div:nth-child(2) {
    width: 7px;
    height: 7.5px;
    left: 7px;
    top: 7.5px;
    background: linear-gradient(313deg, #C48A53 0%, #B86E07 100%);
  }

  & div:nth-child(3) {
    width: 7.5px;
    height: 7.5px;
    left: 0;
    top: 7.5px;
    background: linear-gradient(123deg, #DEAD84 0%, #BC8C63 100%);
  }

  & div:nth-child(4) {
    width: 8px;
    height: 8px;
    left: 7px;
    top: 0;
    background: linear-gradient(321deg, #2764E7 0%, #36DFF1 100%);
  }
`;

const HomePage = () => {
    const navigate = useNavigate(); // 네비게이션 훅을 사용

    // 로그인 버튼 클릭 시 로그인 페이지로 이동
    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <HomePageWrapper>
            <TopNavbar>
                <MeetPickText /> <LoginButton onClick={handleLoginClick}>로그인</LoginButton>
            </TopNavbar>
            <SubTitle>숭실대학교에서 나와 맞는 <span>메이트</span>를 찾아보세요 😉</SubTitle>
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
                    <CardDescription>운동하기 심심할 때? 운동 메이트와 함께!</CardDescription>
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
                        <GroupEmoji>
                        <div />
                            <div />
                            <div />
                            <div />
                        </GroupEmoji> 
                    </CardTitle>
                    <CardDescription>자취러, 기숙사러 모여라!</CardDescription>
                    <Button> <GoArrowRight /> </Button>
                </Card>
            </CardContainer>
        </HomePageWrapper>
    );
};

export default HomePage;
