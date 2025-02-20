import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { BsChevronRight } from "react-icons/bs";
import { GoArrowRight } from "react-icons/go";
import ProfileImg from "../assets/profileImg/프로필2.png"
import MateProfileImg from "../assets/profileImg/프로필3.png"
import MatchSlider from "../components/Slider"
import DialogButton from '../components/button/DialogButton';
import AcceptButton from '../components/button/AcceptButton';
import RejectButton from '../components/button/RejectButton';
import { Link } from 'react-router-dom';
import BasicNavbar from '../components/navbar/BasicNavbar';
import Modal from '../components/modal/detailedModal';
import getMyProfile from '../apis/basicProfile/getMyProfile';
import { usePatchRequest } from '../apis/matches/patchRequest';
import useGetRequestMatch from "../apis/matches/getRequestMatch";
import getContactInfo from '../apis/detailMemberInfo/getContactInfo';
import axios from 'axios';
import { IoCloseOutline } from 'react-icons/io5';

// Styled Components
const Container = styled.div`
    text-align: left;
    font-family: 'Pretendard Variable', sans-serif;
    background-color: #fff;
    padding: 0 20px;
`;

const Navbar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: white;
  justify-content: center;
  position: relative;
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
interface ButtonGroupProps {
  handleAccept: (mateId: number) => void;
  onReject: (mateId: number) => void;
  mateId: number;
}

// ButtonGroup Component
const ButtonGroup: React.FC<ButtonGroupProps> = ({ handleAccept, onReject, mateId }) => {
    
  return (
    <ButtonGroupContainer>
      <AcceptButton onClick={() => handleAccept(mateId)} width="122px" height="32px" fontSize="14px" fontWeight="550"/>
      <RejectButton onClick={() => onReject(mateId)} width="122px" height="32px" fontSize="14px" fontWeight="550" />
    </ButtonGroupContainer>
  );
};


// Main Component
const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | undefined>(undefined);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [kakaoId, setKakaoId] = useState<string | null>(null); // 카카오톡 ID 저장
  const [isProcessing, setIsProcessing] = useState(false); // 요청 중 여부
  const navigate = useNavigate();
  const patchRequest = usePatchRequest();

 

  const { data: matchRequests = [] } = useGetRequestMatch("전체", 0, 10);

  const handleViewAllClick = () => {
    navigate('/viewRequest'); // Replace '/viewRequest' with the correct path
  };

  const handleOpenModal = (mappingId: number) => {
    console.log("📌 handleOpenModal 호출됨 - mappingId:", mappingId);
    setSelectedRequestId(mappingId); // 선택한 요청 ID 저장
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequestId(undefined); // 모달 닫을 때 ID 초기화
  };
  
  const {data} = getMyProfile();

  
  const handleAccept = (requestId: number) => {
    const selectedRequest = matchRequests.find((req) => req.id === requestId);
    if (!selectedRequest) {
      alert("해당 요청을 찾을 수 없습니다.");
      return;
    }

    const mappingId = selectedRequest.mappingId; // mappingId 가져오기
    setSelectedRequestId(mappingId);
    console.log("수락 버튼 클릭");

    patchRequest.mutate(
      { isAccepted: true, matchingRequestId: mappingId },
      {
        onSuccess: async (data) => {
          console.log("✅ 수락 요청 성공", data);
          if (data.isSuccess) {
            setIsAcceptDialogOpen(false); // 다이얼로그 닫기
            setIsContactModalOpen(true); // 연락 수단 모달 열기

            try {
              // API 호출하여 연락처 정보 가져오기
              const contactInfo = await getContactInfo(requestId);
              if (contactInfo?.contactName) {
                setKakaoId(contactInfo.contactName);
              } else {
                setKakaoId(null);
                alert("상대방의 카카오톡 ID를 찾을 수 없습니다.");
              }
            } catch (error) {
              alert("연락처 정보를 불러오지 못했습니다.");
            }
          } else {
            alert(`요청 실패: ${data.result || data.message}`);
          }
        },
        onError: (error: unknown) => {
          if (axios.isAxiosError(error)) {
            // AxiosError인 경우
            console.error("❌ 오류 발생:", error.response?.data || error.message);
            alert(`서버 요청 중 오류가 발생했습니다: ${error.response?.data?.message || error.message}`);
          } else {
            // 일반 Error인 경우
            console.error("❌ 일반 오류 발생:", error);
            alert(`오류가 발생했습니다: ${error}`);
          }
        },
        onSettled: () => {
          console.log("🔄 요청 완료 (isProcessing false로 변경)");
          setIsProcessing(false);
        }
      }
    );
  };

  const handleReject = (requestId: number) => {
    const selectedRequest = matchRequests.find((req) => req.id === requestId);
  if (!selectedRequest) {
    alert("해당 요청을 찾을 수 없습니다.");
    return;
  }

  const mappingId = selectedRequest.mappingId; // mappingId 가져오기
  setSelectedRequestId(requestId);

    console.log('🔍 handleReject 호출됨');
    console.log("📌 matchingRequestId:", mappingId);
    console.log('📌 isProcessing:', isProcessing);

    setIsProcessing(true);
    console.log(`🚀 거절 요청 보냄 (matchingRequestId: ${mappingId})`);

    patchRequest.mutate(
      { isAccepted: false, matchingRequestId: mappingId },
      {
        onSuccess: (data) => {
          console.log("✅ 거절 요청 성공", data);
          if (data.isSuccess) {
            alert("매칭 요청이 거절되었습니다.");
          } else {
            alert(`요청 실패: ${data.result || data.message}`);
          }
        },
        onError: (error) => {
          console.error("❌ 오류 발생:", error);
        },
        onSettled: () => setIsProcessing(false),
      }
    );
  };

  
  const handleOpenAcceptDialog = (requestId: number) => {
    const selectedRequest = matchRequests.find((req) => req.id === requestId);
    if (!selectedRequest) {
      alert("해당 요청을 찾을 수 없습니다.");
      return;
    }

    const mappingId = selectedRequest.mappingId; // mappingId 가져오기
    setSelectedRequestId(mappingId); // mappingId를 selectedRequestId에 설정
    console.log("수락 다이얼로그 열기, mappingId:", mappingId);
    setIsAcceptDialogOpen(true); // 다이얼로그 열기
  };

  const handleCloseContact = () => {
    setIsContactModalOpen(false);
  };


  const handleCopy = () => {
    if (kakaoId) {
      navigator.clipboard.writeText(kakaoId);
      alert("카카오톡 ID가 복사되었습니다.");
    } else {
      alert("복사할 카카오톡 ID가 없습니다.");
    }
  };



  return (
    <>
      <Container>
        {/* Navbar */}
        <Navbar>
          <BasicNavbar title ="마이페이지" bell={true}/>
        </Navbar>

        {/* Profile Section */}
        <ProfileSection>
          <ProfileImage src={ProfileImg} alt="Profile" />
          <ProfileInfo>
              <ProfileName>{data}</ProfileName>
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

        {/* Match Requests Slider */}
        <MatchSlider>
        {matchRequests.slice(0, 4).map((match) => (
          <MatchCard key={match.mappingId}>
            <MatchTitle>
              <Icon icon="fluent-color:food-20" width="20" height="20" />
              {match.mateType} MATE
            </MatchTitle>
            <MatchCardHeader>
              <MatchImage src={match.imageUrl} alt="MatchProfile" />
              <MatchInfo>
                <MateName>{match.nickName}</MateName>
                <MateInfo>
                  {match.studentNumber}, {match.age}살
                </MateInfo>
                <MateInfo>{match.major}</MateInfo>
              </MatchInfo>
              <ChevronButton onClick={() => handleOpenModal(match.mappingId)} />
            </MatchCardHeader>
            <ButtonGroup handleAccept={handleOpenAcceptDialog} onReject={handleReject} mateId={match.id} />
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

      {/* ✅ Modal을 Container 바깥에서 렌더링 */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}/>

      {/* 수락 확인 Dialog */}
      {isAcceptDialogOpen && (
        <Overlay>
        <DialogButton
          isOpen={isAcceptDialogOpen}
          onCancel={() => setIsAcceptDialogOpen(false)}
          onConfirm={() => {
            if (selectedRequestId !== undefined) {
              console.log("수락 요청 ID:", selectedRequestId); 
              handleAccept(selectedRequestId);
            } else {
              console.error("❌ selectedRequestId가 설정되지 않았습니다.");
            }
          }}
          text="수락하시겠습니까?"
          cancelText="취소"
          confirmText="수락"
          textFontSize="17px"
          buttonTextColor="rgba(0, 122, 255, 1)"
          buttonBgColor="rgba(233, 233, 233, 0.1)"
        />
        </Overlay>
      )}

      {/* 연락 수단 모달 */}
      {isContactModalOpen && (
        <Overlay>
          <ContactContainer>
            <CloseContainer onClick={handleCloseContact}>
              <IoCloseOutline size={24}/>   
            </CloseContainer> 
            <ContactHeader>
              <ContactTitle>연락 수단</ContactTitle>
            </ContactHeader>
            <ContactContent>
              카카오톡 ID
              <InputContainer>
                <KakaoIdInput value={kakaoId || ""} readOnly />
                <CopyButton onClick={handleCopy}>
                  복사
                </CopyButton>
              </InputContainer>
            </ContactContent>
          </ContactContainer>
        </Overlay>
      )}
    </>
  );
};

export default MyPage;



const Overlay = styled.div`
  width: calc(100vw);
  max-width: 393px;
  height: 100vh;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
`;


const ContactContainer = styled.div`
  width: 67%;
  background: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const ContactHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
`;

const ContactTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  text-align: center;
`;

const CloseContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  width: 19px;
  height: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ContactContent = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 8px;
  text-align: left;
`;

const Button = styled.button`
  width: 40px;
  padding: 5px 5px;
  background: #268EFF;
  color: #FFF;
  border-radius: 4px;
  font-size: 13.5px;
  font-weight: 400;
  cursor: pointer;
  background: #268EFF;
  color: #FFF;
  text-align: center;

  &:hover {
    background: "#005FCC" : "#F5F5F5";
  }
`;


const InputContainer = styled.div`
  margin-top: 20px;
  height: 44px;
  display: flex;
  align-items: center;
  gap: 16px;
  background: #FAFAFC;
  border-radius: 3px;
`;

const KakaoIdInput = styled.input`
  padding: 10px;
  font-size: 14px;
  border: none;
  background: none;
`;

const CopyButton = styled(Button)`
  flex-shrink: 0;
`;
