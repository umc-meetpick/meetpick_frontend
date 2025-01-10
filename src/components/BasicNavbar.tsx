import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";

interface TitleProps{
    title:string;
}

const BasicNavbar: React.FC<TitleProps> = ({title}) =>{
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
      };
    return(
        <Container>
            <IconPosition onClick={handleGoBack}><IoChevronBackOutline size={24}/></IconPosition>
            <Title>{title}</Title>
        </Container>
    )
}
export default BasicNavbar

const Container = styled.div`
    width:393px;
    height:60px;
`;
const IconPosition = styled.div`
    position:fixed;
    top:20px;
    left:33px;
`;
const Title = styled.div`
    font-size:17px;
    font-weight:500;
    color:black;
    display:flex;
    justify-content: center;
    line-height:60px;
`