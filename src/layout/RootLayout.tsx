import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BottomNavBar from '../components/navbar/BottomNavBar';
import { useChatContext } from "../context/useChatContext";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100vw); 
  height:100dvh;
  }
`;
const Main=styled.div`
  width: calc(100vw); 
  max-width: 393px; 
  height:100vh;
  position: relative; 
  font-family: "Pretendard Variable";
`;

const ContentWrapper = styled.div<{ $isHome: boolean }>`
  flex-grow: 1; 
  overflow-y: scroll;
  position: absolute;
  top: 0;
  bottom: ${({ $isHome }) => ($isHome ? "0" : "100px")}; 
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
    background-color: none;
  }
`;

const RootLayout = () => {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const { messages } = useChatContext();
    const location = useLocation();

    useEffect(() => {
      const handleResize = () => setWindowHeight(window.innerHeight);
      const setVH = () => {
        document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
      };
    
      setVH(); // 초기 실행
      window.addEventListener("resize", handleResize);
      window.addEventListener("resize", setVH);
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("resize", setVH);
      };
    }, []);    
    
    const isKeyboard = windowHeight < 400;
    const isHome = location.pathname === "/";
    
    return (
      <Wrapper>
        <Main>
          <ContentWrapper $isHome={isHome}>
            <Outlet />
          </ContentWrapper>
          {!isHome && !(messages.length > 0) && !isKeyboard && (
              <BottomNavBar />
          )}
        </Main>
      </Wrapper>
    );
};

export default RootLayout;