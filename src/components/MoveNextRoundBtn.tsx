import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface MoveNextRoundBtnProps {
    nextPage: string;
  }

const MoveNextRoundBtn = ({nextPage}: MoveNextRoundBtnProps) =>{
    const navigate = useNavigate();
    return(
        <Btn onClick={()=>navigate(nextPage)}>다음</Btn>
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
    position:fixed;
    top:670px;
    left:41px;
`;