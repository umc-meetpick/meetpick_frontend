import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface MoveNextRoundBtnProps {
    nextPage: string;
    title?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
  }

const MoveNextRoundBtn:  React.FC<MoveNextRoundBtnProps>= ({nextPage, title, onClick}) =>{
    const navigate = useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(event); 
        }
        navigate(nextPage); 
      };
    return(
        <Btn onClick={handleClick}>{title ? title : "다음"}</Btn>
    )
}
export default MoveNextRoundBtn

const Btn = styled.button`
    width:312px;
    height:48px;
    color:#326DC1;
    font-size:15px;
    font-weight:600;
    background-color:#E7F2FE;
    border:none;
    border-radius:100px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    &:focus {
        outline: none; 
        border:none;
    }
`;