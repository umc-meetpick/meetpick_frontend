import { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../../components/navbar/Navbar";
import ApplicationImage from "../../assets/images/Application.png";
import ApplicationAlert from "../../assets/images/ApplicationAlert.png";
import ApplicationGrayButton from "../../components/button/ApplicationGrayButton";
import ApplicationGrayBox from "../../components/ApplicationGrayBox";
import { IoHeart } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import getDetailProfile from "../../apis/detailMemberInfo/getDetailProfile";
import { useJoinRequest } from "../../apis/application/joinRequest";

const weekMap:Record<string,string> = {
    MON: "월",
    TUE : "화",
    WED : "수",
    THU : "목",
    FRI : "금",
    SAT : "토",
    SUN : "일"
};

const ExerciseApplication = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage]= useState<string | null>(null); // 메세지 상태 추가
    const [buttonMessage, setButtonMessage] = useState<string>("메이트 신청하기"); // 버튼에 있는 텍스트
    const [buttonStyle, setButtonStyle] = useState({ // 버튼 초기 스타일
        color: "#2760AD",
        background: "#E7F2FE",
    });

    const {requestId} = useParams();
    const {data:profileData, isError} = getDetailProfile(Number(requestId));

    const joinRequestMutation = useJoinRequest();

    const handleOpenModal = () => setIsModalOpen(true); // 팝업 열기

    const handleConfirm = async () => {
        if (!requestId) {
            console.error("❌ requestId가 존재하지 않습니다.");
            setMessage("신청할 수 없습니다.");
            setIsModalOpen(false);
            return;
        }

        try {
            await joinRequestMutation.mutateAsync({ requestId: Number(requestId) }); // ✅ API 호출
            setMessage("신청이 완료되었습니다.");
            setButtonMessage("신청 완료");
            setButtonStyle({
                color: "white",
                background: "#101010",
            });
        } catch (error) {
            console.error("❌ 매칭 참가 신청 실패:", error);
            setMessage("신청 조건을 다시 확인해주세요!");
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleError = () => {
        setMessage("신청 조건을 다시 확인해주세요!");
        setIsModalOpen(false); // 팝업 닫기
    };

    const handleCancel = () => {
        setIsModalOpen(false); // 팝업 닫기
    };

    // 메시지가 설정되었을 때 3초 뒤 메시지를 초기화
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null); // 메시지를 초기화
            }, 2000); // 2초 후에 실행

            return () => clearTimeout(timer); // 컴포넌트가 unmount 되거나 message가 바뀌면 타이머 클리어
        }
    }, [message]);

    useEffect(() => {
        if (isError) {
          handleError(); // 에러 발생 시 handleCancel 실행
        }
      }, [isError]); // isError 값이 변경될 때 실행

    const formatWeekAndTime = (weekAndTime: {week:string; times:string}[]) => {
        return weekAndTime.map(({week, times})=> {
            const koreanWeek = weekMap[week] || week;
            const formattedTimes = times.split(", ").map(time => `${time}:00`).join(", ");
            return `${koreanWeek} ${formattedTimes}`
        }).join(" / ");
    };

    return (
        <>
            <Navbar title ={profileData?.result?.공통?.nickName + "의 프로필"} before = {true}/>
            <Wrapper>
                <ImageContainer>
                    <StyledImage src={ApplicationImage} alt="회원가입 완료 이미지" />
                </ImageContainer>
                <Container>
                    <Text1>나이•학번</Text1>
                    <Button>
                        <ApplicationGrayButton text={profileData?.result?.공통?.age}/>
                        <ApplicationGrayButton text={profileData?.result?.공통?.studentNumber}/>
                    </Button>
                </Container>
                <DoubleContainer>
                    <Container>
                        <Text1>성별</Text1>
                        <Button>
                            <ApplicationGrayButton text={profileData?.result?.공통?.gender}/>
                        </Button>
                    </Container>
                    <Container>
                        <Text1>전공</Text1>
                        <Button>
                            <ApplicationGrayButton text={profileData?.result?.공통?.major} width="95"/>
                            <ApplicationGrayButton text={profileData?.result?.공통?.subMajor} width="68"/>
                        </Button>
                    </Container>
                </DoubleContainer>
                <DoubleContainer>
                    <Container>
                        <Text1>MBTI</Text1>
                        <Button>
                            <ApplicationGrayButton text={profileData?.result?.공통?.mbti} width="60"/>
                        </Button>
                    </Container>
                    <Container>
                        <Text1>취미</Text1>
                        <Button>
                        {(profileData?.result?.공통?.hobbies || []).map((hobby: string, index: number) => (
                            <ApplicationGrayButton key={index} text={hobby} width="60"/>
                        ))}

                        </Button>
                    </Container>
                </DoubleContainer>
            </Wrapper>
            <Mate>
                <HeartContainer>
                    <IoHeart color="#CC1414" size={16} />
                </HeartContainer>
                <Text2>
                    &nbsp;이런&nbsp;<span style={{ color: "#007AFF" }}>메이트</span>와&nbsp;<span style={{ color: "#007AFF" }}>운동</span>을 하고싶어!
                </Text2>
            </Mate>
            <Mate1>
                <ApplicationGrayBox text1="운동 종류" text2={profileData?.result?.타입?.exercise} width="152px" />
                <ApplicationGrayBox text1="인원수" text2={profileData?.result?.타입?.currentPeople} width="152px" />
            </Mate1>
            <Mate1>
                <ApplicationGrayBox text1="성별" text2={profileData?.result?.타입?.gender} width="152px" />
                <ApplicationGrayBox text1="나이 / 학번" text2={profileData?.result?.타입?.ageAndPeer} width="152px" />
            </Mate1>
            <Mate1>
                <ApplicationGrayBox text1="전공" text2={profileData?.result?.타입?.major||"상관없어"} width="152px" />
                <ApplicationGrayBox text1="MBTI" text2={profileData?.result?.타입?.mbti || "상관없어"} width="152px" />
            </Mate1>
            <Mate1>
                <ApplicationGrayBox text1="취미" text2={profileData?.result?.타입?.hobby} width="318px"/>
            </Mate1>
            <Mate1>
                <ApplicationGrayBox text1="시간대" text2={formatWeekAndTime(profileData?.result?.타입?.weekAndTime || [])} width="318px"/>
            </Mate1>
            <Mate1>
                <ApplicationGrayBox text1="운동 장소" text2={profileData?.result?.타입?.place} width="318px"/>
            </Mate1>
            <Mate1>
                <ApplicationGrayBox text1="하고 싶은 말" text2={profileData?.result?.타입?.comment} width="318px"/>
            </Mate1>
            <Button2>
                <ApplicationButton style={buttonStyle} onClick={handleOpenModal}>
                    {buttonMessage}
                </ApplicationButton>
            </Button2>

            {isModalOpen && (
                <ModalOverlay>
                    <AlarmBox>
                        <ModalContent>
                            <p>메이트 신청을 하시겠습니까?</p>
                        </ModalContent>
                        <Button3>
                            <ModalButton1 onClick={handleCancel}>취소</ModalButton1>
                            <ModalButton2 confirm onClick={handleConfirm}>확인</ModalButton2>
                        </Button3>
                    </AlarmBox>
                </ModalOverlay>
            )}

            {message && (
                <ModalOverlay>
                    <MessageContainer>
                        {message === "신청이 완료되었습니다." ? (
                            <CheckContainer><FaCheck color="white" size={10} /></CheckContainer> // 신청 완료 아이콘
                        ) : (
                            <StyledImage2 src={ApplicationAlert} alt="회원가입 완료 이미지" /> // 취소 시 다른 아이콘
                        )}
                        {message}
                    </MessageContainer>
                </ModalOverlay>
            )}
        </>
    )
}

export default ExerciseApplication;

const StyledImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%; /* 둥근 모양 */
`;

const StyledImage2 = styled.img`
  width: 14px;
  height: 14px;
  border-radius: 50%; /* 둥근 모양 */
  margin-right:10px;
`;

const ImageContainer = styled.div`
  margin-bottom: 18px;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top:13px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 37.5px;
`;

const Mate = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
  padding: 0 37.5px;
`;
const Mate1 =styled.div`
  display:flex;
  justify-content:center;
  padding:0 37.5px;
  gap:14px;
  margin-bottom:3px;
  font-size:14px;
  font-weight:600;
`
const Text1 = styled.p`
  display:flex;
  align-items:center;
  font-size:12px;
  color:#007AFF;
  font-weight:bold;
`
const Text2 = styled.p`
  display:flex;
  align-items:center;
  font-size:17px;
  color:#000;
  font-weight:bold;
  padding: 15px 0;
`
const Container = styled.div`
  margin-bottom:16px;
`
const Button = styled.div`
  display:flex;
  gap:8px;

`
const DoubleContainer = styled.div`
  display:flex;
  gap:20px;
`
const HeartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px; /* 아이콘 배경의 크기 */
  height: 24px; /* 아이콘 배경의 크기 */
  border-radius: 50%; /* 완전한 원 모양 */
  background-color: #FEECEC; /* 배경색 설정 */
`;

const CheckContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 14px; /* 아이콘 배경의 크기 */
    height: 14px; /* 아이콘 배경의 크기 */
    border-radius: 50%; /* 완전한 원 모양 */
    margin-right:10px;
    background-color: #52C41A; /* 배경색 설정 */
  
`;

const ApplicationButton = styled.button`
    color:#2760AD;
    width: 232px;
    height: 43.108px;
    border-radius: 25px;
    background: #E7F2FE;
    font-family: "Pretendard Variable";
    font-weight:bold;
`
const Button2 = styled.div`
    display:flex;
    justify-content:center;
    margin-top:15.51px;
    margin-bottom:24.89px;
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  width: 393px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.29); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 최상위 배치 */
`;


const ModalContent = styled.div`
  width: 270px;
  height:56px;
  background: rgba(244, 244, 244, 0.99);
  border-top-right-radius: 12px;
  border-top-left-radius:12px;
  padding: 10px 0;
  text-align: center;
  box-shadow: 0 4px 10px rgba(193, 75, 75, 0.09);
  color:#383838;
  font-family: "Pretendard Variable";
  font-weight:bold;
`;

const ModalButton1 = styled.button<{ confirm?: boolean }>`
  width: 135px;
  height: 45px;
  background:  rgba(244, 244, 244, 0.99);
  color: #007AFF;
  cursor: pointer;
  border-top-left-radius: 0; /* 왼쪽 상단 모서리 둥글기 제거 */
  border-top-right-radius: 0; /* 오른쪽 상단 모서리 둥글기 제거 */
  border-bottom-left-radius: 12px; /* 왼쪽 하단 모서리는 둥글게 설정 */
  border-bottom-right-radius: 0; /* 오른쪽 하단 모서리는 둥글게 설정 */

  border-top:1px solid #B3B3B3;
  border-right:1px solid #B3B3B3;


  &:hover {
    color:white;
    background: #007AFF;
  }
`;

const ModalButton2 = styled.button<{ confirm?: boolean }>`
  width: 135px;
  height: 45px;
  background: rgba(244, 244, 244, 0.99);
  color: #007AFF;
  cursor: pointer;
  border-top-left-radius: 0; /* 왼쪽 상단 모서리 둥글기 제거 */
  border-top-right-radius: 0; /* 오른쪽 상단 모서리 둥글기 제거 */
  border-bottom-left-radius: 0; /* 왼쪽 하단 모서리는 둥글게 설정 */
  border-bottom-right-radius: 12px; /* 오른쪽 하단 모서리는 둥글게 설정 */

  border-top:1px solid #B3B3B3;


  &:hover {
    color:white;
    background: #007AFF;
  }
`;

const Button3= styled.div`
    
`

const AlarmBox = styled.div`

`

const MessageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: auto;
    padding: 0 20px;
    height: 45px;
    background: white;
    color: black;
    font-size: 14px;
    font-family: "Pretendard Variable";
    border-radius:3px;
`
