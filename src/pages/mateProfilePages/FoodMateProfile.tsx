import { useEffect, useState, useRef, useContext } from "react";
import styled, { css } from "styled-components";
import BasicNavbar from "../../components/navbar/BasicNavbar";
import foodProfileQuery from "../../assets/queries/foodProfileQuery";
import { useChatContext } from "../../context/useChatContext";
import recommend_food from "../../assets/profileImg/recommend_food.png"
import { FoodProfileInfoContext } from "../../context/foodProfileInfo";
import ToggleListModal from "../../components/modal/ToggleListModal";
import SelectNumModal from "../../components/modal/selectNumModal";
import ChatingInput from "../../components/input/ChatingInput";
import SetDateTimeModal from "../../components/modal/SetDateTimeModal";
import intervalQ from "../../utils/intervalQuestions"
import FirstAndLast from "../../utils/firstAndLastMessage";

interface OptionClick{
    option:string;
    type?: string;
}

const FoodMateProfile = () =>{
    const {messages, addMessage } = useChatContext();
    const [currentQueryIndex, setCurrentQueryIndex] = useState(0); 
    const { selectedMajors, studentNum, ageRange, mbtiList, setGender, setStudentNum, setMbtiList, setIsHobbySame,
            menuList, setMenuList, dateTime, peopleNum, ment } = useContext(FoodProfileInfoContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenS, setModalOpenS] = useState(false);
    const [modalOpenS2, setModalOpenS2] = useState(false);
    const [modalOpenD, setModalOpenD] = useState(false);
    const [chatDisable, setChatDisable] = useState(true);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const [keyboardOpen, setKeyboardOpen] = useState(false);
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
        }
      }, [mbtiList]);

    useEffect(() => {
        if ( !modalOpenS && ageRange.length > 0) {
            addMessage({ question: [ `${ ageRange[0] == ageRange[1] ? ageRange[0] : ageRange.join("~") }살 메이트면 좋겠어`], direction: "outgoing" });
            setTimeout(()=>{
                addMessage({ question: [ `${ ageRange[0] == ageRange[1] ? ageRange[0] : ageRange.join("~") }살 ${studentNum} 메이트를 찾고 계시군요!`], direction: "incoming" });
            },500);
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

    const handleMenuList = (menu:string) =>{
        if (menuList.includes(menu)){
            setMenuList(menuList.filter(m => m !== menu));
        }else{
            setMenuList([...menuList, menu]);
        }
    };
    const saveMenu = () =>{
        addMessage({ question: [menuList.join(", ")+" 먹고 싶어!"], direction: "outgoing" });
        nextOption(); 
    };
    useEffect(() => {
        if ( chatDisable && ment.length > 0){
            addMessage({ question: [ment], direction: "outgoing" });
            nextOption(); ``
        }
    }, [ chatDisable, ment])

    FirstAndLast("혼밥");

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
        if (type == "gender" ){
            setGender(option);
            addMessage({ question: [option], direction: "outgoing" });
        }else if (type == "major" && option != "상관없어!"){
            setModalOpen?.(true); 
        }else if (type == "studentNum" && option != "상관없음"){
            setStudentNum(option);
            addMessage({ question: [option+"로 부탁해~"], direction: "outgoing" });
        }else if (type == "age" && option == "메이트 나이 설정하기"){
            setModalOpenS?.(true); 
        }else if (type == "mbti"){
            addMessage({ question: [option], direction: "outgoing" });
            if (option === "상관없어") {
                setOptionSelectEnd(true); 
                setMbtiList(["x","x","x","x"])
                const nextQueryIndex = currentQueryIndex + 5;
                if (nextQueryIndex < foodProfileQuery.length && !modalOpen) {
                  setCurrentQueryIndex(nextQueryIndex);  
                  setTimeout(() => {
                    const questions = foodProfileQuery[nextQueryIndex]?.question || [];
                    intervalQ({ questions, setCurrentQueryIndex, nextQueryIndex, addMessage, setOptionSelectEnd,time:300});
                  }, 100); 
                }
              }
        }else if (type?.includes("mbti") ) {
            setOptionSelectEnd(false);
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
        }else if (type == "hobby"){
            option == "같으면 좋겠어" ? setIsHobbySame(true) : setIsHobbySame(false);
            addMessage({ question: [option], direction: "outgoing" });
        } else if (type == "date"){
            setModalOpenD?.(true);
        }else if (type == "peopleNum"){
            setModalOpenS2?.(true); 
            setChatDisable?.(false);
        }
        else{
            addMessage({ question: [option], direction: "outgoing" });
        }
        
        if (!((type == "major" && option != "상관없어!") || 
            (type == "age" && option != "상관없어") || 
            type == "mbti" && option=="상관없어" ||
            type == "date" || type == "menu"|| type == "peopleNum")){
                nextOption();
        }
    };
    const nextOption = () =>{
        const nextQueryIndex = currentQueryIndex + 1;
        setCurrentQueryIndex(-1); 
        if (nextQueryIndex < foodProfileQuery.length && !modalOpen) {
            const questions = foodProfileQuery[nextQueryIndex]?.question || [];
            intervalQ({questions, setCurrentQueryIndex, nextQueryIndex, addMessage, setOptionSelectEnd});
        }
    }
    return(
        <>
            <BasicNavbar title="혼밥 메이트 찾기"></BasicNavbar>
            <Container>
                <StyledMainContainer>
                    <MessagesContainer>
                        {messages.map((msg, index) => (
                            msg.question?.map((que, idx) => (
                                <ImageContainer key={`${index}-${idx}`}>
                                    {msg?.type == "last" && msg.direction === "incoming" && (
                                        <Img src={recommend_food} alt="혼밥 프로필" />
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
                { foodProfileQuery[currentQueryIndex]?.type == "menu" && 
                        <FoodMent>원하는 음식 종류를 모두 선택해주세요!</FoodMent>
                }
                {messages.some(msg => (msg?.type === "last" || !msg) && msg.direction === "incoming") && !optionSelectEnd &&
                    <OptionsContainer $isMenu={foodProfileQuery[currentQueryIndex]?.type == "menu"} $isSmall={window.innerHeight <700}>
                            {currentQueryIndex >=0 && foodProfileQuery[currentQueryIndex]?.options && (
                                <>
                                    {foodProfileQuery[currentQueryIndex].options.map((option, idx) => (
                                        <Button 
                                            key={idx} 
                                            onClick={
                                                () => {if (foodProfileQuery[currentQueryIndex]?.type != "menu"){
                                                    handleOptionClick({option, type: foodProfileQuery[currentQueryIndex]?.type});
                                                    setOptionSelectEnd(true);
                                                }else{
                                                    handleMenuList(option)
                                                }
                                            }}
                            
                                            $ismodal={ (foodProfileQuery[currentQueryIndex]?.type == "age" && option != "상관없어") 
                                                || foodProfileQuery[currentQueryIndex]?.type == "major" && option != "상관없어!"
                                                || foodProfileQuery[currentQueryIndex]?.type == "date" 
                                                || foodProfileQuery[currentQueryIndex]?.type == "peopleNum"}
                                            $isSelected={menuList.includes(option)}
                                        >
                                            {option}
                                        </Button>
                                    ))}
                                </>
                            )}
                        </OptionsContainer>
                }
                    { foodProfileQuery[currentQueryIndex]?.type == "menu" && menuList.length > 0 &&
                            <FoodBtn onClick={()=>saveMenu()} $isSmall={window.innerHeight <700}>다음으로</FoodBtn>
                    }
                    <ChatingInput 
                        disable={chatDisable} 
                        setChatDisable={setChatDisable} 
                        keyboard={keyboardOpen} 
                        type="food"
                    />
                    { modalOpen && <ToggleListModal setModalOpen={setModalOpen} type="food"/> }
                    { modalOpenS && 
                        <SelectNumModal 
                            setModalOpen={setModalOpenS} 
                            title="혼밥 메이트 나이"
                            min={20}
                            max={28}
                            isRange={true}
                            type="food"
                        /> }
                    { modalOpenS2 && 
                        <SelectNumModal 
                            setModalOpen={setModalOpenS2} 
                            title="혼밥 메이트 인원수"
                            min={1}
                            max={5}
                            isRange={false}
                            type="food"
                        /> }
                    { modalOpenD && 
                        <SetDateTimeModal
                            title="혼밥 메이트 시간대"
                            setModalOpen={setModalOpenD}
                            type="food"
                        />}
            </Container>
        </>
    )
}
export default FoodMateProfile;

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
    height: 60%;
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
const OptionsContainer = styled.div<{ $isMenu: boolean , $isSmall:boolean}>`
    ${({ $isMenu, $isSmall}) =>
        $isMenu
            ? css`
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
                  gap: 10px;
                  padding: 10px 20px;
                  overflow-y:auto;
                  position:relative;
                  *{
                    font-size:14px;
                    padding:10px;
                    width: calc(min(100vw * 0.25, 100px));
                  }
              `
            : css`
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                  margin-top: ${$isSmall ? "calc(100vh * 0.15)" : "calc(100vh * 0.05)"};
                  margin-bottom: calc(100vh * 0.1);
                  gap: 15px;
              `}
`;
const FoodMent = styled.div`
    font-size:13px;
    font-weight:400;
    display:flex;
    justify-content:center;
`;
const BaseMessage = styled.div<{ direction: string, $isImg : boolean, $length:number }>`
    font-size:13px;
    width:185px;
    height: ${({$length})=> $length < 17 ? "35px" : `${$length + 15}px`};
    padding: 12px 10px;
    margin: 10px;
    margin-left: ${({ direction, $isImg }) =>
        direction === "incoming" 
        ? ($isImg 
            ? "18px" 
            : "75px" )
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
const FoodBtn = styled.button<{$isSmall:boolean;}>`
    background-color: #38ABFF;
    color: white;
    border-radius:4px;
    position: fixed;
    left: calc(50vw);
    transform: translateX(-50%);
    bottom: ${({$isSmall})=>$isSmall ? "calc(100vh * 0.05 + 45px)" : "calc(100vh * 0.1 + 85px)"};
    z-index:100;
`;
const ByeImoticon = styled.div`
    font-size:50px;
    margin-top:10px;
    margin-left:5px;
`;