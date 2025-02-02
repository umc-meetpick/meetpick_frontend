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
  position: relative; /* 상대적 위치 지정 */
  font-family: "Pretendard Variable";
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
