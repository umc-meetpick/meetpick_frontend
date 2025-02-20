import * as React from 'react';
import { useState } from "react";
import styled from "styled-components";
import ListTabs from "../components/ListTabs";
import Navbar from "../components/navbar/BasicNavbar"
import DialogButton from '../components/button/DialogButton';
import AcceptButton from "../components/button/AcceptButton";
import RejectButton from "../components/button/RejectButton";
import SelectToggle from "../components/SelectToggle";
import { Icon } from '@iconify/react';
import { IoCloseOutline } from "react-icons/io5";
import Modal from '../components/modal/detailedModal';
import ModalwithReport from '../components/modal/detailedModalwithReport';
import useGetCompletedMatch from '../apis/matches/getCompletedMatch'
import useGetRequestMatch from "../apis/matches/getRequestMatch";
import { usePatchRequest } from '../apis/matches/patchRequest';
import getContactInfo from '../apis/detailMemberInfo/getContactInfo';
import axios from 'axios';


interface Mate {
  mappingId: number;
  id: number;
  category: string;
  name: string;
  gender: string;
  nickName: string;
  age: number;
  major: string;
  studentId: string;
  imageUrl: string;
  date: string;
}

const ViewRequest: React.FC = () => {
  const [mainTab, setMainTab] = useState<string>("매칭 신청");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null); // 카테고리 필터 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"default" | "report">("default");
  const [kakaoId, setKakaoId] = useState<string | null>(null); // 카카오톡 ID 저장
  const [isProcessing, setIsProcessing] = useState(false); // 요청 중 여부
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  
  
  const patchRequest = usePatchRequest();


  const { data: completedMatchData } = useGetCompletedMatch("전체", 0, 10); // 예시: type=all, 첫 번째 페이지, 10개 조회
  const { data: requestMatchData } = useGetRequestMatch("전체", 0, 10); // 예시: type=all, 영영 번째 페이지, 0개 조회
  

  const matchRequests: Mate[] = requestMatchData?.map((item) => ({
    mappingId: item.mappingId,
    id: item.memberSecondProfileId,
    gender: item.gender,
    nickName: item.nickName,
    category: item.mateType,
    name: item.studentNumber.toString(),
    age: item.age,
    major: item.major,
    studentId: item.studentNumber,
    imageUrl: item.imageUrl, // 이미지 제공 여부 확인 필요
    date: "",  // 매칭 신청에는 생성일자가 없으므로 빈 문자열로 처리
  })) || [];

  const matchComplete: Mate[] = completedMatchData?.map((item: any) => ({
    id: item.id,
    gender: item.gender,
    nickName: item.nickName,
    category: item.category,
    name: item.name,
    age: item.age,
    major: item.major,
    studentId: item.studentId,
    imageUrl: item.imageUrl, // API에서 이미지 제공 여부 확인 필요
    date: item.date, 
  })) || [];

  const handleOpenModal = () => {
    if (mainTab === "매칭 신청") {
      setModalType("default");
    } else {
      setModalType("report");
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenAcceptDialog = (requestId: number) => {
    setSelectedRequestId(requestId);
    setIsAcceptDialogOpen(true);
  };

  const handleOpenContact = (mateId: number) => {
    // matchRequests에서 mateId와 일치하는 요청 찾기
    const selectedRequest = matchRequests.find((req) => req.id === mateId);
    const mappingId = selectedRequest?.mappingId; // 해당 요청의 mappingId 가져오기
  
    if (!mappingId) {
      alert("매칭된 mappingId를 찾을 수 없습니다.");
      return;
    }
  
    console.log(`📞 연락 수단 버튼 클릭 - mappingId: ${mappingId}`);
  
    getContactInfo(mappingId)
      .then((contactInfo) => {
        if (contactInfo?.contactName) {
          setKakaoId(contactInfo.contactName);
          console.log(`✅ 연락처 가져오기 성공: ${contactInfo.contactName}`);
        } else {
          setKakaoId(null);
          alert("상대방의 카카오톡 ID를 찾을 수 없습니다.");
        }
  
        setIsContactModalOpen(true);
      })
      .catch((error) => {
        console.error("❌ 연락처 정보를 불러오지 못했습니다:", error);
        alert("연락처 정보를 불러오지 못했습니다.");
      });
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


  // 카테고리에 맞는 아이콘 반환하는 함수
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "혼밥":
        return <Icon icon="fluent-color:food-20" width="19" height="19" />;
      case "운동":
        return <Icon icon="fluent-color:sport-16" width="19" height="19" />;
      case "공부":
        return <Icon icon="fluent-color:edit-24" width="19" height="19" />;
      default:
        return null;
    }
  };

  const renderList = () => {
    const currentList =
      mainTab === "매칭 신청" ? matchRequests : matchComplete;

    const filteredList = categoryFilter
      ? currentList.filter((mate) => mate.category === categoryFilter)
      : currentList; // 카테고리 필터링 적용

    return filteredList.map((mate) => (
      <MateCard key={mate.id}>
        {/* 상단 category와 date */}
        <CardTop $hasdate={mainTab === "매칭 완료"}>
          <CategoryWrapper>
            {/* 카테고리 아이콘 */}
            {getCategoryIcon(mate.category)}
            <Category>{mate.category}</Category>
          </CategoryWrapper>
          {mainTab === "매칭 완료" && <Date>{mate.date}</Date>}
        </CardTop>
        
        <MateInfo>
          <MateAvatar onClick={handleOpenModal} src={mate.imageUrl} alt={`${mate.name} 프로필`} />
          <MateDetails>
            <MateName>{mate.nickName}</MateName>
            <MateSubDetails>
              <div>{mate.gender}</div>
              <div>{mate.studentId}, {mate.age}살</div>
              <div>{mate.major}</div>
            </MateSubDetails>
          </MateDetails>
          {/* 버튼 렌더링 */}
          <MateActions>
            {mainTab === "매칭 신청" ? (
              <>
                <ButtonContainer>
                  <AcceptButton onClick={() => handleOpenAcceptDialog(mate.id)} width="96px" height="32px" fontSize="14px" fontWeight="500"/>
                  <RejectButton onClick={() => handleReject(mate.id)} width="96px" height="32px" fontSize="14px" fontWeight="500" />
                </ButtonContainer>
              </>
            ) : (
              <ContactButton onClick={() => {
                console.log("mate 객체:", mate);
                console.log("mate.mappingId:", mate.id);
                handleOpenContact(mate.id);
              }}>연락 수단</ContactButton>
            )}
          </MateActions>
        </MateInfo>
      </MateCard>
    ));
  };

  return (
    <>
      <PageContainer>
          <Navbar title="매칭 신청" bell={true}></Navbar>
          {/* 상단 메인 탭 */}
          <ListTabs
              tabs={["매칭 신청", "매칭 완료"]}
              activeTab={mainTab}
              onTabClick={(tab: React.SetStateAction<string>) => setMainTab(tab)}
          />
          <FilterContainer>
            <SelectToggle
              options={["카테고리", "밥", "운동", "공부"]}
              onChange={(selectedOption: { value: string; label: string } | null ) => {
                setCategoryFilter(
                  selectedOption && selectedOption.value !== "카테고리"
                    ? selectedOption.value
                    : null
                )
              }
              }/>
          </FilterContainer>
          <MateList>{renderList()}</MateList>
      </PageContainer>

      {isModalOpen && (
        modalType === "default" ? (
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} matchingRequestId={1}/>
        ) : (
          <ModalwithReport isOpen={isModalOpen} onClose={handleCloseModal} />
        )
      )}

      {/* 수락 확인 Dialog */}
      {isAcceptDialogOpen && (
        <Overlay>
        <DialogButton
          isOpen={isAcceptDialogOpen}
          onCancel={() => setIsAcceptDialogOpen(false)}
          onConfirm={() => {
            if (selectedRequestId !== null) {
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

export default ViewRequest;


const PageContainer = styled.div`
  font-family: 'Pretendard Variable', sans-serif;
  background-color: #fff;
  padding: 0 20px 5px 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 0 16px;
`;

const MateList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MateCard = styled.div`
  display: flex;
  padding: 10px 1px;
  margin: 15px;
  background-color: #ffffff;
  width: 100%;
  flex-direction: column;
  border-bottom: 1px solid #E4E6E9;
`;

const CardTop = styled.div<{ $hasdate: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.$hasdate ? "space-between" : "flex-start")};
  padding: 8px 0;
  width: 90%;
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Category = styled.div`
  font-weight: 600;
  font-size: 14px;
  display: flex;
`;

const Date = styled.div`
  font-size: 11px;
  color: #525252;
  margin-top: 4px;
`;

const MateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const MateAvatar = styled.img`
  width: 68px;
  height: 68px;
  border: 1px solid #DADADA;
  border-radius: 50%;
  width: 50%;
  margin-right: 10px;
  cursor: pointer;
`;

const MateDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MateName = styled.div`
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 5px;
`;

const MateSubDetails = styled.div`
  font-size: 13px;
  color: #3F3F3F;
  display: flex;
  flex-direction: column;
`;

const MateActions = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  width: 100%;
`;

const ContactButton = styled.button`
  width: 112px;
  height: 32px;
  padding: 0 6px;
  font-size: 13px;
  font-weight: 500;
  border: none;
  border-radius: 33px;
  color: #005EC5;
  background-color: #E7F2FE;
  cursor: pointer;
  width: 80%;
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