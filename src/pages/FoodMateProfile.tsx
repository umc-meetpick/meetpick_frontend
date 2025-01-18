import { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import BasicNavbar from "../components/navbar/BasicNavbar";
import foodProfileQuery from "../assets/foodProfileQuery";
import { useChatContext } from "../context/useChatContext";
import profile1 from "../assets/profileImg/프로필1.png";
import { FoodProfileInfoContext } from "../context/foodProfileInfo";
import ToggleListModal from "../components/modal/ToggleListModal";
import SelectNumModal from "../components/modal/selectNumModal";
import ChatingInput from "../components/input/ChatingInput";

interface OptionClick{
    option:string;
    type?: string;
}
const FoodMateProfile = () =>{
    const {messages, addMessage} = useChatContext();
    const [currentQueryIndex, setCurrentQueryIndex] = useState(0); 
    const { setGender, majors, studentNum, setStudentNum, ageRange, mbtiList, setMbtiList, peopleNum, ment } = useContext(FoodProfileInfoContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenS, setModalOpenS] = useState(false);
    const [modalOpenS2, setModalOpenS2] = useState(false);
    const [chatDisable, setChatDisable] = useState(true);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if ( !modalOpen && majors.length > 0) {
            addMessage({ question: [majors.join(",") + "!"], direction: "outgoing" });
            nextOption(); 
        }
    }, [ modalOpen, majors]);

    useEffect(() => {
        if (mbtiList.length === 4) {
          addMessage({ question: [mbtiList.join("")], direction: "outgoing" });
          //nextOption(); 
        }
      }, [mbtiList]);

    useEffect(() => {
        if ( !modalOpenS && ageRange.length > 0) {
            addMessage({ question: [ `${ ageRange[0] == ageRange[1] ? ageRange[0] : ageRange.join("~") }살 메이트면 좋겠어`], direction: "outgoing" });
            addMessage({ question: [ `${ ageRange[0] == ageRange[1] ? ageRange[0] : ageRange.join("~") }살 ${studentNum} 메이트를 찾고 계시군요!`], direction: "incoming" });
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
        if ( chatDisable && ment.length > 0){
            addMessage({ question: [ment], direction: "outgoing" });
            nextOption(); ``
        }
    }, [ chatDisable, ment])

    const handleOptionClick = ({option, type}: OptionClick): void => {
        if (type == "gender" ){
            setGender(option);
            addMessage({ question: [option], direction: "outgoing" });
        }else if (type == "major" && option != "상관없어!"){
            setModalOpen(true); 
        }else if (type == "studentNum" && option != "상관없음"){
            setStudentNum(option);
            addMessage({ question: [option+"로 부탁해~"], direction: "outgoing" });
        }else if (type == "age" && option == "메이트 나이 설정하기"){
            setModalOpenS(true); 
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
        }else if (type == "hobby" && option == "같으면 좋겠어"){
            //같을경우
            addMessage({ question: [option], direction: "outgoing" });
        } else if (type == "menu"){
            if (option != "기타"){
                addMessage({ question: [option+"이 먹고싶어!"], direction: "outgoing" });
            }else{

                addMessage({ question: [option+"로 부탁해~"], direction: "outgoing" });
            }
        }else if (type == "peopleNum"){
            setModalOpenS2(true); 
            setChatDisable(false);
        }
        else{
            addMessage({ question: [option], direction: "outgoing" });
        }
        
        if (!((type == "major" && option != "상관없어!") || (type == "age" && option != "상관없어") || type == "peopleNum"))
            nextOption();
    };
    const nextOption = () =>{
        const nextQueryIndex = currentQueryIndex + 1;
        setCurrentQueryIndex(-1); 
        if (nextQueryIndex < foodProfileQuery.length && !modalOpen ) {
            setTimeout(() => {
                addMessage({ question: foodProfileQuery[nextQueryIndex]?.question, direction: "incoming" });
                setCurrentQueryIndex(nextQueryIndex); 
            },500);
        }
    }
    return(
        <>
            <BasicNavbar title="혼밥 메이트 찾기" bell={true}></BasicNavbar>
            <Container>
                <StyledMainContainer>
                    <MessagesContainer>
                        {messages.map((msg, index) => (
                        msg.question?.map((que, idx) => (
                            <ImageContainer key={`${index}-${idx}`}>
                                {idx + 1 === msg.question?.length && msg.direction === "incoming" && (
                                    <Img src={profile1} alt="프로필" />
                                )}
                                {
                                    que == "👋" ? (
                                        <ByeImoticon> {que}</ByeImoticon>
                                    ) : (
                                        <BaseMessage
                                            direction={msg.direction}
                                            $isImg={idx + 1 === msg.question?.length && msg.direction === "incoming"}
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
                { foodProfileQuery[currentQueryIndex]?.type == "menu" && <FoodMent>원하는 음식 종류를 모두 선택해주세요!</FoodMent>}
                <OptionsContainer>
                        {currentQueryIndex >=0 && foodProfileQuery[currentQueryIndex]?.options && (
                            <>
                                {foodProfileQuery[currentQueryIndex].options.map((option, idx) => (
                                    <Button 
                                        key={idx} 
                                        onClick={() => handleOptionClick({option, type: foodProfileQuery[currentQueryIndex]?.type})}
                                        $ismodal={ (foodProfileQuery[currentQueryIndex]?.type == "age" && option != "상관없어") || foodProfileQuery[currentQueryIndex]?.type == "peopleNum"}
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </>
                        )}
                    </OptionsContainer>
                    <ChatingInput disable={chatDisable} setChatDisable={setChatDisable}/>
                    { modalOpen && <ToggleListModal setModalOpen={setModalOpen}/> }
                    { modalOpenS && 
                        <SelectNumModal 
                            setModalOpen={setModalOpenS} 
                            title="혼밥 메이트 나이"
                            min={20}
                            max={28}
                            isRange={true}
                        /> }
                    { modalOpenS2 && 
                        <SelectNumModal 
                            setModalOpen={setModalOpenS2} 
                            title="혼밥 메이트 인원수"
                            min={1}
                            max={5}
                            isRange={false}
                        /> }
            </Container>
        </>
    )
}
export default FoodMateProfile;

const Container = styled.div`
    width:393px;
    height:calc(100vh - 100px);
    position:fixed;
    top:60px;
    background: linear-gradient(to bottom, #F1F8FF, #D1E8FF);
`;
const StyledMainContainer = styled.div`
    width: 393px;
    height: 60%;
    overflow-x: hidden;
    overflow-y: auto;
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
const OptionsContainer = styled.div`
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
    margin-top: calc( 100vh * 0.05);
    gap:10px;
`;
const FoodMent = styled.div`
    font-size:13px;
    font-weight:400;
    display:flex;
    justify-content:center;
    color:black;
`;
const BaseMessage = styled.div<{ direction: string, $isImg : boolean }>`
    width:180px;
    height: 35px;
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
        border:1px solid red;
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
    transform: scaleX(-1);
`;
const Button = styled.button<{$ismodal: boolean}>`
    background-color: ${({$ismodal})=> $ismodal ? "#38ABFF" : "white"};
    color: ${({$ismodal})=> $ismodal ? "white" : "black"};
    border:none;
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