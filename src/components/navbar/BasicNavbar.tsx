import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { Icon } from "@iconify/react";

interface TitleProps{
    title:string;
    before?: boolean;
    bell?:boolean;
}

const BasicNavbar: React.FC<TitleProps> = ({title, before, bell}) =>{
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
      };
    return(
        <Container>
            {before && <IconPosition onClick={handleGoBack}><BackIcon icon="mdi:keyboard-arrow-left" width="24" height="24"/></IconPosition>}
            <Title>{title}</Title>
            {bell && <IconPosition2 onClick={()=>navigate("/alarm")}><BellIcon icon="ci:bell" width="24" height="24" /></IconPosition2>}
        </Container>
    )
}
export default BasicNavbar

const Container = styled.div`
    width:100%;
    max-width:393px;
    height:60px;
    background-color:white;
    display:flex;
    justify-content: center;
    align-item:center;
    font-family: "Pretendard Variable";
`;
const IconPosition = styled.div`
    position:relative;
    top:20px;
    left:-35%;

`;
const IconPosition2 = styled.div`
    position:relative;
    top:-5px;
    left:40%;
`;
const Title = styled.div`
    font-size:17px;
    font-weight:500;
    color:black;
    position:relative;
    top:20px;
`
const BellIcon = styled(Icon)`
    position: absolute; /* 절대 위치 설정 */
    right: 15px; /* 오른쪽 여백 설정 */
    color: #000;
    top:26px;
`;
const BackIcon= styled(Icon)`
    position: absolute; /* 절대 위치 설정 */
    right: -10px; /* 오른쪽 여백 설정 */
    color: #000;
    top:1px;
`