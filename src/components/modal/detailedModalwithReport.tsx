import styled from 'styled-components';
import * as React from 'react';
import { useState, useEffect, SetStateAction } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import DialogButton from '../button/DialogButton';
import { GoChevronLeft, GoChevronDown, GoChevronUp } from "react-icons/go";
import { AiFillCheckCircle } from "react-icons/ai";
import reportIcon from "../../assets/images/report.png"
import MateProfileImg from "../../assets/profileImg/프로필3.png"
import usePostReport from '../../apis/report/postReport';

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

const ReportContainer = styled.div`
  position: flex;  
  display: flex;
  margin-right: -20px;
  margin-top: -40px;
  align-items: center;
  gap: 2px;
  flex-direction: column;
`;

const ReportImage = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const ReportText = styled.div`
  color: #E30000;
  font-size: 11px;
  text-align: center;
  font-weight: 600;
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
}

// Modal Component
const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  

  const handleCloseAll = () => {
    setIsAcceptDialogOpen(false);
    setIsContactModalOpen(false);
  };

  const handleAccept = () => {
    setIsAcceptDialogOpen(false);
    setIsContactModalOpen(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("kakao_id_example");
    alert("카카오톡 ID가 복사되었습니다.");
  };

  if (!isOpen) return null;

  return (

    <>
      {/* 신고 모달 */}
      <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />

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
            <ReportContainer>
              <ReportImage 
                src={reportIcon}
                onClick={() => setIsReportModalOpen(true)}
               />
              <ReportText>신고</ReportText>
            </ReportContainer>
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
                <KakaoIdInput  />
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

const ReportModalOverlay = styled.div`
  width: calc(100vw); 
  max-width: 393px;
  height: 100vh;
  position: fixed;
  border-radius: 10px;
  top: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
`;


interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [isReportPageOpen, setIsReportPageOpen] = useState(false);
  
  
  if (!isOpen && !isReportPageOpen) return null;

  const handleConfirm = () => {
    setIsReportPageOpen(true); // 신고 페이지 열기
  };

  const handleCloseAll = () => {
    setIsReportPageOpen(false);
    onClose(); // 모든 모달 닫기
  };

  return (
    <>

      {isReportPageOpen ? (
        <ReportPage 
          onClose={handleCloseAll} 
          reporterId={1} 
          reportedUserId={1} 
        />
      ) : (
        <ReportModalOverlay>
          <DialogButton
            isOpen={isOpen}
            onCancel={onClose}
            onConfirm={handleConfirm}
            text="사용자를 신고하시겠습니까?"
            cancelText="취소"
            confirmText="확인"
            textFontSize="17px"
            buttonTextColor="rgba(0, 122, 255, 1)"
            buttonBgColor="rgba(233, 233, 233, 0.1)"
          />
        </ReportModalOverlay>
      )}
    </>
  );
};




const BackButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 30px;
  left: 10px;
  cursor: pointer;
`;

const ReportProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const ReportProfileImage = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #f0f0f0;
  border: 1px solid #E1E2E6;
`;

const UserName = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-top: 10px;
  color: #000;
`;

const Dropdown = styled.div`
  position: relative;
  margin-bottom: 10px;
  width: 100%;
`;

const DropdownToggle = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.3s, color 0.3s;
  color: ${({ $isOpen }) => ($isOpen ? "#007AFF" : "#8B8B8B")};

  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    color: rgba(0, 122, 255, 1);
    background-color: rgba(244, 250, 255, 1);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 1000;
  box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05);
`;

const DropdownItem = styled.div`
  padding: 10px;
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.85);

  &:hover {
    color: rgba(0, 122, 255, 1);
    background-color: rgba(244, 250, 255, 1);
  }
`;

const DescriptionWrapper = styled.div`
  border: 1px solid #d9d9d9;
  position: relative;
  margin-top: 15px;
  height: 270px;
`;

const ReportDescription = styled.textarea`
  width: 91.5%;
  height: 92%;
  border: none;
  padding: 10px;
  font-size: 14px;
  font-weight: 400;
  resize: none;
  color: #8B8B8B;

  &:focus + .placeholder {
    display: none; /* 포커스 시 가이드 텍스트 숨김 */
  }
`;

const Placeholder = styled.div`
  padding: 12px;
  position: absolute;
  top: 12px;
  color: #ADADAD;
  font-family: "Pretendard Variable";
  font-size: 11.5px;
  line-height: 1.5;
  pointer-events: none; /* 클릭 이벤트 비활성화 */
  white-space: pre-wrap;
`;

const SubmitButton = styled.button<{ $isactive: boolean }>`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background-color: ${({ $isactive }) => ($isactive ? "#268EFF" : "#EFEFF2")};
  color: ${({ $isactive }) => ($isactive ? "#FFF" : "#AFAFAF")};
  border: none;
  border-radius: 5px;
  font-size: ${({ $isactive }) => ($isactive ? "16px" : "16px")};
  font-weight: ${({ $isactive }) => ($isactive ? "normal" : "600")};
  text-align: center;
  cursor: ${({ $isactive }) => ($isactive ? "pointer" : "default")};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ $isactive }) => ($isactive ? "#1E75D6" : "#EFEFF2")};
  }
`;

const SubmitModalOverlay = styled.div`
  width: calc(100vw); 
  max-width: 393px;
  height: 100vh;
  position: fixed;
  border-radius: 10px;
  top: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4000;
`;


const ToastMessage = styled.div`
  position: fixed;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  color: rgba(0, 0, 0, 0.85);
  border-radius: 2px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const ToastIcon = styled.div`
  color: rgba(82, 196, 26, 1); /* Success icon color */
  display: flex;
  align-items: center;
`;


// 신고 페이지 컴포넌트
const ReportPage = ({ onClose, reporterId, reportedUserId }: { onClose: () => void; reporterId: number; reportedUserId: number }) => {
  const [selectedReason, setSelectedReason] = useState("신고 유형을 선택해주세요");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false); // Dialog open state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [reportText, setReportText] = useState(""); // 신고 내용 상태
  const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(false); // 버튼 활성화 상태

  const mutation = usePostReport();

  // 텍스트 입력 길이에 따라 버튼 활성화 여부 업데이트
  useEffect(() => {
    setIsSubmitButtonEnabled(reportText.length >= 10);
  }, [reportText]);


  const options = [
    "기재된 정보랑 달라요",
    "매칭 후 연락이 없어요",
    "만남에서 문제가 발생했어요",
    "그 외 다른 문제가 있어요",
  ];


  // 신고 유형을 reportType으로 매핑
  const reportTypeMapping: { [key: string]: string } = {
    "기재된 정보랑 달라요": "기재된 정보랑 달라요",
    "매칭 후 연락이 없어요": "매칭 후 연락이 없어요",
    "만남에서 문제가 발생했어요": "만남에서 문제가 발생했어요",
    "그 외 다른 문제가 있어요": "그 외 다른 문제가 있어요",
  };

  const handleConfirm = async () => {

    if (!selectedReason || !reportText || !isSubmitButtonEnabled) return; // 버튼 비활성화 시 신고 불가

    const reportData = {
      reporterId,
      reportedId: reportedUserId,
      reportType: reportTypeMapping[selectedReason] || "그 외 다른 문제가 있어요",
      content: reportText,
    };

    console.log("🔍 신고 데이터:", reportData); // 디버깅을 위해 추가

    mutation.mutate(reportData, {
      onSuccess: () => {
        setIsToastVisible(true);
        setIsSubmitModalOpen(false);
        setIsSubmitted(true);
        setTimeout(() => setIsToastVisible(false), 3000);
      },
      onError: (error:Error) => {
        console.error("신고 실패:", error);
        alert("신고 접수 중 오류가 발생했습니다.");
        console.log("🔑 저장된 accessToken:", localStorage.getItem("accessToken"));
      },
    });
  };

  return (
    <>
    
    <ReportModalOverlay>
      <ModalContainer>
        <BackButton onClick={onClose}>
          <GoChevronLeft size={24} />
        </BackButton>

        <ReportProfileContainer>
          <ReportProfileImage src={MateProfileImg} alt="User Profile" />
          <UserName>제이시</UserName>
        </ReportProfileContainer>


        <Dropdown>
          {/* DropdownToggle */}
          <DropdownToggle
            $isOpen={isDropdownOpen}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            {selectedReason}
            {isDropdownOpen ? <GoChevronUp size={16} /> : <GoChevronDown size={20} />}
          </DropdownToggle>

          {/* DropdownMenu */}
          {isDropdownOpen && (
            <DropdownMenu>
              {options.map((option) => (
                <DropdownItem
                  key={option}
                  onClick={() => {
                    setSelectedReason(option);
                    setIsDropdownOpen(false);
                  }}
                >
                  {option}
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </Dropdown>

        {/* 신고 내용 */}
        <DescriptionWrapper>
          <ReportDescription
            value={reportText}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setReportText(e.target.value)}
          />
        {!reportText && ( // reportText가 비어 있으면 Placeholder 표시
            <Placeholder className="placeholder">
            신고 내용을 입력해주세요.
            <br />
            <br />
            1. 이 회원이 신고 대상에 해당하는지 다시 한번 확인하여 주시기 바랍니다.
            <br />
            2. 신고를 제출 후, 사실 관계 확인을 위해 신고자에게 객관적인 자료를 요청할 수 있습니다.
            <br />
            3. 신고자 정보 및 신고 내용은 신고 대상에게 공개되지 않으나, 사실 관계 확인에 꼭 필요한 신고 내용의 일부는 언급될 수 있습니다.
            <br />
            4. 신고 대상은 이용 약관에 따라 활동 제한 등 불이익을 받을 수 있으며, 사실 관계 확인 시 쌍방 과실일 경우 
            신고자 또한 불이익을 받을 수 있습니다.
            </Placeholder>
        )}
        </DescriptionWrapper>

        <SubmitButton
            onClick={() => {
                if (reportText.length >= 10 && !isSubmitted) {
                setIsSubmitModalOpen(true);
                }
            }}
            $isactive={reportText.length >= 10}
            disabled={reportText.length < 10 && !isSubmitButtonEnabled}
        >
            {isSubmitted ? "제출 완료" : "제출하기"}
        </SubmitButton>

        
          {/* Toast Message */}
        {isToastVisible && (
          <ToastMessage>
            <ToastIcon><AiFillCheckCircle size={20}/></ToastIcon> 신고 완료되었습니다.
          </ToastMessage>
        )}
      </ModalContainer>
    </ReportModalOverlay>

    {/* Submit Modal */}
    {isSubmitModalOpen && (
      <SubmitModalOverlay>
        <DialogButton
          isOpen={isSubmitModalOpen}
          onCancel={() => setIsSubmitModalOpen(false)}
          onConfirm={handleConfirm}
          text="본 내용을 접수하시겠습니까?"
          cancelText="취소"
          confirmText="확인"
        />
      </SubmitModalOverlay>
    )}
        
    </>
  );
}