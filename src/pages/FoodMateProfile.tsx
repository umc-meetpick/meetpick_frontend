import { useEffect, useState, useRef, useContext } from "react";
import styled, { css } from "styled-components";
import BasicNavbar from "../components/navbar/BasicNavbar";
import foodProfileQuery from "../assets/foodProfileQuery";
import { useChatContext } from "../context/useChatContext";
import profile1 from "../assets/profileImg/프로필1.png";
import { FoodProfileInfoContext } from "../context/foodProfileInfo";
import ToggleListModal from "../components/modal/ToggleListModal";
import SelectNumModal from "../components/modal/selectNumModal";
import ChatingInput from "../components/input/ChatingInput";
import { useNavigate } from "react-router-dom";
import SetDateTimeModal from "../components/modal/SetDateTimeModal";

interface OptionClick{
    option:string;
    type?: string;
}
const FoodMateProfile = () =>{
    const {messages, addMessage, resetMessages} = useChatContext();
    const [currentQueryIndex, setCurrentQueryIndex] = useState(0); 
    const { setGender, majors, studentNum, setStudentNum, ageRange, mbtiList, setMbtiList, 
            menuList, setMenuList, extraMenu, dateTime, peopleNum, ment } = useContext(FoodProfileInfoContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenS, setModalOpenS] = useState(false);
    const [modalOpenS2, setModalOpenS2] = useState(false);
    const [modalOpenD, setModalOpenD] = useState(false);
    const [chatDisable, setChatDisable] = useState(true);
    const [selectedMenu, setSelectedMenu] = useState<string[]>([]);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<number | null>(null);
    const hasRun = useRef(false);
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const navigate = useNavigate();

    const scrollToBottom = () => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if ( !modalOpen && majors.length > 0) {
            addMessage({ question: [majors.join(", ") + "!"], direction: "outgoing" });
            nextOption(); 
        }
    }, [ modalOpen, majors]);

    useEffect(() => {
        if (mbtiList.length === 4) {
          addMessage({ question: [mbtiList.join("")], direction: "outgoing" });
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
      
    useEffect(() => {
        if (chatDisable && selectedMenu.includes("기타") && extraMenu.length > 0) {
            const updatedMenuList = [...selectedMenu.filter(m => m !== "기타"), extraMenu];
            setMenuList(updatedMenuList);
        }
    }, [chatDisable, selectedMenu, extraMenu]);

    useEffect(()=>{
        if (selectedMenu.includes("기타")){
            setChatDisable(false);
        }else{
            setMenuList(selectedMenu);
        }
    },[selectedMenu])

    const handleMenuList = (menu:string) =>{
        if (selectedMenu.includes(menu)){
            setSelectedMenu(selectedMenu.filter(m => m !== menu));
        }else{
            setSelectedMenu([...selectedMenu, menu]);
        }
    };
    const saveMenu = () =>{
        addMessage({ question: [menuList.join(", ")+" 먹고 싶어!"], direction: "outgoing" });
        setSelectedMenu([]);
        nextOption(); 
    };
    useEffect(() => {
        if ( chatDisable && ment.length > 0){
            addMessage({ question: [ment], direction: "outgoing" });
            nextOption(); ``
        }
    }, [ chatDisable, ment])

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
                navigate("/waitForMate"); 
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
              question: foodProfileQuery[0].question,
              direction: foodProfileQuery[0].direction as "incoming" | "outgoing",
            });
          }
        }
      }, [messages, addMessage, foodProfileQuery]);

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
        } else if (type == "date"){
            setModalOpenD(true);
        }else if (type == "peopleNum"){
            setModalOpenS2(true); 
            setChatDisable(false);
        }
        else{
            addMessage({ question: [option], direction: "outgoing" });
        }
        
        if (!((type == "major" && option != "상관없어!") || (type == "age" && option != "상관없어") || type == "date" || type == "menu"|| type == "peopleNum"))
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
                    <FoodMent>{selectedMenu.includes("기타") ? "기타 음식들은 채팅으로 입력해주세요" : "원하는 음식 종류를 모두 선택해주세요!"}</FoodMent>
                }
                <OptionsContainer $isMenu={foodProfileQuery[currentQueryIndex]?.type == "menu"} $isSmall={window.innerHeight <700}>
                        {currentQueryIndex >=0 && foodProfileQuery[currentQueryIndex]?.options && (
                            <>
                                {foodProfileQuery[currentQueryIndex].options.map((option, idx) => (
                                    <Button 
                                        key={idx} 
                                        onClick={
                                            foodProfileQuery[currentQueryIndex]?.type != "menu" ?
                                            () => handleOptionClick({option, type: foodProfileQuery[currentQueryIndex]?.type}) :
                                            ()=>handleMenuList(option)
                                        }
                        
                                        $ismodal={ (foodProfileQuery[currentQueryIndex]?.type == "age" && option != "상관없어") 
                                            || foodProfileQuery[currentQueryIndex]?.type == "date" 
                                            || foodProfileQuery[currentQueryIndex]?.type == "peopleNum"}
                                        $isSelected={selectedMenu.includes(option)}
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </>
                        )}
                    </OptionsContainer>
                    { foodProfileQuery[currentQueryIndex]?.type == "menu" && menuList.length > 0 &&
                            <FoodBtn onClick={()=>saveMenu()} $isSmall={window.innerHeight <700}>다음으로</FoodBtn>
                    }
                    <ChatingInput disable={chatDisable} setChatDisable={setChatDisable} keyboard={keyboardOpen} isExtra={selectedMenu.includes("기타")}/>
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
                    { modalOpenD && 
                        <SetDateTimeModal
                            title="혼밥 메이트 시간대"
                            setModalOpen={setModalOpenD}
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
    height: ${window.innerHeight > 700 ? '60%' : '60%'};
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
const OptionsContainer = styled.div<{ $isMenu: boolean , $isSmall:boolean}>`
    ${({ $isMenu, $isSmall}) =>
        $isMenu
            ? css`
                  display: grid;
                  grid-template-columns: repeat(3, 1fr);
                  gap: 10px;
                  padding: 20px;
                  overflow-y:auto;
                  *{
                    font-size:14px;
                    padding:10px;
                    width: calc(100vw * 0.25)
                  }
              `
            : css`
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                  margin-top: ${$isSmall ? "calc(100vh * 0.15)" : "calc(100vh * 0.05)"};
                  margin-bottom: calc(100vh * 0.1);
                  gap: 10px;
              `}
`;
const FoodMent = styled.div`
    font-size:13px;
    font-weight:400;
    display:flex;
    justify-content:center;
    color:black;
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
    transform: scaleX(-1);
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
    left: 50%;
    transform: translateX(-50%);
    bottom: ${({$isSmall})=>$isSmall ? "calc(100vh * 0.1)" : "calc(100vh * 0.08 + 80px)"};
    z-index:100;
`;
const ByeImoticon = styled.div`
    font-size:50px;
    margin-top:10px;
    margin-left:5px;
`;