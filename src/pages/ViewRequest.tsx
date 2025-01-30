import React, { useState } from "react";
import styled from "styled-components";
import ListTabs from "../components/ListTabs";
import Navbar from "../components/navbar/BasicNavbar"
import AcceptButton from "../components/button/AcceptButton";
import RejectButton from "../components/button/RejectButton";
import SelectToggle from "../components/SelectToggle";
import mateImg from "../assets/profileImg/프로필3.png"
import GroupIcon from '../components/GroupIcon'
import { Icon } from '@iconify/react';

const ViewRequest: React.FC = () => {
  const [mainTab, setMainTab] = useState<string>("매칭 신청");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null); // 카테고리 필터 상태

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
    },
  ];

  const matchComplete = [
    {
      id: 3,
      category: "공동구매",
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
      case "공동구매":
        return (
          <GroupIconContainer>
            <GroupIcon size={24} />
          </GroupIconContainer>
        );
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
        <CardTop hasDate={mainTab === "매칭 완료"}>
          <CategoryWrapper>
            {/* 카테고리 아이콘 */}
            {getCategoryIcon(mate.category)}
            <Category>{mate.category}</Category>
          </CategoryWrapper>
          {mainTab === "매칭 완료" && <Date>{mate.date}</Date>}
        </CardTop>
        
        <MateInfo>
          <MateAvatar src={mate.avatar} alt={`${mate.name} 프로필`} />
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
              <ContactButton>연락 수단</ContactButton>
            )}
          </MateActions>
        </MateInfo>
      </MateCard>
    ));
  };

  return (
    <PageContainer>
        <Navbar title="매칭 신청" before={true} bell={true}></Navbar>
        {/* 상단 메인 탭 */}
        <ListTabs
            tabs={["매칭 신청", "매칭 완료"]}
            activeTab={mainTab}
            onTabClick={(tab) => setMainTab(tab)}
          />
        <FilterContainer>
          <SelectToggle
            options={["카테고리", "밥", "운동", "공부", "공동구매"]}
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

const CardTop = styled.div<{ hasDate: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.hasDate ? "space-between" : "flex-start")};
  padding: 7px 0;
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
  margin-top: 10px;
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

const GroupIconContainer = styled.div`
  width: 18px;
  height: 30px;
  transform: scale(0.50); /* 크기 조정 비율 */
`;