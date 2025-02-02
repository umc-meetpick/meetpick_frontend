import { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import BasicNavbar from "../../components/navbar/BasicNavbar";
import studyProfileQuery from "../../assets/queries/studyProfileQuery";
import { useChatContext } from "../../context/useChatContext";
import recommend_study from "../../assets/profileImg/recommend_study.png"
import { StudyProfileInfoContext } from "../../context/studyInfoContext";
import ToggleListModal from "../../components/modal/ToggleListModal";
import SelectNumModal from "../../components/modal/selectNumModal";
import ChatingInput from "../../components/input/ChatingInput";
import { useNavigate } from "react-router-dom";
import SetDateTimeModal from "../../components/modal/SetDateTimeModal";

interface OptionClick{
    option:string;
    type?: string;
}
const StudyMateProfile = () =>{
    const {messages, addMessage, resetMessages} = useChatContext();
    const [currentQueryIndex, setCurrentQueryIndex] = useState(0); 
    const { setGender, majors, setStudentNum, ageRange, mbtiList, setMbtiList, subject,
        studyType, setStudyType, place, dateTime, peopleNum, ment } = useContext( StudyProfileInfoContext );
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenM, setModalOpenM] = useState(false);
    const [modalOpenS, setModalOpenS] = useState(false);
    const [modalOpenS2, setModalOpenS2] = useState(false);
    const [modalOpenD, setModalOpenD] = useState(false);
    const [chatDisable, setChatDisable] = useState(true);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<number | null>(null);
    const hasRun = useRef(false);
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [saveType, setSaveType] = useState("");

    const navigate = useNavigate();

    const scrollToBottom = () => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if ( !modalOpen && studyType!= "" && subject != "" && subject != "기타") {
            addMessage({ question: [studyType], direction: "outgoing" });
            addMessage({ question: [subject], direction: "outgoing" });
            nextOption(); 
        }else if( !modalOpen && studyType!= "" && subject == "기타") {
            setModalOpen(false)
            setChatDisable(false)
            setSaveType("subject");
        }
    }, [ modalOpen, studyType, subject]);

    useEffect(() => {
        if ( !modalOpenM && majors.length > 0) {
            addMessage({ question: [majors.join(", ") + "!"], direction: "outgoing" });
            nextOption(); 
        }
    }, [ modalOpenM, majors]);

    useEffect(() => {
        if (mbtiList.length === 4) {
          addMessage({ question: [mbtiList.join("")], direction: "outgoing" });
        }
      }, [mbtiList]);

    useEffect(() => {
        if ( !modalOpenS && ageRange.length > 0) {
            addMessage({ question: [ `${ ageRange[0] == ageRange[1] ? ageRange[0] : ageRange.join("~") }살 메이트면 좋겠어`], direction: "outgoing" });
            nextOption(); 
        }
    }, [ modalOpenS, ageRange]);

    useEffect(() => {
        if ( !modalOpenS2 && peopleNum > 0) {
            addMessage({ question: [ `${peopleNum}명의 메이트와 함께!`], direction: "outgoing" });
            nextOption(); 
        }
    }, [ modalOpenS2, peopleNum]);

    useEffect(() => {
        if (!modalOpenD && Object.keys(dateTime).length > 0) {
            Object.entries(dateTime).forEach(([date, times]) => {
                addMessage({
                    question: [`${date}: ${times.join(", ")}`],
                    direction: "outgoing"
                });
            });
            nextOption();
        }
    }, [modalOpenD, dateTime]);

    useEffect(()=>{
        if (chatDisable && place!=""){
            setChatDisable(true);
            addMessage({ question: [ `${place}`], direction: "outgoing" });
            nextOption(); 
        }
    },[place])
    
    useEffect(() => {
        if ( chatDisable && ment.length > 0){
            addMessage({ question: [ment], direction: "outgoing" });
            nextOption(); ``
        }
    }, [ment])

    useEffect(() => {
        const hasWaveEmoji = messages.some((msg) =>
            msg.question?.includes("👋")
        );

        if (hasWaveEmoji) {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                resetMessages();
                navigate("/waitForMate",{state:"공부"}); 
            }, 3000);
        }
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [messages, navigate]);

    useEffect(() => {
        if (!hasRun.current) {
          hasRun.current = true; 
          if (messages.length === 0) {
            addMessage({
              question: studyProfileQuery[0].question,
              direction: studyProfileQuery[0].direction as "incoming" | "outgoing",
            });
          }
        }
      }, [messages, addMessage, studyProfileQuery]);

    useEffect(() => {
        const handleResize = () => {
            const isSmallViewport = window.innerHeight < 400; 
            setKeyboardOpen(isSmallViewport);
        };
        
        window.addEventListener("resize", handleResize);
        
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleOptionClick = ({option, type}: OptionClick): void => {
        if (type == "studyType"){
            setStudyType(option);
            if ( option == "스터디"){
                setModalOpen(true);
            }else{
                setChatDisable(false); 
                setSaveType("subject");
            }
        }else if (type == "major" && option != "상관없어"){
            setModalOpenM(true); 
        }else if (type == "studentNum" && option != "상관없어"){
            setStudentNum(option);
            addMessage({ question: [option+"로 부탁해~"], direction: "outgoing" });
        }else if (type == "age" && option == "메이트 나이 설정하기"){
            setModalOpenS(true); 
        }else if (type == "mbti"){
            addMessage({ question: [option], direction: "outgoing" });
            if (option == "상관없어"){
                const nextQueryIndex = currentQueryIndex + 5;
                if (nextQueryIndex < studyProfileQuery.length && !modalOpen ) {
                    setTimeout(() => {
                        addMessage({ question: studyProfileQuery[nextQueryIndex]?.question, direction: "incoming" });
                        setCurrentQueryIndex(nextQueryIndex); 
                    },500);
                }
            }
            }else if (type?.includes("mbti") ) {
                if (option == "상관없어!"){
                    setMbtiList([...mbtiList, "x"]);
                }else{
                    const mbtiMap: { [key: string]: string } = {
                        EI: option === "활기찬" ? "E" : "I",
                        SN: option === "현실적" ? "S" : "N",
                        TF: option === "객관적" ? "T" : "F",
                        JP: option === "체계적" ? "J" : "P",
                    };
                
                    const mbtiKey = type.split("-")[1]; 
                    const mbtiValue = mbtiMap[mbtiKey];
                    setMbtiList([...mbtiList, mbtiValue]);
                }
        }else if (type == "gender" ){
            setGender(option);
            addMessage({ question: [option], direction: "outgoing" });
        }else if (type == "hobby"){
            addMessage({ question: [option], direction: "outgoing" })
            setChatDisable(false);
            setSaveType("ment");
        } else if (type == "date"){
            setModalOpenD(true);
        }else if (type == "peopleNum"){
            setModalOpenS2(true); 
        }else if (type == "place" && option == "있어!"){
            setSaveType("place")
            setChatDisable(false);
        }else{
            addMessage({ question: [option], direction: "outgoing" });
        }
        
        if (!((type == "major" && option != "상관없어") || type == "studyType"
            || (type == "place" && option == "있어!") || (type == "age" && option != "상관없어") 
            || type == "date" || type == "peopleNum"
            || (type == "mbti" && option == "상관없어") 
            )){
                nextOption();
            }
    };
    const nextOption = () =>{
        const nextQueryIndex = currentQueryIndex + 1;
        setCurrentQueryIndex(-1); 
        if (nextQueryIndex < studyProfileQuery.length && !modalOpen ) {
            setTimeout(() => {
                addMessage({ question: studyProfileQuery[nextQueryIndex]?.question, direction: "incoming" });
                setCurrentQueryIndex(nextQueryIndex); 
            },500);
        }
    }
    return(
        <>
            <BasicNavbar title="공부 메이트 찾기" bell={true}></BasicNavbar>
            <Container>
                <StyledMainContainer>
                    <MessagesContainer>
                        {messages.map((msg, index) => (
                            msg.question?.map((que, idx) => (
                                <ImageContainer key={`${index}-${idx}`}>
                                    {idx + 1 === msg.question?.length && msg.direction === "incoming" && (
                                        <Img src={recommend_study} alt="공부 프로필" />
                                    )}
                                    {
                                        que == "👋" ? (
                                            <ByeImoticon> {que}</ByeImoticon>
                                        ) : (
                                            <BaseMessage
                                                direction={msg.direction}
                                                $isImg={idx + 1 === msg.question?.length && msg.direction === "incoming"}
                                                $length={que.length}
                                            >
                                                {que}
                                            </BaseMessage>
                                        )
                                    }
                                </ImageContainer>
                            ))
                        ))}
                    </MessagesContainer>
                    <div ref={messageEndRef} />
                </StyledMainContainer>
                <OptionsContainer $isSmall={window.innerHeight <700}>
                        {currentQueryIndex >=0 && studyProfileQuery[currentQueryIndex]?.options && (
                            <>
                                {studyProfileQuery[currentQueryIndex].options.map((option, idx) => (
                                    <Button 
                                        key={idx} 
                                        onClick={
                                            () => handleOptionClick({option, type: studyProfileQuery[currentQueryIndex]?.type}) 
                                        }
                        
                                        $ismodal={ (studyProfileQuery[currentQueryIndex]?.type == "age" && option != "상관없어") 
                                            || studyProfileQuery[currentQueryIndex]?.type == "major" && option != "상관없어"
                                            || studyProfileQuery[currentQueryIndex]?.type == "peopleNum"}
                                        $isSelected={studyProfileQuery[currentQueryIndex]?.type == "age" && option != "상관없어"}
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </>
                        )}
                    </OptionsContainer>
                    <ChatingInput 
                        disable={chatDisable} 
                        setChatDisable={setChatDisable} 
                        keyboard={keyboardOpen} 
                        save={saveType}
                        type="study"
                    />
                    { modalOpen && <ToggleListModal setModalOpen={setModalOpen} type="study"/> }
                    { modalOpenM && <ToggleListModal setModalOpen={setModalOpenM} type="major"/> }
                    { modalOpenS && 
                        <SelectNumModal 
                            setModalOpen={setModalOpenS} 
                            title="공부 메이트 나이"
                            min={20}
                            max={28}
                            isRange={true}
                            type="study"
                        /> }
                    { modalOpenS2 && 
                        <SelectNumModal 
                            setModalOpen={setModalOpenS2} 
                            title="공부 메이트 인원수"
                            min={1}
                            max={10}
                            isRange={false}
                            type="study"
                        /> }
                    { modalOpenD && 
                        <SetDateTimeModal
                            title="공부 메이트 시간대"
                            setModalOpen={setModalOpenD}
                            type="study"
                        />}
            </Container>
        </>
    )
}
export default StudyMateProfile;

const Container = styled.div`
    width: calc(100vw); 
    max-width: 393px; 
    height:calc(100vh - 100px);
    position:fixed;
    top:60px;
    background: linear-gradient(to bottom, #F1F8FF, #D1E8FF);
    font-family: "Pretendard Variable";
`;
const StyledMainContainer = styled.div`
    width: calc(100vw); 
    max-width: 393px; 
    height: ${window.innerHeight > 700 ? '65%': '60%'};
    overflow-x: hidden;
    overflow-y: auto;
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
    *{
        font-size:13px;
        color: black;
    }
    *{
        font-size:13px;
        color: black;
    }
`;
const MessagesContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;
const ImageContainer= styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
`;
const OptionsContainer = styled.div<{ $isSmall: boolean }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: center; 
    gap: 10px;  
    margin-top: ${({ $isSmall }) => $isSmall ?  "calc(100vh * 0.15)" : "calc(100vh * 0.05)"};
    margin-bottom: calc(100vh * 0.1); 
`;
const BaseMessage = styled.div<{ direction: string, $isImg : boolean, $length:number }>`
    width:180px;
    height: ${({$length})=> $length < 17 ? "35px" : `${$length + 15}px`};
    padding: 12px 15px;
    margin: 10px;
    margin-left: ${({ direction, $isImg }) =>
    direction === "incoming" 
      ? $isImg 
        ? "18px" 
        : "75px" 
      : "130px"};
    position:relative;
    display: flex;
    align-items: center; 
    div{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        word-wrap: break-word;
        line-height: 1.6;
    }
    border-radius: 15px;
    position: relative;
    background-color: white;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2); 
    margin-bottom: 20px;
    &:after {
        content: "";
        position: absolute;
        top: 35px;
        ${({ direction }) =>
        direction === "incoming"
            ? `left: -10px; border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 20px solid white; transform: translateY(50%) rotate(240deg);`
            : `right: -10px; border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 20px solid white; transform: translateY(50%) rotate(120deg);`}
    }
    
`;
const Img = styled.img`
    width:50px;
    height:50px;
    border-radius:100px;
    margin-left:10px;
    margin-top:30px;
`;
const Button = styled.button<{$ismodal: boolean, $isSelected:boolean}>`
    background-color: ${({$ismodal, $isSelected})=> $ismodal ? "#38ABFF" : ($isSelected ? "#EFF3FE" : "white")};
    color: ${({$ismodal, $isSelected})=> $ismodal ? "white" : ($isSelected ? "#007AFF" : "black")};
    border: ${({$isSelected})=>$isSelected ? "1px solid #007AFF" : "none"};
    border-radius:100px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2); 
    &:focus {
        outline: none;
    }
`;
const ByeImoticon = styled.div`
    font-size:50px;
    margin-top:10px;
    margin-left:5px;
`;