import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

interface TitleProps{
    title:string;
    before?: boolean;
    bell?:boolean;
    fixed?:boolean;
}

const BasicNavbar: React.FC<TitleProps> = ({title, before, bell, fixed}) =>{
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
      };
    return(
        <Container $fixed={fixed}>
            {before && <IconPosition onClick={handleGoBack}><BackIcon icon="mdi:keyboard-arrow-left" width="24" height="24"/></IconPosition>}
            <Title $fixed={fixed}>{title}</Title>
            {bell && <IconPosition2 onClick={()=>navigate("/alarm")}><BellIcon icon="ci:bell" width="24" height="24" /></IconPosition2>}
        </Container>
    )
}
export default BasicNavbar

const Container = styled.div<{$fixed: boolean}>`
  width: 100%;
  max-width: 393px;
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center; /* 오타 수정: align-item → align-items */
  font-family: "Pretendard Variable";
  ${({ $fixed }) => 
    $fixed &&
    `
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
  `}
`;

const IconPosition = styled.div`
    position:relative;
    top: -15px;
    left:-35%;
`;
const IconPosition2 = styled.div`
    position:relative;
    top: -35px;
    left:40%;
`;
const Title = styled.div<{$fixed:boolean;}>`
    font-size:17px;
    font-weight:500;
    color:black;
    position: ${({$fixed})=> $fixed ? "fixed" : "relative"}
    top:20px;
`
const BellIcon = styled(Icon)`
    position: absolute; /* 절대 위치 설정 */
    right: 5px; /* 오른쪽 여백 설정 */
    color: #000;
    top:26px;
    margin-right:30px;
`;
const BackIcon= styled(Icon)`
    position: absolute; /* 절대 위치 설정 */
    right: -20px; /* 오른쪽 여백 설정 */
    color: #000;
    top:1px;
    
`