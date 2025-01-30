import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { IoCloseOutline } from "react-icons/io5";
import { PiBell } from "react-icons/pi";
import { BsChevronRight } from "react-icons/bs";
import { GoArrowRight } from "react-icons/go";
import ProfileImg from "../assets/profileImg/프로필2.png"
import MateProfileImg from "../assets/profileImg/프로필3.png"
import MatchSlider from "../components/Slider"
import AcceptButton from '../components/button/AcceptButton';
import RejectButton from '../components/button/RejectButton';
import { Link } from 'react-router-dom';

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleViewAllClick = () => {
      navigate('/viewRequest'); // Replace '/viewRequest' with the correct path
    };

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
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
            <Link to ="/modify">
              <EditProfileButton>프로필 수정하기 <BsChevronRight /></EditProfileButton>
            </Link>
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
                    <ChevronButton onClick={handleOpenModal} />
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


      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </Container>
  );
};

export default MyPage;


// Modal Overlay
const ModalOverlay = styled.div`
  width: calc(100vw); 
  max-width: 393px; 
  height:100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

// Modal Container
const ModalContainer = styled.div`
  width: calc(100vw); 
  max-width: 240px; 
  background: white;
  max-height: calc(100vh - 200px); /* BottomNavBar 높이를 제외한 공간 */
  margin: 0 auto;
  border-radius: 10px;
  overflow-y: auto; 
  padding: 40px 50px 30px 50px;
  position: relative;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
`;

const ModalHeader = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 25px;
  margin-left: 80px;
  text-align: center;
`;

const CloseButton = styled.div`
  display: absolute;
  position: absolute;
  right: 23px;
  font-size: 18px;
  cursor: pointer;
`;

const DetailedProfileImage = styled.img`
  width: 72px;
  height: 72px;
  border: 1px solid #DCDCDC;
  border-radius: 50%;
  margin: 0 auto;
  display: block;
`;

const DetailedProfileName = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

// Detailed Profile Content
const ProfileDetails = styled.div`
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
`;

const ProfileDetailItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  display: flex;
  gap: 3px;
  width: calc(50% - 10px); /* 두 개씩 정렬 */
  
  &:nth-child(1), &:nth-child(8) { /* 나이·학번, 하고 싶은 말 */
    width: 100%; /* 한 칸에 꽉 차게 */
  }
`;

const ProfileDetailLabel = styled.span`
  font-size: 12.5px;
  font-weight: 500;
  color: #007AFF;
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  flex-wrap: wrap; /* 넘치면 줄 바꿈 */
  width: 120%; /* 부모 영역 꽉 채우기 */
  justify-content: flex-start; /* 왼쪽 정렬 */
`;

// Tag Item
const TagItem = styled.div`
  height: 24px;
  display: inline-flex;
  padding: 0px 15px 0px 15px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: 1px solid #CECECE;
  font-size: 13px;
  font-weight: 400;
  color: #000;
  background-color: white;
  white-space: nowrap;
`;

const LargeTagItem = styled(TagItem)`
  width: 193px;
  height: 56px;
  border-radius: 5px;
  justify-content: flex-start; /* 왼쪽 정렬 */
  font-size: 14px;
`;


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Modal Component
const Modal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          상세 프로필
          <CloseButton onClick={onClose}><IoCloseOutline size={24}/></CloseButton>
        </ModalHeader>
        <DetailedProfileImage      
          src={MateProfileImg}
          alt="Detail Profile"
          />
          <DetailedProfileName>제이시</DetailedProfileName>
          <ProfileDetails>
            <ProfileDetailItem>
              <ProfileDetailLabel>나이 · 학번</ProfileDetailLabel>
              <TagContainer>
                <TagItem>23살</TagItem>
                <TagItem>20학번</TagItem>
              </TagContainer>
            </ProfileDetailItem>
            <ProfileDetailItem>
              <ProfileDetailLabel>성별</ProfileDetailLabel>
              <TagContainer>
                <TagItem>남성</TagItem>
              </TagContainer>
            </ProfileDetailItem>
            <ProfileDetailItem>
              <ProfileDetailLabel>전공</ProfileDetailLabel>
              <TagContainer>
                <TagItem>경영학부</TagItem>
              </TagContainer>
            </ProfileDetailItem>
            <ProfileDetailItem>
              <ProfileDetailLabel>MBTI</ProfileDetailLabel>
              <TagContainer>
                <TagItem>ISFP</TagItem>
              </TagContainer>
            </ProfileDetailItem>
            <ProfileDetailItem>
              <ProfileDetailLabel>취미</ProfileDetailLabel>
              <TagContainer>
                <TagItem>명상</TagItem>
                <TagItem>바둑</TagItem>
              </TagContainer>
            </ProfileDetailItem>
            <ProfileDetailItem>
              <ProfileDetailLabel>음식 종류</ProfileDetailLabel>
              <TagContainer>
                <TagItem>일식</TagItem>
              </TagContainer>
            </ProfileDetailItem>
            <ProfileDetailItem>
              <ProfileDetailLabel>요일 및 시간</ProfileDetailLabel>
              <TagContainer>
                <TagItem>월 17시</TagItem>
                <TagItem>화 12시</TagItem>
              </TagContainer>
            </ProfileDetailItem>            
            <ProfileDetailItem>
              <ProfileDetailLabel>하고 싶은 말</ProfileDetailLabel>
              <TagContainer>
                <LargeTagItem>밥 맛있게 먹겨용!</LargeTagItem>
              </TagContainer>
            </ProfileDetailItem>
          </ProfileDetails>
        <ButtonGroupContainer>
          <AcceptButton onClick={() => console.log("수락 버튼 클릭")} 
          borderRadius='5px'
          fontSize='14px'
          fontWeight='600'
          width='117px'
          height='35px'/>
          <RejectButton onClick={() => console.log("거절 버튼 클릭")} 
          borderRadius='5px'
          fontSize='14px'
          fontWeight='600'
          width='117px'
          height='35px'/>
        </ButtonGroupContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};
