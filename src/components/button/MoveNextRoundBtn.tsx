import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface MoveNextRoundBtnProps {
    nextPage: string;
    title?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
    width?: number;
    disable?: boolean;
  }

const MoveNextRoundBtn:  React.FC<MoveNextRoundBtnProps>= ({nextPage, title, onClick, width, disable}) =>{
    const navigate = useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(event); 
        }
        navigate(nextPage); 
      };
    return(
        <Btn 
            onClick={handleClick} 
            $width={width || 312} 
            $title={title?.length || 0}
            disabled={disable || false}
        >
            {title ? title : "다음"}
        </Btn>
    )
}
export default MoveNextRoundBtn

const Btn = styled.button<{$width:number, $title:number}>`
    width:${({$width,$title})=> $title!=0 ? `${$title * 14 + 30}px` : `${$width}px`};
    height:48px;
    color:#326DC1;
    font-size:15px;
    font-weight:600;
    background-color:#E7F2FE;
    border:none;
    border-radius:100px;
    position: absolute;
    left:${({$width})=> $width==312 ? "50%" : "70%"};
    transform: translateX(-50%);
    font-family: "Pretendard Variable";
    &:focus {
        outline: none; 
        border:none;
    }
`;