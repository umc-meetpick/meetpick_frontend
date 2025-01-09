import React from "react";
import styled from "styled-components";

const GrayBottomInput = () =>{
    return(
        <Input placeholder="입력"></Input>
    )
}
export default GrayBottomInput;

const Input = styled.input`
    width:300px;
    height:48px;
    border:none;
    border-bottom: 1px solid #CECECE;
    font-size:17px;
    font-weight:400;
    ::placeholder {
        color: #939395;
    }
    &:focus {
        outline: none;
    }
`;