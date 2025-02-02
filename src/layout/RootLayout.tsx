import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BottomNavBar from '../components/navbar/BottomNavBar';
import { useChatContext } from "../context/useChatContext";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100vw); 
  height: 100vh;
`;
const Main=styled.div`
  width: calc(100vw); 
  max-width: 393px; 
  height:100vh;
  position: relative; 
  font-family: "Pretendard Variable";
`;

const ContentWrapper = styled.div`
  flex-grow: 1; 
  overflow-y: scroll;
  position: absolute;
  top: 0;
  bottom: 100px; 
  width: 100%;
  overflow-x: hidden;
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

const RootLayout = () => {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const { messages } = useChatContext();

    useEffect(() => {
      const handleResize = () => setWindowHeight(window.innerHeight);

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isSmallViewport = windowHeight < 700;
    const isKeyboard = windowHeight < 400;

    
    return (
      <Wrapper>
        <Main>
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
        { !((isSmallViewport && messages.length>0)|| isKeyboard) &&  <BottomNavBar /> }
      </Main>
      </Wrapper>
    );
};

export default RootLayout;
