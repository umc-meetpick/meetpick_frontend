import React from 'react';
import styled from "styled-components";
import Background from '../assets/background/HomeBackground'; 
import Slider from '../components/Slider'; 
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import mateImage from '../assets/images/MateImage.png'
import logoImage from '../assets/images/MeetPickLogo.png'
import characterImage from '../assets/homeImg/homeImage.png'
import thinkingface from '../assets/homeImg/thinking.png'
import fire from '../assets/homeImg/fire.png'
import CategotyContainer from '../container/CategoryContainer';



const Wrapper = styled.div`
  position: relative; /* 배경 위에 다른 콘텐츠를 올리기 위해 필요 */
  font-family: "Pretendard Variable", sans-serif;
  text-align: center;
  overflow: hidden; /* 배경이 Wrapper를 넘어가지 않도록 설정 */
`;


const Content = styled.div`
  position: relative; /* 배경 위에 콘텐츠를 배치하기 위해 설정 */
  z-index: 1; /* 배경보다 위에 표시 */
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
`;

const LogoIcon = styled.img`
  width: 137px;
  height: 37px;    
  object-fit: cover;
`;

const LoginText = styled.p`
  color: #000;
  cursor: pointer;
  font-size: 15px;
  text-decoration: underline;
  font-family: "Pretendard Variable";
  margin-right:10px;
`;

const MainTitleImage = styled.img`
  position: absolute;
  top: 120px;
  right: 30px;
  width: 80px; /* 이미지 크기 */
  height: 60px;
  object-fit: cover;
`;

const MainTitle = styled.h1`
  font-size: 32px;
  color: #000;
  margin: 112px 0 10px 0; /* 위쪽, 아래쪽 여백을 설정 */
  font-family: "Pretendard Variable";
  font-weight: 700;
`;

const SubTitle = styled.p`
  font-size: 20px;
  color: #454545;
  margin-top: 5px; /* 상단 여백을 줄여서 간격 좁힘 */
  margin-bottom: 165px;
  font-family: "Pretendard Variable";
  font-weight: 500;  
`;

const SearchText = styled.p`
  margin-top: 152px;
  font-size: 18px;
  font-family: "Pretendard Variable";
  font-weight: 700;
  color: #3D434D;
  display: inline-flex; /* 텍스트와 이미지를 한 줄로 배치 */
  align-items: center;
  span {
    color: #1A6AFF;
  }
  img {
    margin-right: 8px; /* 이미지와 텍스트 간격 */
  }
`;

const SearchBar = styled.div`
  justify-content: center; /* 가운데 정렬 */
  align-items: center; /* 세로 가운데 정렬 */
  position: relative;
`;

const SearchInput = styled.input`
  width: 65%;
  max-width: 300px;
  padding: 13px;
  background: #F5F9FD;
  border: 1.5px solid #b2b2b2;
  border-radius: 50px;
  outline: none;
  font-family: "Pretendard Variable";
  font-size: 16px;
  text-align: left; /* 입력 내용도 가운데 정렬 */
  position: relative; /* 상대 위치 설정 */
  padding-left: 43px; /* 아이콘을 위한 여백 */
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 8%; /* 세로 가운데 정렬 */
  right: 50px;
  width: 34px; /* 배경 원의 너비 */
  height: 34px; /* 배경 원의 높이 */
  border-radius: 50%; /* 원형 모양으로 설정 */
  background-color: #1A6AFF; /* 배경 색상 */
  display: flex;
  justify-content: center; /* 가로로 중앙 정렬 */
  align-items: center; /* 세로로 중앙 정렬 */
  flex-shrink: 0; /* 크기 변하지 않도록 설정 */
`;

const SearchIcon = styled(IoSearchOutline)`
  width: 22px; /* 아이콘 크기 */
  height: 22px; /* 아이콘 크기 */

  color: #fff;
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
  padding: 0 35px;
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

  border: ${(props) => (props.active ? "1px solid #1A6AFF" : "1px solid #F0F0FF")};
  color: ${(props) => (props.active ? "#FFFFFF" : "#373E4B")};
  background-color: ${(props) => (props.active ? "#1A6AFF" : "#ffffff")};
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

const Footer = styled.div`
  margin-top: 103px;
  margin-bottom: 122px;
  padding: 10px;
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
          <Background /> {/* 배경 삽입 */}
          <Content>
              <Navbar>
                  <LogoIcon src={logoImage} />
                  <LoginText onClick={handleLoginClick}>로그인</LoginText>
              </Navbar>
              <MainTitleImage src={characterImage} alt="Main title image" />
              <MainTitle>새로운 대학 메이트</MainTitle>
              <SubTitle>이젠 밋픽에서 만나봐!</SubTitle>
              <CategotyContainer />
              <SearchText><img src={thinkingface} alt="Search text image" style={{ width: '30px', height: '30px' }} />우리 학교&nbsp;<span>메이트</span>가 궁금하다면?</SearchText>
              <SearchBar>
                  <SearchInput type="text" placeholder="학교명 검색" />
                  <IconWrapper>
                    <SearchIcon />
                  </IconWrapper>
                  <NoticeText>이미 계정이 있다면? <span onClick={handleLoginClick}>로그인하기</span></NoticeText>
              </SearchBar>
              <CategorySection>
                  <SectionTitle><span>Pick!</span>&nbsp;실시간 메이트 찾아보기<img src={fire} alt="Section title image" style={{ width: '30px', height: '30px' }} /></SectionTitle>
                  <CategoryTabs>
                      <CategoryTab active>혼밥</CategoryTab>
                      <CategoryTab>운동</CategoryTab>
                      <CategoryTab>공부</CategoryTab>
                      <CategoryTab>전체</CategoryTab>
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
              <Footer>
                  <span>이용약관</span>
                  <span>개인정보처리방침</span>
              </Footer>
          </Content>
      </Wrapper>
  );
};

export default HomePage;