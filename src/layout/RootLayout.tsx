import { Outlet } from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from '../components/navbar/BottomNavBar';
import { useState, useEffect } from "react";

const Main=styled.div`
  width: calc(100vw); 
  max-width: 393px; 
  height:100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative; /* 상대적 위치 지정 */
`;

const ContentWrapper = styled.div`
  flex-grow: 1; /* 나머지 공간을 채움 */
  overflow-y: scroll; /* 콘텐츠 영역이 넘치면 스크롤 */
  position: absolute;
  top: 0;
  bottom: 100px; /* BottomNavBar 높이와 아래 여백만큼 */
  width: 100%;
  overflow-x: hidden; /* 수평 스크롤 제거 */
`;

const RootLayout = () => {
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    useEffect(() => {
      const handleResize = () => {
        const isSmallViewport = window.innerHeight < 400; 
        console.log(window.innerHeight);
        setKeyboardOpen(isSmallViewport);
      };
    
      window.addEventListener("resize", handleResize);
    
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
    
    return (
      <Main>
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
        { !keyboardOpen &&  <BottomNavBar /> }
      </Main>
    );
};

export default RootLayout;
