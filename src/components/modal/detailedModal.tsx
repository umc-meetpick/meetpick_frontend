import styled from 'styled-components';
import { IoCloseOutline } from "react-icons/io5";
import { useState } from 'react';
import AcceptButton from '../button/AcceptButton';
import RejectButton from '../button/RejectButton';
import DialogButton from '../button/DialogButton';
import MateProfileImg from "../../assets/profileImg/프로필3.png"
import { usePatchRequest } from '../../apis/matches/patchRequest';
import getContactInfo from '../../apis/detailMemberInfo/getContactInfo';
import axios from 'axios';

// Modal Overlay
const ModalOverlay = styled.div`
  width: 100%; 
  max-width: 393px; 
  height:100vh;
  position: fixed;
  top: 0;
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
  border-radius: 30px;
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

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

const ButtonGroupContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 18px;
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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchingRequestId?: number;
}

// Modal Component
const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // 요청 중 여부
  const [kakaoId, setKakaoId] = useState<string | null>(null); // 카카오톡 ID 저장
  
  const patchRequest = usePatchRequest();
  const matchingRequestId = 94; // 임의의 값으로 설정

  const handleOpenAcceptDialog = () => {
    setIsAcceptDialogOpen(true);
  };

  const handleCloseAll = () => {
    setIsAcceptDialogOpen(false);
    setIsContactModalOpen(false);
  };

  const handleAccept = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.warn("토큰이 없습니다.");
      return;
    }
    console.log("🔍 handleAccept 호출됨");
    console.log("📌 matchingRequestId:", matchingRequestId);
    console.log("📌 isProcessing:", isProcessing);

    if (matchingRequestId === undefined || isProcessing) {
      console.warn("⚠️ 이미 요청 중이거나 매칭 ID 없음.");
      return;
    }
  
    setIsProcessing(true); // 중복 요청 방지
    console.log(`🚀 수락 요청 보냄 (matchingRequestId: ${matchingRequestId})`);
    patchRequest.mutate(
      { isAccepted: true, matchingRequestId },
      {
        onSuccess: async (data) => {
          console.log("✅ 수락 요청 성공", data);
          if (data.isSuccess) {
            setIsAcceptDialogOpen(false);
            setIsContactModalOpen(true);

            try {
              // API 호출하여 연락처 정보 가져오기
              const contactInfo = await getContactInfo(matchingRequestId);
              setKakaoId(contactInfo.contactName);
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


  const handleReject = () => {

    console.log('🔍 handleReject 호출됨');
    console.log('📌 matchingRequestId:', matchingRequestId);
    console.log('📌 isProcessing:', isProcessing);

    if (matchingRequestId == null || isProcessing) {
      console.warn("⚠️ 이미 요청 중이거나 매칭 ID 없음.");
      return;
    }

    setIsProcessing(true);
    console.log(`🚀 거절 요청 보냄 (matchingRequestId: ${matchingRequestId})`);

    patchRequest.mutate(
      { isAccepted: false, matchingRequestId },
      {
        onSuccess: (data) => {
          console.log("✅ 거절 요청 성공", data);
          if (data.isSuccess) {
            alert("매칭 요청이 거절되었습니다.");
            onClose(); // 모달 닫기
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


  const handleCopy = () => {
    if (kakaoId) {
      navigator.clipboard.writeText(kakaoId);
      alert("카카오톡 ID가 복사되었습니다.");
    }
  };

  if (!isOpen) return null;

  return (

    <>
      

      <ModalOverlay>
        <ModalContainer>
          <ModalHeader>
            상세 프로필
            <CloseButton onClick={onClose}><IoCloseOutline size={24}/></CloseButton>
          </ModalHeader>
          <ProfileContainer>
            <DetailedProfileImage      
              src={MateProfileImg}
              alt="Detail Profile"
            />
          </ProfileContainer>

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
                <LargeTagItem>밥 맛있게 먹어용!</LargeTagItem>
              </TagContainer>
            </ProfileDetailItem>
          </ProfileDetails>
          <ButtonGroupContainer>
            <AcceptButton onClick={handleOpenAcceptDialog}
            borderRadius='5px'
            fontSize='14px'
            fontWeight='600'
            width='117px'
            height='35px'/>
            <RejectButton 
            onClick={handleReject} 
            borderRadius='5px'
            fontSize='14px'
            fontWeight='600'
            width='117px'
            height='35px'/>
          </ButtonGroupContainer>

          

        </ModalContainer>
      </ModalOverlay>

      {/* 수락 확인 Dialog */}
      {isAcceptDialogOpen && (
        <Overlay>
        <DialogButton
          isOpen={isOpen}
          onCancel={handleCloseAll}
          onConfirm={handleAccept}
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
            <CloseContainer onClick={handleCloseAll}>
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


export default Modal;