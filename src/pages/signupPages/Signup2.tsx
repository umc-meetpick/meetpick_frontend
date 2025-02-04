import { useState } from "react";
import styled from "styled-components";
import BasicNavbar from "../../components/navbar/BasicNavbar";
import SignupButton from "../../components/button/SignupButton";
import SignupInput from "../../components/SignupInput";
import SignupProgressbar from "../../components/progressbar/SignupProgressbar";
import { Link } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import { getUniversities } from "../../apis/signup/UniversityAPI";
import { debounce } from "lodash"; // Debounce 적용

const Signup2 = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // 이메일 에러 메시지 상태
  const [verificationCode, setVerificationCode] = useState("");
  const [codeError, setCodeError] = useState(""); // 인증번호 에러 메시지 상태

  const [school, setSchool] = useState(""); // 학교 검색 입력값
  const [schoolList, setSchoolList] = useState<{universityName:string; address:string}[]>([]); // 자동완성 결과 리스트 / API 응답으로 받은 학교 목록 저장 상태 
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null); // 선택된 학교 이름 저장하는 상태 

   // Debounce 적용: 입력이 멈춘 후 500ms 뒤에 실행
   const fetchUniversities = debounce(async (query: string) => {
    if (query.trim().length === 0) {
        setSchoolList([]);  // 입력값이 없으면 리스트 비우기
        return;
    }

    const result = await getUniversities(query);
    //console.log("API Response/ result 리스트 출력:", result); 
    setSchoolList(result); // 검색 결과 리스트 업데이트
  }, 10);

    // 학교 이름 입력 핸들러
    const handleSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSchool(value);
      setSelectedSchool(null); // 새로운 입력값이 들어오면 선택 해제
      fetchUniversities(value); // Debounce 적용된 API 호출
    };
  
    // 학교 선택 핸들러
    const handleSelectSchool = (schoolName: string) => {
      setSchool(schoolName);
      setSelectedSchool(schoolName);
      setSchoolList([]); // 리스트 숨기기
    };

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
          <SignupInputContainer1>
            <SignupInput placeholder={"재학 중인 학교"}  value={selectedSchool || school} onChange={handleSchoolChange}/>
            {/* 자동완성 리스트 */}
            {schoolList?.length > 0 && (
            <DropdownContainer>
              {schoolList.map((school, index) => (
                <DropdownItem key={index} onClick={() => handleSelectSchool(school.universityName)}>
                    <UniversityName>{school.universityName}</UniversityName>
                    <Address>{school.address}</Address>
                </DropdownItem>
              ))}
            </DropdownContainer>
          )}

          </SignupInputContainer1>
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
              반드시 학교 도메인 이메일로 인증해주세요!<br/>ex) ooooo@soogsil.ac.kr
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
                width="140px"
                color="black"
                onClick={handlePrevious}
              />
            </Link>
            <Link to="/Signup3">
              <SignupButton
                text="다음"
                $backgroundColor="#E7F2FE"
                width="140px"
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


const Address = styled.div`
  color: #767373;
  font-size: 14px;
  font-weight: 400;
`
const UniversityName = styled.div`
  color:#29303E;
  font-size:15px;
  font-weight:500;
`

const DropdownContainer = styled.div`
  position: absolute;
  width: 300px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 195px;
  overflow-y: auto;
  z-index:9999999;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

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
  flex-direction: column;
  padding: 0 40.5px;
  font-family: "Pretendard Variable";
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
  margin-bottom: 30px;
`;

const SignupInputContainer1 = styled.div`
  margin-bottom: 50px;
`;
