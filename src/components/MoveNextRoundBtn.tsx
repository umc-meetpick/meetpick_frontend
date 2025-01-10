import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface MoveNextRoundBtnProps {
    nextPage: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
  }

const MoveNextRoundBtn:  React.FC<MoveNextRoundBtnProps>= ({nextPage, onClick}) =>{
    const navigate = useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(event); 
        }
        navigate(nextPage); 
      };
    return(
        <Btn onClick={handleClick}>다음</Btn>
    )
}
export default MoveNextRoundBtn

const Btn = styled.button`
    width:312px;
    height:48px;
    color:#326DC1;
    font-size:15px;
    weight:600;
    background-color:#E7F2FE;
    border-radius:100px;
    position:absolute;
    bottom:120px;
    left:41px;
`;