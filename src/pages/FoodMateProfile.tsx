import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import BasicNavbar from "../components/navbar/BasicNavbar";
import foodProfileQuery from "../assets/foodProfileQuery";
import { useChatContext } from "../context/useChatContext";

const FoodMateProfile = () =>{
    const {messages, addMessage} = useChatContext();
    const [currentQueryIndex, setCurrentQueryIndex] = useState(0); // 현재 질문 인덱스를 추적
  
    const messageEndRef = useRef<HTMLDivElement>(null);
  
    const scrollToBottom = () => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const handleOptionClick = (option: string) => {
      addMessage({ question: [option], direction: "outgoing" });
  
      const nextQueryIndex = currentQueryIndex + 1;
      if (nextQueryIndex < foodProfileQuery.length) {
        setTimeout(()=>{
            addMessage({ question: foodProfileQuery[nextQueryIndex].question, direction: "incoming" });
            setCurrentQueryIndex(nextQueryIndex); 
        },500);
      }
    };
    return(
        <>
            <BasicNavbar title="혼밥 MATE"></BasicNavbar>
            <Container>
                <StyledMainContainer>
                    <MessagesContainer>
                        {messages.map((msg, index) => (
                            msg.question.map((que, idx) => (
                            <BaseMessage key={`${index}-${idx}`} direction={msg.direction}>
                                {que}
                            </BaseMessage>
                            ))
                        ))}
                    </MessagesContainer>
                    <OptionsContainer>
                        {foodProfileQuery[currentQueryIndex]?.options && (
                            <>
                            {foodProfileQuery[currentQueryIndex].options.map((option, idx) => (
                                    <Button key={idx} onClick={() => handleOptionClick(option)}>
                                        {option}
                                    </Button>
                            ))}
                            </>
                        )}
                    </OptionsContainer>
                    <div ref={messageEndRef} />
                </StyledMainContainer>
            </Container>
        </>
    )
}
export default FoodMateProfile;

const Container = styled.div`
    width:100%;
    height:calc(100vh - 100px);
    position:fixed;
    top:60px;
    background: linear-gradient(to bottom, #F1F8FF, #D1E8FF);
`;
const StyledMainContainer = styled.div`
    width: 320px;
    height: calc(100vh - 200px);
    margin: 30px auto;
    overflow-x: hidden;
    overflow-y: auto;
    border:1px solid red;
`;
const BaseMessage = styled.div<{ direction: string }>`
    width:200px;
    height:50px;
    padding: 10px 15px;
    margin: 10px;
    border-radius: 15px;
    color: black;
    align-self: ${({ direction }) => (direction === "incoming" ? "flex-start" : "flex-end")};
    position: relative;
    background-color: white;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2); 
    margin-bottom: 20px;
    &:after {
        content: "";
        position: absolute;
        top: 48px;
        ${({ direction }) =>
        direction === "incoming"
            ? `left: -10px; border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 20px solid white; transform: translateY(50%) rotate(240deg);`
            : `right: -10px; border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 20px solid white; transform: translateY(50%) rotate(120deg);`}
    }
    
`;
const Button = styled.button`
    background-color:white;
    color:black;
    border:none;
    border-radius:100px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2); 
    &:focus {
        outline: none;
    }
`;
const MessagesContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;
const OptionsContainer = styled.div`
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
    margin-top: 10px; /* 채팅 마지막 메시지 아래에 버튼 */
    gap:10px;
`;