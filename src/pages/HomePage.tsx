import React from 'react';
import styled from "styled-components";
import { MeetPickText } from '../components/MeetPickText'; 
import { Icon } from "@iconify/react";
import { GoArrowRight } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import emojiImage from '../assets/images/EmojiBubble.png';
import mateImage from '../assets/images/MateImage.png'
import GroupEmoji from '../components/GroupIcon';


const Wrapper = styled.div`
  font-family: "Pretendard Variable", sans-serif;
  text-align: center;
  padding: 20px;
  background-color: #ffffff;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const LoginButton = styled.button`
  padding: 5px 20px;
  border: 1px solid #a5a5a5;
  background-color: white;
  color: #a5a5a5;
  border-radius: 50px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #e5e5e5;
  }
`;

const MainTitle = styled.h1`
  font-size: 28px;
  color: #000;
  margin: 10px 0 5px 0; /* 위쪽, 아래쪽 여백을 설정 */
  font-family: "Pretendard Variable";
  font-weight: 700;
`;

const SubTitle = styled.p`
    font-size: 20px;
    color: #454545;
    margin-top: 5px; /* 상단 여백을 줄여서 간격 좁힘 */
    margin-bottom: 40px;
    font-family: "Pretendard Variable";
    font-weight: 400;
`;


const EmojiContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  /* 수직 정렬 */
  gap: 20px;
  margin: 20px 0;
  flex-wrap: wrap;  /* 여러 줄로 배치되도록 설정 */
  position: relative;
`;

const EmojiBubble1 = styled.div`
  width: 90px;
  height: 91px;
  font-size: 50px;
  padding: 10px;

  background-image: url(${emojiImage}); /* 이미지 경로 변경 */
  background-size: cover; /* 이미지 크기를 요소에 맞게 조정 */
  background-position: center; /* 이미지가 중앙에 오도록 설정 */

  position: absolute;
  top: 0px; /* 상단 위치 */
  left: 50px; /* 왼쪽 위치 */
`;

const EmojiBubble2 = styled.div`
  width: 90px;
  height: 91px;
  position: absolute;
  top: 50px;
  left: 170px;
  font-size: 50px;
  padding: 10px;

  background-image: url(${emojiImage}); /* 이미지 경로 변경 */
  background-size: cover; /* 이미지 크기를 요소에 맞게 조정 */
  background-position: center; /* 이미지가 중앙에 오도록 설정 */
  transform: scaleX(-1); /* 좌우 반전 */
`;

const EmojiBubble3 = styled.div`
  width: 90px;
  height: 91px;
  position: absolute;
  top: 150px;
  left: 50px;
  font-size: 50px;
  padding: 10px;

  background-image: url(${emojiImage}); /* 이미지 경로 변경 */
  background-size: cover; /* 이미지 크기를 요소에 맞게 조정 */
  background-position: center; /* 이미지가 중앙에 오도록 설정 */
`;

const EmojiBubble4 = styled.div`
  width: 90px;
  height: 91px;
  position: absolute;
  top: 200px;
  left: 170px;
  font-size: 45px;
  padding: 10px;

  background-image: url(${emojiImage}); /* 이미지 경로 변경 */
  background-size: cover; /* 이미지 크기를 요소에 맞게 조정 */
  background-position: center; /* 이미지가 중앙에 오도록 설정 */
  transform: scaleX(-1); /* 좌우 반전 */
`;

const SearchBar = styled.div`
  margin: 20px 0;
  margin-top: 350px; /* SearchBar가 더 아래로 내려가게 수정 */
  justify-content: center; /* 가운데 정렬 */
  align-items: center; /* 세로 가운데 정렬 */
  position: relative;
`;

const SearchInput = styled.input`
  width: 65%;
  max-width: 500px;
  padding: 12px;
  border: 1.5px solid #b2b2b2;
  border-radius: 50px;
  outline: none;
  font-family: "Pretendard Variable";
  font-size: 14px;
  text-align: center; /* 입력 내용도 가운데 정렬 */
  position: relative; /* 상대 위치 설정 */
  padding-right: 30px; /* 아이콘을 위한 여백 */
`;

const SearchIcon = styled(IoSearchOutline)`
  position: absolute; /* 아이콘을 input의 상대 위치에 배치 */
  top: 13px;
  left: 260px; /* 아이콘의 위치를 검색 입력의 왼쪽으로 이동 */
  color: #888;
`;

const NoticeText = styled.p`
  margin-top: 10px;
  font-size: 12px;
  font-family: "Pretendard Variable";
  color: #7b7c7d;
  cursor: pointer;
  span {
    text-decoration: underline;
  }
`;

const CategorySection = styled.div`
  margin-top: 40px;
  text-align: left;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
  justify-content: center;
`;


const CategoryTab = styled.button`
  border: 1px solid #d9d9d9;
  padding: 5px 15px;
  background-color: #ffffff;
  border-radius: 50px;
  cursor: pointer;
  font-size: 14px;
  font-family: "Pretendard Variable";
  color: #000000;

  border: ${(props) => (props.active ? "1px solid #007aff" : "1px solid #d9d9d9")};
  color: ${(props) => (props.active ? "#007aff" : "#000")};
  cursor: pointer;
  font-size: 14px;
`;

const MateCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  padding: 5px;
  margin: 20px 0;
  display: flex;
  align-items: center;
`;

const MateCardInfo = styled.div`
  margin-left: 15px;
  
`;

const MateCardTitle = styled.h3`
  font-family: "Pretendard Variable";
  font-size: 16px;
  margin-bottom: 8px;
`;

const MateCardDesc = styled.p`
  font-family: "Pretendard Variable";
  font-size: 14px;
  color: #555;
`;

const ExtraSections = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px; /* 두 카드 사이의 간격 */
  margin-top: 40px;
  padding: 0 15px;
`;

const MateImage = styled.img`
    margin-left: 10px;
    margin-bottom: 50px;
    border: 1px solid #d9d9d9;
    border-radius: 100px;
    width: 40px;
    height: 40px;
`;

const ExtraCard1 = styled.div`
  flex: 1; /* 카드가 동일한 크기를 가지도록 설정 */
  width: 80%;
  height: 120px;
  background-color: #d2edfd;
  border-radius: 11px;
  padding: 14px;
  text-align: left;
   position: relative; /* 자식 요소 위치를 조정하기 위해 상대 위치 설정 */
`;

const ExtraCard2 = styled.div`
  flex: 1; /* 카드가 동일한 크기를 가지도록 설정 */
  width: 80%;
  height: 120px;
  background-color: #f7f7f7;
  border-radius: 11px;
  padding: 14px;
  text-align: left;
  position: relative; /* 자식 요소 위치를 조정하기 위해 상대 위치 설정 */
`;

const Rectangle = styled.div`
  position: absolute;
  bottom: 10px; /* 카드 하단으로 10px 떨어짐 */
  right: 10px; /* 카드 오른쪽으로 10px 떨어짐 */
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center; /* 아이콘을 중앙에 배치 */
`;

const ExtraCardTitle = styled.h3`
  font-size: 15px;
  margin-bottom: 5px;
  color: #333;
`;

const ExtraCardDesc = styled.p`
  font-size: 11px;
  color: #555;
`;


const Footer = styled.div`
  margin-top: 40px;
  padding: 10px;
  border-top: 1.5px solid #c7c7c7;
  border-bottom: 1.5px solid #c7c7c7;
  font-size: 13px;
  color: #4c4c4c;
  display: flex;
  justify-content: space-around;
`;


const HomePage = () => {

    const navigate = useNavigate(); // 네비게이션 훅을 사용

    // 로그인 버튼 클릭 시 로그인 페이지로 이동
    const handleLoginClick = () => {
        navigate('/login');
    };

  return (
    <Wrapper>
      <Navbar>
        <MeetPickText/>
        <LoginButton onClick={handleLoginClick}>로그인</LoginButton>
      </Navbar>
      <MainTitle>
        새로운 대학 MATE
      </MainTitle>
      <SubTitle>
        이젠 MeetPick에서 만나봐!
      </SubTitle>
      <EmojiContainer>
        <EmojiBubble1>
            <Icon icon="fluent-color:food-20" width="40" height="40" />
        </EmojiBubble1>
        <EmojiBubble2>
            <Icon icon="fluent-color:sport-16" width="40" height="40" />
        </EmojiBubble2>
        <EmojiBubble3>
            <Icon icon="fluent-color:edit-24" width="40" height="40" />
        </EmojiBubble3>
        <EmojiBubble4>
            <GroupEmoji/>                       
        </EmojiBubble4>
      </EmojiContainer>
      <SearchBar>
        <SearchInput type="text" placeholder="우리 학교 MATE 둘러보기" />
        <SearchIcon />
        <NoticeText>이미 계정이 있다면? <span onClick={handleLoginClick}>로그인하기</span> </NoticeText>
      </SearchBar>
      <CategorySection>
        <SectionTitle>Pick! 실시간 메이트 찾아보기 🔥</SectionTitle>
        <CategoryTabs>
          <CategoryTab active>혼밥</CategoryTab>
          <CategoryTab>운동</CategoryTab>
          <CategoryTab>공부</CategoryTab>
          <CategoryTab>공동구매</CategoryTab>
        </CategoryTabs>
        <MateCard>
          <MateImage src={mateImage} alt="mate profile" /> 
          <MateCardInfo>
            <MateCardTitle>중앙대학교 디아</MateCardTitle>
            <MateCardDesc>
              좋아하는 음식 취향 성별 등을 카테고리로... 찾아봐!
            </MateCardDesc>
          </MateCardInfo>
        </MateCard>
      </CategorySection>
      <ExtraSections>
        <ExtraCard1>
          <ExtraCardTitle>메이트 성공 후기</ExtraCardTitle>
          <ExtraCardDesc>메이트 성공 후기가 궁금하다면?</ExtraCardDesc>
          <Rectangle>
            <GoArrowRight size="20" />
          </Rectangle>
        </ExtraCard1>
        <ExtraCard2>
          <ExtraCardTitle>공지사항...?</ExtraCardTitle>
          <ExtraCardDesc>서비스 관련 주요 공지사항 확인</ExtraCardDesc>
          <Rectangle>
            <GoArrowRight size="20" />
          </Rectangle>
        </ExtraCard2>
      </ExtraSections>
      <Footer>
        <span>이용약관</span>
        <span>개인정보처리방침</span>
      </Footer>
    </Wrapper>
  );
};

export default HomePage;