import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { PiBell } from "react-icons/pi";
import { BsChevronRight } from "react-icons/bs";
import { GoArrowRight } from "react-icons/go";
import ProfileImg from "../assets/profileImg/프로필2.png"
import MateProfileImg from "../assets/profileImg/프로필3.png"
import MatchSlider from "../components/Slider"
import AcceptButton from '../components/button/AcceptButton';
import RejectButton from '../components/button/RejectButton';

// Styled Components
const Container = styled.div`
    text-align: left;
    padding: 15px;
    font-family: 'Pretendard Variable', sans-serif;
    background-color: #fff;
`;

const Navbar = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: white;
  justify-content: center;
  position: relative;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: 500;
  color: black;
`;

const IconPosition = styled.div`
  position: absolute;
  right: 20px;
  font-size: 24px;
  cursor: pointer;
`;

const ProfileSection = styled.div`
    margin-top: 20px;
  background-color: white;
  padding: 20px;
  text-align: center;
  gap: 20px; /* 이미지와 텍스트 사이 간격 */
  display: flex;
  flex-direction: row;
`;


const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border:1px solid #DCDCDC;
  border-radius: 50%;
  margin-bottom: 10px;
  margin-right: 13px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
`;

const ProfileName = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 17px;
  text-align: left;
`;

const EditProfileButton = styled.button`
    width: 180px;
    height: 35px;
  padding: 10px 10px;
  font-size: 14px;
  font-weight: 400;
  color: #000;
  border: 1px solid #DCDCDC;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 20px 10px 20px;
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  background-color: #007AFF;
  border-radius: 50%;
  margin-right: 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const ViewText = styled.div`
    color: #000;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
`;

const MatchCard = styled.div`
  background-color: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
`;

const MatchTitle = styled.div`
    display: flex;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 1px;
  margin-left: -10px;
  align-items: left;
  gap: 5px;
`;

const MatchCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
`;

const MatchImage = styled.img`
  width: 68px;
  height: 68px;
  border:1px solid #DCDCDC;
  border-radius: 50%;
`;

const MatchInfo = styled.div`
  font-size: 14px;
`;

const MateName = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const MateInfo = styled.div`
  font-size: 14px;
`;

const ChevronButton = styled(BsChevronRight)`
  color: #ACACAC; /* 색상 변경 */
  font-size: 20px;
  cursor: pointer;
  margin-left: 50px;
`;

const ButtonGroupContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 18px;
`;

const FooterMenu = styled.div`
  margin-top: 60px;
  background-color: white;
  padding: 10px 20px;
  margin-bottom: 40px;
  
`;

const FooterItem1 = styled.div`
  font-size: 14px;
  color: #3F3F3F;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #C7C7C7;
  border-bottom: 1px solid #C7C7C7;
  cursor: pointer;
  
`;

const FooterItem2 = styled.div`
  font-size: 14px;
  color: #3F3F3F;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #C7C7C7;
  cursor: pointer;
  
`;

// ButtonGroup Component
const ButtonGroup: React.FC = () => {
    
    const handleAccept = () => {
      console.log("수락 버튼 클릭");
    };
  
    const handleReject = () => {
      console.log("거절 버튼 클릭");
    };
  
    return (
      <ButtonGroupContainer>
        <AcceptButton onClick={handleAccept} width="122px" height="32px" fontSize="14px" fontWeight="550"/>
        <RejectButton onClick={handleReject} width="122px" height="32px" fontSize="14px" fontWeight="550" />
      </ButtonGroupContainer>
    );
  };


// Main Component
const MyPage = () => {

    const navigate = useNavigate();

    const handleViewAllClick = () => {
      navigate('/view-all'); // Replace '/view-all' with the correct path
    };

  return (
    <Container>
      {/* Navbar */}
      <Navbar>
        <Title>마이페이지</Title>
        <IconPosition>
          <PiBell />
        </IconPosition>
      </Navbar>

      {/* Profile Section */}
      <ProfileSection>
        <ProfileImage src={ProfileImg} alt="Profile" />
        <ProfileInfo>
            <ProfileName>베티 (나윤빈)</ProfileName>
            <EditProfileButton>프로필 수정하기 <BsChevronRight /></EditProfileButton>
        </ProfileInfo>
      </ProfileSection>

        {/* Match Request Section */}
      <SectionHeader>
        <TitleWrapper>
          <Dot />
          <SectionTitle>매칭신청</SectionTitle>
        </TitleWrapper>
        <ViewText onClick={handleViewAllClick}>전체보기</ViewText>
      </SectionHeader>

      <MatchSlider>
        {[1, 2, 3, 4].map((_, index) => (
            <MatchCard key={index}>
                <MatchTitle><Icon icon="fluent-color:sport-16" width="20" height="20" />운동 MATE</MatchTitle>
                <MatchCardHeader>
                    <MatchImage src={MateProfileImg} alt="MatchProfile" />
                    <MatchInfo>
                    <MateName>제이시</MateName>
                    <MateInfo>남성, 20학번, 23살</MateInfo>
                    <MateInfo>경영학부</MateInfo>
                    </MatchInfo>
                    <ChevronButton />
                </MatchCardHeader>
                <ButtonGroup />
            </MatchCard>
        ))}
      </MatchSlider>
      

      {/* Footer Menu */}
      <FooterMenu>
        <FooterItem1>
          신청 현황 <span><GoArrowRight size={16}/></span>
        </FooterItem1>
        <FooterItem2>
          고객센터 <span><GoArrowRight size={16}/></span>
        </FooterItem2>
      </FooterMenu>
    </Container>
  );
};

export default MyPage;
