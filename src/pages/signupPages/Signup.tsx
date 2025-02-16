import  { useState, useEffect } from "react";
import styled from "styled-components";
import BasicNavbar from "../../components/navbar/BasicNavbar";
import AgreeItem from "../../components/SignupAgree";
import SignupButton from "../../components/button/SignupButton";
import { Link } from "react-router-dom";
import getToken from "../../apis/login/getToken";
import { termsData } from "../../data/termsData";

const Signup = () => {
  const [allChecked, setAllChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [agreements, setAgreements] = useState({
    age: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  // 전체 동의 버튼 핸들러
  const handleAllCheck = () => {
    const newState = !allChecked;
    setAllChecked(newState);
    setAgreements({
      age: newState,
      terms: newState,
      privacy: newState,
      marketing: newState,
    });
  };

  const handleClickView = (type:"terms" | "privacy") => {
    setIsModalOpen(true);
    setModalContent(termsData[type]);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  useEffect(() => {
    getToken();
  }, []);
  
  // 개별 항목 핸들러
  const handleIndividualCheck = (key: keyof typeof agreements) => {

    const newAgreements = {
      ...agreements,
      [key]: !agreements[key],
    };
    setAgreements(newAgreements);

    // 모든 항목이 선택되었는지 확인하여 전체 동의 상태 업데이트
    setAllChecked(
      Object.values(newAgreements).every((value) => value)
    );
  };

  // 필수 항목(만 18세 이상, 서비스 이용 약관, 개인정보 동의)이 모두 체크되었는지 확인
  const areRequiredChecked = agreements.age && agreements.terms && agreements.privacy;

  return (
    <>
      <BasicNavbar title="회원가입" />
      <Container>
        <AgreeList>
          <AgreeItem
            text="약관 전체 동의"
            hasViewButton={false}
            $isMain={true}
            checked={allChecked}
            onChange={handleAllCheck}
          />
          <SecondAgree>
            <AgreeItem
              text="(필수) 만 18세 이상입니다."
              hasViewButton={false}
              checked={agreements.age}
              onChange={() => handleIndividualCheck("age")}
            />
            <AgreeItem
              text="(필수) 서비스 이용 약관"
              hasViewButton={true}
              checked={agreements.terms}
              onChange={() => handleIndividualCheck("terms")}
              onViewClick ={() => handleClickView("terms")}
            />
            <AgreeItem
              text="(필수) 개인정보 수집 / 이용 동의"
              hasViewButton={true}
              checked={agreements.privacy}
              onChange={() => handleIndividualCheck("privacy")}
              onViewClick ={() => handleClickView("privacy")}
            />
            <AgreeItem
              text="(선택) 마케팅 수신 동의"
              hasViewButton={false}
              checked={agreements.marketing}
              onChange={() => handleIndividualCheck("marketing")}
            />
          </SecondAgree>
        </AgreeList>
        <ButtonContainer>
          <Link to ='/login'>
          <SignupButton
            text="이전"
            $backgroundColor="#F5F5F5"
            width="140px"
            color="black"
            onClick={() => console.log("이전 버튼 클릭")}
          />
          </Link>
          <Link to={areRequiredChecked ? "/Signup1" : "#"}>
            <SignupButton
              text="다음"
              $backgroundColor={areRequiredChecked ? "#E7F2FE" : "#E0E0E0"}
              width="140px"
              color={areRequiredChecked ? "#326DC1" : "#A0A0A0"}
              disabled={!areRequiredChecked}
              onClick={() => {
                if (areRequiredChecked) {
                  console.log("다음 버튼 클릭");
                }
              }}
            />
          </Link>
        </ButtonContainer>
      </Container>

      {isModalOpen && (
                <ModalOverlay>
                    <Box>

                    </Box>
                </ModalOverlay>
            )}

    </>
  );
};

export default Signup;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  padding: 35px 35px;
  font-family: "Pretendard Variable";
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 35px;
  margin-bottom: 20px;
`;

const AgreeList = styled.div`
  display: flex;
  flex-direction: column;
`;

const SecondAgree = styled.div`
  padding: 8px;
`;


const ModalOverlay = styled.div`
  position:absolute;
  top: 0;
  left:0;
  width: 100vw; /* 🔥 뷰포트 전체를 덮도록 수정 */
  max-width:393px;
  height: 100vh; 
  background: rgba(0, 0, 0, 0.29); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99; /* 최상위 배치 */
`;

const Box = styled.div`
  width:300px;
  background-color:white;
  height:500px;
  display:flex;
  justify-content:center;
`