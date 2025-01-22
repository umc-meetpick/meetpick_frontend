import React from "react";
import styled from "styled-components";

interface GrayBottomInputProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const GrayBottomInput: React.FC< GrayBottomInputProps> = (({ value, onChange, placeholder }) =>{
    return(
        <Input
            value={value}
            onChange={onChange}
            placeholder={placeholder || "입력"}
        />
    )
}
)
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