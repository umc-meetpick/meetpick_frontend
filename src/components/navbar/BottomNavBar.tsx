import { Link } from "react-router-dom";
import styled from "styled-components";
import { GrHomeRounded } from "react-icons/gr";
import { GoPeople } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import { useLocation } from "react-router-dom";

const BottomNavBar = () => {
  const location = useLocation(); // 현재 URL 경로 가져오기

  return (
    <BottomNav>
     <NavItem $active={location.pathname === "/"}>
        <StyledLink to="/">
          <GrHomeRounded size={24} color={location.pathname === "/" ? "#1A6AFF" : "gray"} />
          <Title $active={location.pathname === "/"}>홈</Title>
        </StyledLink>
      </NavItem>

      <NavItem $active={location.pathname === "/looking"}>
        <StyledLink to="/looking">
          <GoPeople size={24} color={location.pathname === "/looking" ? "#1A6AFF" : "gray"} />
          <Title $active={location.pathname === "/looking"}>매칭</Title>
        </StyledLink>
      </NavItem>

      <NavItem $active={location.pathname === "/my"}>
        <StyledLink to="/my">
          <GoPerson size={24} color={location.pathname === "/my" ? "#1A6AFF" : "gray"} />
          <Title $active={location.pathname === "/my"}>My</Title>
        </StyledLink>
      </NavItem>
    </BottomNav>
  );
};

export default BottomNavBar;

const BottomNav = styled.div`
  position: fixed;
  bottom: 0;
  width:100%;
  max-width: 393px;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1.5px solid #f3f3f3;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000; /*네비게이션 바가 항상 최상단에 위치*/
  background-color:white;
`

const NavItem = styled.div<{$active?:boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ $active }) => ($active ? "#007AFF" : "gray")}; /* 활성화된 경우 색상 변경 */
`

const Title = styled.p<{$active?:boolean}>`
  margin: 5px 0 0;
  font-size: 12px;
  text-align:center;
  color: ${({ $active }) => ($active ? "#007AFF" : "gray")}; /* 활성화된 경우 색상 변경 */
`
const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none; /* 밑줄 제거 */
  color: gray; /* 기본 색상 */
  flex-direction: column;
  align-items: center;

  &:visited {
    color: gray; /* 방문 후에도 기본 색상 유지 */
  }
`