import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";

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
            {before && <IconPosition onClick={handleGoBack}><IoChevronBackOutline size={24}/></IconPosition>}
            <Title>{title}</Title>
            {bell && <IconPosition2 onClick={()=>navigate("/alarm")}><GoBell size={24}/></IconPosition2>}
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
    left:-20%;
`;
const IconPosition2 = styled.div`
    position:relative;
    top:20px;
    left:20%;
`;
const Title = styled.div`
    font-size:17px;
    font-weight:500;
    color:black;
    position:relative;
    top:20px;
`