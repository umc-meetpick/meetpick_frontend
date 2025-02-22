import { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import BasicNavbar from "../../components/navbar/BasicNavbar";
import exerciseProfileQuery from "../../assets/queries/exerciseProfileQuery";
import { useChatContext } from "../../context/useChatContext";
import recommend_exercise from "../../assets/profileImg/recommend_exercise.png"
import { ExerciseProfileInfoContext } from "../../context/exerciseInfoContext";
import ToggleListModal from "../../components/modal/ToggleListModal";
import SelectNumModal from "../../components/modal/selectNumModal";
import ChatingInput from "../../components/input/ChatingInput";
import SetDateTimeModal from "../../components/modal/SetDateTimeModal";
import intervalQ from "../../utils/intervalQuestions"
import FirstAndLast from "../../utils/firstAndLastMessage";

interface OptionClick{
    option:string;
    type?: string
}

const ExerciseMateProfile = () =>{
    const {messages, addMessage} = useChatContext();
    const [currentQueryIndex, setCurrentQueryIndex] = useState(0); 
    const { setGender, selectedMajors, studentNum, setStudentNum, ageRange, mbtiList, setMbtiList, setIsSchool,setIsHobbySame,
            exercise, setExercise, place, dateTime, peopleNum, ment } = useContext(ExerciseProfileInfoContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenS, setModalOpenS] = useState(false);
    const [modalOpenS2, setModalOpenS2] = useState(false);
    const [modalOpenD, setModalOpenD] = useState(false);
    const [chatDisable, setChatDisable] = useState(true);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [isManyOptions, setIsManyOptions] = useState(false);
    const [saveType, setSaveType] = useState("");
    const [optionSelectEnd, setOptionSelectEnd] = useState(false);
    
    const scrollToBottom = () => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if ( !modalOpen && selectedMajors.length > 0) {
            addMessage({ question: [selectedMajors.join(", ") + "!"], direction: "outgoing" });
            nextOption(); 
        }
    }, [ modalOpen, selectedMajors]);

    useEffect(() => {
        if (mbtiList.length === 4 && mbtiList.join("") != "xxxx") {
          addMessage({ question: [mbtiList.join("")], direction: "outgoing" });
          addMessage({ question: ["아하 이제 슬슬 알겠다!"], direction: "incoming" });
        }
      }, [mbtiList]);

    useEffect(() => {
        if ( !modalOpenS && ageRange.length > 0) {
            addMessage({ question: [ `${ ageRange[0] == ageRange[1] ? ageRange[0] : ageRange.join("~") }살 메이트면 좋겠어`], direction: "outgoing" });
            addMessage({ question: [ `${ ageRange[0] == ageRange[1] ? ageRange[0] : ageRange.join("~") }살 ${studentNum} 메이트를 찾고 있구나!`], direction: "incoming" });
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
        if (chatDisable && exercise !== "") {
            addMessage({ question: [`${exercise}`], direction: "outgoing" });
            setIsManyOptions(false);
            nextOption(); 
        }
    },[exercise])

    useEffect(()=>{
        if (chatDisable && place!=""){
            setChatDisable(true);
            addMessage({ question: [ `외부시설 / ${place}`], direction: "outgoing" });
            nextOption(); 
        }
    },[place])
    
    useEffect(() => {
        if ( chatDisable && ment.length > 0){
            addMessage({ question: [ment], direction: "outgoing" });
            nextOption(); ``
        }
    }, [ment])

    
    FirstAndLast("운동");

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
        if (type == "first"){
            setIsManyOptions(true);
            addMessage({ question: [option], direction: "outgoing" });
        }else if (type == "exercise"){
            setExercise(option);
        }else if (type == "major" && option != "상관없어"){
            setModalOpen(true); 
        }else if (type == "studentNum" && option != "상관없어"){
            setStudentNum(option);
            addMessage({ question: [option+"로 부탁해~"], direction: "outgoing" });
        }else if (type == "age" && option == "메이트 나이 설정하기"){
            setModalOpenS(true); 
        }else if (type == "mbti"){
            addMessage({ question: [option], direction: "outgoing" });
            if (option == "상관없어"){
                setOptionSelectEnd(true); 
                setMbtiList(["x","x","x","x"])
                const nextQueryIndex = currentQueryIndex + 5;
                if (nextQueryIndex < exerciseProfileQuery.length && !modalOpen) {
                setCurrentQueryIndex(nextQueryIndex);  
                setTimeout(() => {
                    const questions = exerciseProfileQuery[nextQueryIndex]?.question || [];
                    intervalQ({ questions, setCurrentQueryIndex, nextQueryIndex, addMessage, setOptionSelectEnd, time:300});
                }, 100);  
            }}
        }else if (type?.includes("mbti") ) {
            if (option == "상관없어"){
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
            nextOption(500);
        }else if (type == "gender" ){
            setGender(option);
            addMessage({ question: [option], direction: "outgoing" });
        }else if (type == "hobby"){
            option == "같으면 좋겠어" ? setIsHobbySame(true) : setIsHobbySame(false);
            addMessage({ question: [option], direction: "outgoing" });
            setChatDisable(false);
            setSaveType("ment");
        } else if (type == "date"){
            setModalOpenD(true);
        }else if (type == "peopleNum"){
            setModalOpenS2(true); 
        }else if (type == "place"){
            if(option == "외부시설"){
                setSaveType("place")
                setChatDisable(false);
                setIsSchool(false);
            }else{
                setIsSchool(true);
            }

        }else{
            addMessage({ question: [option], direction: "outgoing" });
        }
        
        if (!((type == "major" && option != "상관없어") || (type == "exercise") 
            || (type == "place" && option == "외부시설") || (type == "age" && option != "상관없어") 
            || type == "date" || type == "peopleNum"
            || (type != "mbti" && type?.includes("mbti")) 
            || (type == "mbti" && option == "상관없어")
            )){
                nextOption();
            }
    };
    const nextOption = (time?:number) =>{
        const nextQueryIndex = currentQueryIndex + 1;
        setCurrentQueryIndex(-1); 
        if (nextQueryIndex < exerciseProfileQuery.length && !modalOpen ) {
            setTimeout(() => {
                const questions = exerciseProfileQuery[nextQueryIndex]?.question || [];
                intervalQ({questions, setCurrentQueryIndex, nextQueryIndex, addMessage, time:time});
            },500);
        }
    }
    return(
        <>
            <BasicNavbar title="운동 메이트 찾기" fixed={true}></BasicNavbar>
            <Container>
                <StyledMainContainer $short={isManyOptions}>
                    <MessagesContainer>
                        {messages.map((msg, index) => (
                            msg.question?.map((que, idx) => (
                                <ImageContainer key={`${index}-${idx}`}>
                                    {msg?.type == "last" && msg.direction === "incoming" && (
                                        <Img src={recommend_exercise} alt="운동 프로필" />
                                    )}
                                    {
                                        que == "👋" ? (
                                            <ByeImoticon> {que}</ByeImoticon>
                                        ) : (
                                            <BaseMessage
                                                direction={msg.direction}
                                                $isImg={msg?.type == "last"}
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
                {messages.some(msg => (msg?.type === "last" || !msg) && msg.direction === "incoming") && !optionSelectEnd &&
                    <OptionsContainer $isSmall={window.innerHeight <700} $short={isManyOptions}>
                            {currentQueryIndex >=0 && exerciseProfileQuery[currentQueryIndex]?.options && (
                                <>
                                    {exerciseProfileQuery[currentQueryIndex].options.map((option, idx) => (
                                        <Button 
                                            key={idx} 
                                            onClick={
                                                () => handleOptionClick({option, type: exerciseProfileQuery[currentQueryIndex]?.type}) 
                                            }
                            
                                            $ismodal={ (exerciseProfileQuery[currentQueryIndex]?.type == "age" && option != "상관없어") 
                                                || exerciseProfileQuery[currentQueryIndex]?.type == "major" && option != "상관없어"
                                                || exerciseProfileQuery[currentQueryIndex]?.type == "date" 
                                                || exerciseProfileQuery[currentQueryIndex]?.type == "peopleNum"}
                                            $isSelected={
                                                (exerciseProfileQuery[currentQueryIndex]?.type == "age" && option != "상관없어")
                                                || (exerciseProfileQuery[currentQueryIndex]?.type == "place" && option =="외부시설" && !chatDisable) 
                                            }
                                        >
                                            {option}
                                        </Button>
                                    ))}
                                </>
                            )}
                        </OptionsContainer>
                    }               
                    <ChatingInput 
                        disable={chatDisable} 
                        setChatDisable={setChatDisable} 
                        keyboard={keyboardOpen} 
                        save={saveType}
                        type="exercise"
                    />
                    { modalOpen && <ToggleListModal setModalOpen={setModalOpen} type="exercise"/> }
                    { modalOpenS && 
                        <SelectNumModal 
                            setModalOpen={setModalOpenS} 
                            title="운동 메이트 나이"
                            min={20}
                            max={28}
                            isRange={true}
                            type="exercise"
                        /> }
                    { modalOpenS2 && 
                        <SelectNumModal 
                            setModalOpen={setModalOpenS2} 
                            title="운동 메이트 인원수"
                            min={1}
                            max={22}
                            isRange={false}
                            type="exercise"
                        /> }
                    { modalOpenD && 
                        <SetDateTimeModal
                            title="운동 메이트 시간대"
                            setModalOpen={setModalOpenD}
                            type="exercise"
                        />}
            </Container>
        </>
    )
}
export default ExerciseMateProfile;

const Container = styled.div`
    width: calc(100vw); 
    max-width: 393px; 
    height:calc(100vh - 100px);
    position:fixed;
    top:60px;
    background: linear-gradient(to bottom, #F1F8FF, #D1E8FF);
    font-family: "Pretendard Variable";
`;
const StyledMainContainer = styled.div<{$short: boolean}>`
    width: calc(100vw); 
    max-width: 393px; 
    height: ${window.innerHeight > 700 ? (({$short}) => $short ?'50%' : '65%'): (({$short}) => $short ?'55%' : '60%')};
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
const OptionsContainer = styled.div<{ $isSmall: boolean; $short: boolean }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: center; 
    gap: 15px;
    margin-top: ${({ $isSmall, $short }) =>
        $isSmall ? ($short ? "calc(100vh * 0.05)" : "calc(100vh * 0.15)") : "calc(100vh * 0.05)"};
    margin-bottom: calc(100vh * 0.1); 
`;
const BaseMessage = styled.div<{ direction: string, $isImg : boolean, $length:number }>`
    width:185px;
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
    white-space: pre-line;
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