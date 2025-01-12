import React, { useState } from "react";
import styled from "styled-components";
import BasicNavbar from "../components/BasicNavbar";
import AgreeItem from "../components/SignupAgree";
import SignupButton from "../components/SignupButton";
import { Link } from "react-router-dom";

const Signup = () => {
  const [allChecked, setAllChecked] = useState(false);
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
            />
            <AgreeItem
              text="(필수) 개인정보 수집 / 이용 동의"
              hasViewButton={true}
              checked={agreements.privacy}
              onChange={() => handleIndividualCheck("privacy")}
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
          <SignupButton
            text="이전"
            $backgroundColor="#F5F5F5"
            width="150px"
            color="black"
            onClick={() => console.log("이전 버튼 클릭")}
          />
          <Link to={areRequiredChecked ? "/Signup1" : "#"}>
            <SignupButton
              text="다음"
              $backgroundColor={areRequiredChecked ? "#E7F2FE" : "#E0E0E0"}
              width="150px"
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
    </>
  );
};

export default Signup;

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding:0 35px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 50px;
`;

const AgreeList = styled.div`
  display: flex;
  flex-direction: column;
`;

const SecondAgree = styled.div`
  padding: 8px;
`;
