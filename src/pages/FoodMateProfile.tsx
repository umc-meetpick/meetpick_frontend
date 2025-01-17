import { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import BasicNavbar from "../components/navbar/BasicNavbar";
import foodProfileQuery from "../assets/foodProfileQuery";
import { useChatContext } from "../context/useChatContext";
import profile2 from "../assets/profileImg/프로필2.png";
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
    const { setGender, majors, studentNum, setStudentNum, ageRange, mbtiList, setMbtiList } = useContext(FoodProfileInfoContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenS, setModalOpenS] = useState(false);
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
        if ( !modalOpenS && ageRange.length > 0) {
            addMessage({ question: [ `${ ageRange[0] == ageRange[1] ? ageRange[0] : ageRange.join("~") }살 메이트면 좋겠어`], direction: "outgoing" });
            addMessage({ question: [ `${ ageRange[0] == ageRange[1] ? ageRange[0] : ageRange.join("~") }살 메이트를 찾고 계시군요!`], direction: "incoming" });
            nextOption(); 
        }
    }, [ modalOpen, ageRange]);
      
    const handleOptionClick = ({option, type}: OptionClick): void => {
        if (type == "gender" ){
            setGender(option);
            addMessage({ question: [option], direction: "outgoing" });
        }else if (type == "major"){
            if(option == "있어~")
                setModalOpen(true); 
        }else if (type == "studentNum" && option != "상관없음"){
            setStudentNum(option);
            addMessage({ question: [option+"로 부탁해~"], direction: "outgoing" });
        }else if (type == "age"){
            setModalOpenS(true); 
        }else if (type?.includes("mbti") && option != "상관없어!"){
            if (type?.includes("EI")){
                const EI = ( option == "활기찬" )  ? "E" : "I";
                setMbtiList([...mbtiList,EI]);
                addMessage({ question: [option+" 사람이 좋아!"], direction: "outgoing" });
            }else{
                if (type?.includes("SN")){
                    const SN = ( option == "현실적" )  ? "S" : "N";
                    setMbtiList([...mbtiList,SN]);
                }else if (type?.includes("TF")){
                    const TF = ( option == "객관적" )  ? "T" : "F";
                    setMbtiList([...mbtiList,TF]);
                }else if (type?.includes("TF")){
                    const JP = ( option == "체계적" )  ? "J" : "P";
                    setMbtiList([...mbtiList,JP]);
                }
                addMessage({ question: [option+"인 사람이 좋아!"], direction: "outgoing" });
            }
        }
        else{
            addMessage({ question: [option], direction: "outgoing" });
        }
        
        if (!((type == "major" && option == "있어~") || type == "age"))
            nextOption();
    };
    const nextOption = () =>{
        const nextQueryIndex = currentQueryIndex + 1;
        setCurrentQueryIndex(-1); 
        if (nextQueryIndex < foodProfileQuery.length && !modalOpen) {
            setTimeout(() => {
                addMessage({ question: foodProfileQuery[nextQueryIndex].question, direction: "incoming" });
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
                        msg.question.map((que, idx) => (
                            <ImageContainer key={`${index}-${idx}`}>
                            {idx + 1 === msg.question.length && msg.direction === "incoming" && (
                                <Img src={profile2} alt="프로필" />
                            )}
                                <BaseMessage
                                    direction={msg.direction}
                                    $isImg={idx + 1 === msg.question.length && msg.direction === "incoming"}
                                >
                                    {que}
                                </BaseMessage>
                            </ImageContainer>
                        ))
                        ))}
                    </MessagesContainer>
                    <div ref={messageEndRef} />
                </StyledMainContainer>
                <OptionsContainer>
                        {currentQueryIndex >=0 && foodProfileQuery[currentQueryIndex]?.options && (
                            <>
                            {foodProfileQuery[currentQueryIndex].options.map((option, idx) => (
                                    <Button key={idx} onClick={() => handleOptionClick({option, type: foodProfileQuery[currentQueryIndex]?.type})}>
                                        {option}
                                    </Button>
                            ))}
                            </>
                        )}
                    </OptionsContainer>
                    <ChatingInput disable={chatDisable}/>
                    { modalOpen && <ToggleListModal setModalOpen={setModalOpen}/> }
                    { modalOpenS && 
                        <SelectNumModal 
                            setModalOpen={setModalOpenS} 
                            title="혼밥 메이트 나이"
                            min={20}
                            max={28}
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
    height: 65%;
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
const Button = styled.button`
    background-color:white;
    border:none;
    border-radius:100px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2); 
    &:focus {
        outline: none;
    }
`;