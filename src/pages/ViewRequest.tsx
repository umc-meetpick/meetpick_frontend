import { useState } from "react";
import styled from "styled-components";
import ListTabs from "../components/ListTabs";
import Navbar from "../components/navbar/BasicNavbar"
import AcceptButton from "../components/button/AcceptButton";
import RejectButton from "../components/button/RejectButton";
import SelectToggle from "../components/SelectToggle";
import mateImg from "../assets/profileImg/프로필3.png"
import { Icon } from '@iconify/react';
import { IoCloseOutline } from "react-icons/io5";
import Modal from '../components/modal/detailedModal';
import ModalwithReport from '../components/modal/detailedModalwithReport';


const ViewRequest: React.FC = () => {
  const [mainTab, setMainTab] = useState<string>("매칭 신청");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null); // 카테고리 필터 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"default" | "report">("default");

  const matchRequests = [
    {
      id: 1,
      category: "운동",
      name: "제이시",
      gender: "남성",
      age: 23,
      major: "경영학부",
      studentId: 20,
      avatar: mateImg,
      date: "24.01.07",
    },
    {
      id: 2,
      category: "밥",
      name: "제이시",
      gender: "남성",
      age: 23,
      major: "경영학부",
      studentId: 20,
      avatar: mateImg,
      date: "24.01.07",
    },
  ];

  const matchComplete = [
    {
      id: 3,
      category: "밥",
      name: "제이시",
      gender: "남성",
      age: 23,
      major: "경영학부",
      studentId: 20,
      avatar: mateImg,
      date: "24.01.09",
    },
    {
      id: 4,
      category: "공부",
      name: "제이시",
      gender: "남성",
      age: 23,
      major: "경영학부",
      studentId: 20,
      avatar: mateImg,
      date: "24.01.07",
    },
  ];


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

  const handleOpenContact = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactModalOpen(false);
  };


  const handleCopy = () => {
    navigator.clipboard.writeText("kakao_id_example");
    alert("카카오톡 ID가 복사되었습니다.");
  };


  const handleAccept = () => {
    console.log("수락 버튼 클릭");
  };

  const handleReject = () => {
    console.log("거절 버튼 클릭");
  };


  // 카테고리에 맞는 아이콘 반환하는 함수
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "밥":
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
          <MateAvatar onClick={handleOpenModal} src={mate.avatar} alt={`${mate.name} 프로필`} />
          <MateDetails>
            <MateName>{mate.name}</MateName>
            <MateSubDetails>
              <div>{mate.gender}</div>
              <div>{mate.studentId}학번, {mate.age}살</div>
              <div>{mate.major}</div>
            </MateSubDetails>
          </MateDetails>
          {/* 버튼 렌더링 */}
          <MateActions>
            {mainTab === "매칭 신청" ? (
              <>
                <ButtonContainer>
                  <AcceptButton onClick={handleAccept} width="96px" height="32px" fontSize="14px" fontWeight="500"/>
                  <RejectButton onClick={handleReject} width="96px" height="32px" fontSize="14px" fontWeight="500" />
                </ButtonContainer>
              </>
            ) : (
              <ContactButton onClick={handleOpenContact}>연락 수단</ContactButton>
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
              onTabClick={(tab) => setMainTab(tab)}
            />
          <FilterContainer>
            <SelectToggle
              options={["카테고리", "밥", "운동", "공부"]}
              onChange={(selectedOption) =>
                setCategoryFilter(
                  selectedOption && selectedOption.value !== "카테고리"
                    ? selectedOption.value
                    : null
                )
              }
            />
          </FilterContainer>
          {/* 리스트 출력 */}
          <MateList>{renderList()}</MateList>
      </PageContainer>

      {isModalOpen && (
        modalType === "default" ? (
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        ) : (
          <ModalwithReport isOpen={isModalOpen} onClose={handleCloseModal} />
        )
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