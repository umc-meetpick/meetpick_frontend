import React from "react";
import styled from "styled-components";

interface ButtonProps {
  text: string;
  backgroundColor?: string;
  width?: string;
  color?:string;
  disabled?:boolean;
  onClick?: () => void;
}

const SignupButton: React.FC<ButtonProps> = ({
  text,
  backgroundColor = "#E3F2FD", // 기본값 설정
  width = "140px", // 기본값 설정
  color="black",
  disabled=false,
  onClick,
}) => {
    return (
        <StyledButton
          backgroundColor={backgroundColor}
          width={width}
          color={color}
          disabled={disabled} // button에 disabled 전달
          onClick={disabled ? undefined : onClick} // disabled면 onClick 비활성화
        >
          {text}
        </StyledButton>
      );
};


const StyledButton = styled.button<{ backgroundColor: string; width: string; color: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: ${({ width }) => width};
  color: ${({ color }) => color};
  height: 52px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

export default SignupButton;
