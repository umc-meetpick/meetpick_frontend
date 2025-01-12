import React, { useState } from "react";
import styled from "styled-components";
import BasicNavbar from "../../components/navbar/BasicNavbar";
import SignupButton from "../../components/button/SignupButton";
import SignupInput from "../../components/SignupInput";
import SignupProgressbar from "../../components/progressbar/SignupProgressbar";
import { Link } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";

const Signup2 = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // 이메일 에러 메시지 상태
  const [verificationCode, setVerificationCode] = useState("");
  const [codeError, setCodeError] = useState(""); // 인증번호 에러 메시지 상태

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = () => {
    if (!validateEmail(email)) {
      setEmailError("이메일을 확인해주세요.");
    } else {
      setEmailError("");
      console.log("인증하기 버튼 클릭");
    }
  };

  const handleCodeSubmit = () => {
    if (verificationCode === "") {
      setCodeError("인증번호를 확인해주세요.");
    } else {
      setCodeError("");
      console.log("확인 버튼 클릭");
    }
  };

  const handlePrevious = () => {
    console.log("이전 버튼 클릭");
  };

  const handleNext = () => {
    console.log("다음 버튼 클릭");
  };

  return (
    <>
      <BasicNavbar title="회원가입" />
      <SignupProgressbar currentStep={2} totalSteps={3} />
      <EntireContainer>
        <Text>학교를 인증해주세요!</Text>
        <Container>
          <SignupInputContainer>
            <SignupInput placeholder={"재학 중인 학교"} />
          </SignupInputContainer>
          <SignupInputContainer>
            <SignupInput
              placeholder="학교 이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              hasButton={true}
              buttonText="인증하기"
              onButtonClick={handleEmailSubmit}
            />
            <BottomText>
              <BsDot size="15px" color="#34A3FD" />
              반드시 학교 도메인 이메일로 인증해주세요! ex) ooooo@soogsil.ac.kr
            </BottomText>
            {emailError && <ErrorText><MdErrorOutline/>{emailError}</ErrorText>}
          </SignupInputContainer>
          <SignupInputContainer>
            <SignupInput
              placeholder={"인증번호"}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              hasButton={true}
              buttonText="확인"
              onButtonClick={handleCodeSubmit}
            />
            <BottomText>
              <BsDot size="15px" color="#34A3FD" />
              이메일로 전송받은 인증번호를 입력해주세요!
            </BottomText>
            {codeError && <ErrorText><MdErrorOutline/>{codeError}</ErrorText>}
          </SignupInputContainer>
          <ButtonContainer>
            <Link to="/Signup1">
              <SignupButton
                text="이전"
                $backgroundColor="#F5F5F5"
                width="150px"
                color="black"
                onClick={handlePrevious}
              />
            </Link>
            <Link to="/Signup3">
              <SignupButton
                text="다음"
                $backgroundColor="#E7F2FE"
                width="150px"
                color="#326DC1"
                onClick={handleNext}
              />
            </Link>
          </ButtonContainer>
        </Container>
      </EntireContainer>
    </>
  );
};

export default Signup2;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  font-size: 21px;
  font-weight: bold;
`;

const EntireContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  padding: 0 40.5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 40px;
  gap:5px;
`;

const BottomText = styled.p`
  color: #8b8b8b;
  font-size: 12px;
  display: flex;
`;

const ErrorText = styled.p`
  color: #DB1818;
  font-size: 13px;
  margin-top: 5px;
  display:flex;
  align-items:center;
  font-weight:bold;

  svg {
    margin-right: 5px; /* 아이콘과 텍스트 사이의 간격 */
  }
`;

const SignupInputContainer = styled.div`
  margin-bottom: 45px;
`;
