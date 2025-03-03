import { useState, useEffect } from "react";
import styled from "styled-components";
import BasicNavbar from "../../components/navbar/BasicNavbar";
import SignupButton from "../../components/button/SignupButton";
import SignupInput from "../../components/SignupInput";
import SignupGrayButton from "../../components/button/SignupGrayButton";
import DropdownButton from "../../components/SignupDownList";
import SignupProgressbar from "../../components/progressbar/SignupProgressbar";
import { BsDot } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";


const Signup1 = () => {
  const [name, setName] = useState<string>(""); // 이름 상태
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showNextStep, setShowNextStep] = useState<boolean>(false); // 다음 단계 표시 여부
  const navigate = useNavigate(); // ✅ 페이지 이동을 위한 useNavigate 추가


  // 이름 입력 핸들러
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // 성별 버튼 클릭 핸들러
  const handleGenderClick = (gender: string) => {
    setSelectedGender(selectedGender === gender ? null : gender);
  };

  const handleNextStep = () => {
    
    // 생년월일을 YYYY-MM-DD 형식으로 변환
    const formattedBirthday = `${selectedYear}-${(selectedMonth ?? "01").padStart(2, "0")}-${(selectedDate ?? "01").padStart(2, "0")}`;

    // Signup2 페이지로 이동하면서 state 전달 
    navigate("/Signup2", {
      state: {name, gender:selectedGender, birthday:formattedBirthday},
    });
  };


  // Debounce 적용: 입력이 끝난 후 600ms 뒤에 실행
  useEffect(() => {
    const debouncedSetNextStep = debounce(() => {
      setShowNextStep(name.trim().length > 0); // 공백을 제외한 글자가 있을 때만 다음 단계 표시
    }, 600);

    debouncedSetNextStep();

    return () => {
      debouncedSetNextStep.cancel(); // cleanup 함수에서 debounce 취소
    };
  }, [name]);


  

  return (
    <>
      <BasicNavbar title="회원가입" />
      <SignupProgressbar currentStep={1} totalSteps={3} />
      <EntireContainer>
        <Text>다음 정보를 입력해주세요!</Text>
        <Container>
          {/* 1단계: 이름 입력 */}
          <SignupInput
            placeholder={"이름"}
            $marginBottom={50}
            value={name}
            onChange={handleNameChange}
          />
          {/* 2단계: 이름이 입력되면 성별 선택 표시 */}
          {showNextStep && (
            <>
              <Title>
                <BsDot size="30px" color="#34A3FD" />
                성별
              </Title>
              <GrayButtonContainer>
                <SignupGrayButton
                  text="남성"
                  width="80px"
                  $isSelected={selectedGender === "남성"}
                  onClick={() => handleGenderClick("남성")}
                />
                <SignupGrayButton
                  text="여성"
                  width="80px"
                  $isSelected={selectedGender === "여성"}
                  onClick={() => handleGenderClick("여성")}
                />
              </GrayButtonContainer>
            </>
          )}
          {/* 3단계: 성별이 선택되면 생년월일 선택 표시 */}
          {selectedGender&&showNextStep && (
            <>
              <Title>
                <BsDot size="30px" color="#34A3FD" />
                생년월일
              </Title>
              <GrayButtonContainer>
                <DropdownButton
                  height="40px"
                  text={selectedYear || "연도 ∨"}
                  width="90px"
                  options={[
                    "1990","1991","1992","1993","1994","1995","1996","1997","1998","1999","2000",
                    "2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011",
                    "2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"
                  ]}
                  onSelect={(option: string) => setSelectedYear(option)}
                />
                <DropdownButton
                  height="40px"
                  text={selectedMonth || "월 ∨"}
                  width="90px"
                  options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]}
                  onSelect={(option: string) => setSelectedMonth(option)}
                />
                <DropdownButton
                  height="40px"
                  text={selectedDate || "일 ∨"}
                  width="90px"
                  options={[
                    "1","2","3","4","5","6","7","8","9","10",
                    "11","12","13","14","15","16","17","18","19","20",
                    "21","22","23","24","25","26","27","28","29","30","31"
                  ]}
                  onSelect={(option: string) => setSelectedDate(option)}
                />
              </GrayButtonContainer>
            </>
          )}
         
              {/* 모든 단계가 완료되면 다음 버튼 활성화 */}
              {name&&selectedGender&&selectedYear&&selectedMonth&&selectedDate&&(
                <ButtonContainer>
                  <Link to="/Signup">
                  <SignupButton
                    text="이전"
                    $backgroundColor="#F5F5F5"
                    width="140px"
                    color="black"
                  />
                  </Link>
                  <SignupButton
                    text="다음"
                    $backgroundColor="#E7F2FE"
                    width="140px"
                    color="#326DC1"
                    disabled={!selectedDate} // 학번이 선택되지 않으면 비활성화 
                    onClick={handleNextStep}
                  />
                </ButtonContainer>
          )}
          
        </Container>
      </EntireContainer>
    </>
  );
};

export default Signup1;

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

const GrayButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 50px;
  align-items:center;
  font-weight:550;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  gap:5px;
`;