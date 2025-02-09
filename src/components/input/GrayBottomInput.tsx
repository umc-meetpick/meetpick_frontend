import React from "react";
import styled from "styled-components";

interface GrayBottomInputProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    width?:number;
    $isRight?:boolean;
    $isBlack?:boolean;
}

const GrayBottomInput = React.forwardRef<HTMLInputElement, GrayBottomInputProps>(
    ({ value, onChange, placeholder,width, $isRight, $isBlack }, ref) => {
        return (
            <Input
                ref={ref}
                value={value}
                onChange={onChange}
                placeholder={placeholder || "입력"}
                $width={width ? `${width}px` : "300px"} 
                $isRight={$isRight || false}
                $isBlack={$isBlack ? $isBlack : false}
            />
        );
    }
);

export default GrayBottomInput;
const Input = styled.input<{$width:string, $isRight:boolean, $isBlack:boolean}>`
    width:${props => props.$width};
    font-family: 'Pretendard Variable', sans-serif;
    height:48px;
    border:none;
    border-bottom: 1px solid #CECECE;
    font-size:17px;
    font-weight:400;
    text-align: ${({ $isRight }) => ($isRight ? "right" : "left")};
    color: black;
    &:focus {
        outline: none;
    }
`;