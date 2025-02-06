import { useState , useEffect} from "react";
import styled from "styled-components";
import BasicNavbar from "../../components/navbar/BasicNavbar";
import SignupButton from "../../components/button/SignupButton";
import SignupInput from "../../components/SignupInput";
import SignupProgressbar from "../../components/progressbar/SignupProgressbar";
import { Link } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import { useFetchUniversities } from "../../apis/home/homeFetch";
import { useVerifyEmail } from "../../apis/signup/vertifyEmail";
import { useSendEmailCode } from "../../apis/signup/vertifyEmail";

interface University {
  id:number;
  universityName:string;
  address:string;
}

const Signup2 = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // 이메일 에러 메시지 상태
  const [verificationCode, setVerificationCode] = useState("");
  const [codeError, setCodeError] = useState(""); // 인증번호 에러 메시지 상태

  const [query, setQuery] = useState(""); // 검색어 상태 
  const [search, setSearch] = useState(""); // 실제 API 요청에 사용될 검색어 상태 
  const [isTyping, setIsTyping] = useState<boolean>(false); // 사용자가 타이핑 중인지 여부 상태 확인 

  const { data: universities =[], isLoading: isLoadingUniversities } = useFetchUniversities(search);

  const [selectedSchool, setSelectedSchool] = useState<string | null>(null); // 선택된 학교 이름 저장하는 상태
  
  const verifyEmailMutation = useVerifyEmail(); // useMutation 훅 사용 
  const sendEmailMutation = useSendEmailCode(); // 이메일 인증 요청 API



  useEffect(() => {
    if (query) {
      setIsTyping(true);
      //console.log("⌨️ 검색어 입력 중:", query);
      setSearch(query);
      setIsTyping(false);
    } else {
      setSearch(""); // ✅ 검색어가 비어있다면 search도 초기화
    }
  }, [query]);


    // 학교 이름 입력 핸들러
    const handleSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      setSelectedSchool(null); // 새로운 입력값이 들어오면 선택 해제
    };
  
    // 학교 선택 핸들러
    const handleSelectSchool = (schoolName: string) => {
      setQuery(""); // 먼저 검색어 비우기 
      setSearch(""); // ✅ search도 초기화하여 API 요청 중지
      setSelectedSchool(schoolName); // 그리고 학교 선택 상태 업데이트 

      console.log("학교 선택 됨➡️",schoolName);
    };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 이메일 인증 요청 버튼 클릭 시 실행
  const handleSendEmail = () => {
    if(!validateEmail(email)) {
      setEmailError("이메일을 확인해주세요!");
      return;
    }
    if(!selectedSchool) {
      setEmailError("학교를 먼저 선택해주세요.");
      return;
    }
    setEmailError("");
    console.log("✔️이메일 인증 코드 요청 시작!!");

     // ✅ 보낼 데이터 콘솔에 출력
  const requestData = { email, univName: selectedSchool };
  console.log("📨 백엔드로 전송하는 데이터:", requestData);


    sendEmailMutation.mutate(
      {email, univName:selectedSchool},
      {
        onSuccess:(data)=> {
          console.log("✅이메일 인증 코드 요청 성공!", data);
          console.log("🔍 백엔드 응답 전체 데이터:", data);
        },
        onError:(error)=> {
          console.error("❌이메일 인증 코드 요청 실패", error);
        }
      }
    )
  }

  // 이메일 인증 코드 검증 버튼 클릭 시 실행 
  const handleVerifyEmail = () => {
    if(verificationCode === ""){
      setCodeError("인증번호를 입력해주세요!!");
      return;
    }
    setCodeError("");
    console.log("✔️이메일 인증 검증 시작!");

 
    verifyEmailMutation.mutate(
      {email, univName:selectedSchool || "", verificationCode:Number(verificationCode)},
      {
        onSuccess:(data)=> {
          console.log("✅이메일 인증 검증 성공!", data);
        },
        onError: (error)=> {
          console.error("❌이메일 인증 검증 실패!", error);
        }
      }
    )
  }



  return (
    <>
      <BasicNavbar title="회원가입" />
      <SignupProgressbar currentStep={2} totalSteps={3} />
      <EntireContainer>
        <Text>학교를 인증해주세요!</Text>
        <Container>
          <SignupInputContainer1>
            <SignupInput placeholder={"재학 중인 학교"}  value={selectedSchool || query} onChange={handleSchoolChange}/>
            {/* 자동완성 리스트 */}
            {!isLoadingUniversities && !isTyping && universities?.length > 0 && (
            <DropdownContainer>
              {universities.map((university:University) => (
                <DropdownItem key={university.id} onClick={() => handleSelectSchool(university.universityName)}>
                    <UniversityName>{university.universityName}</UniversityName>
                    <Address>{university.address}</Address>
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
              buttonText={verifyEmailMutation.isPending ? "요청 중...": "요청하기"}
              onButtonClick={handleSendEmail}
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
              buttonText={verifyEmailMutation.isPending ? "확인중":"확인"}
              onButtonClick={handleVerifyEmail}
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
              />
            </Link>
            <Link to="/Signup3">
              <SignupButton
                text="다음"
                $backgroundColor="#E7F2FE"
                width="140px"
                color="#326DC1"
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

  &::-webkit-scrollbar {
    width: 8px; 
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(0,0,0,0.1); 
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color:none;
  }
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
