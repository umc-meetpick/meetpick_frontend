import { Outlet, useLocation } from "react-router-dom";
//import { useEffect } from "react";
import styled from "styled-components";
import BottomNavBar from '../components/navbar/BottomNavBar';
import { useChatContext } from "../context/useChatContext";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  //height: -webkit-fill-available;
  //height: fill-available;
  //padding-top: env(safe-area-inset-top); // iOS Safe Area 대응
  height:100vh;
  height: calc(var(--vh, 1vh) * 100); 
`;

const Main = styled.div`
  width: 100vw;
  max-width: 393px;
  //height: -webkit-fill-available;
  //height: fill-available;
  height:100vh;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;
  font-family: "Pretendard Variable";
  //padding-top: env(safe-area-inset-top); // iOS Safe Area 대응
`;

const ContentWrapper = styled.div<{ $isHome: boolean }>`
  flex-grow: 1;
  overflow-y: auto; /* 스크롤 문제 방지 */
  position: relative; /* absolute → relative로 변경 */
  width: 100%;
  height: ${({ $isHome }) => ($isHome ? "100%" : "calc(100% - 100px)")};
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const RootLayout = () => {
  const { messages } = useChatContext();
  const location = useLocation();

  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  })

  const isKeyboard = window.innerHeight < 400;
  const isHome = location.pathname === "/";

  return (
    <Wrapper>
      <Main>
        <ContentWrapper $isHome={isHome}>
          <Outlet />
        </ContentWrapper>
        {!isHome && !(messages.length > 0) && !isKeyboard && <BottomNavBar />}
      </Main>
    </Wrapper>
  );
};

export default RootLayout;
