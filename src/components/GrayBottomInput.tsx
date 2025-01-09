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
    border-bottom: 1px solid gray;
`;