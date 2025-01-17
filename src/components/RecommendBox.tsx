import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import RecommendImage1 from "../assets/images/Recommend1.png";

 

interface ButtonProps {
  text: string;
  number1:string;
  number2:string;
  $backgroundColor?: string;
  width?: string;
  color?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const RecommendBox: React.FC<ButtonProps> = ({
  text,
  number1,
  number2,
  $backgroundColor = "#E3F2FD", // 기본값 설정
  width = "140px", // 기본값 설정
  color = "black",
  disabled = false,
  onClick,
}) => {
  return (
    <StyledButton
      $backgroundColor={$backgroundColor}
      number1={number1}
      number2={number2}
      width={width}
      color={color}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >  
        <FirstLine>
            <Icon icon="si:heart-fill" width="20" height="20" color="#FC0F13"/>
            <ButtonText>{text}</ButtonText>
            <PersonText>{number1}/{number2}</PersonText>
        </FirstLine>
        <SecondLine>
            <StyledImage src={RecommendImage1} alt="추천 리스트 이미지" />
        </SecondLine>
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  $backgroundColor: string;
  width: string;
  color: string;
  number1:string;
  number2:string;
}>`
  position:relative;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  width: ${({ width }) => width};
  color: ${({ color }) => color};
  height: 160px;
  border: none;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
  justify-content: space-between; /* 텍스트와 화살표 사이 간격 */
  padding: 0 9px; /* 버튼 내부 여백 */
`;

const ButtonText = styled.span`
  display:flex;
  justify-content:center;
  font-weight:bold;
  font-size:14px;
`;

const FirstLine = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width: 100%; /* 부모 요소 너비 채우기 */
`
const SecondLine = styled.div`

`

const StyledImage = styled.img`
    width:39px;
    height:39px;
`
const PersonText = styled.div`
    background-color:#D1ECFF;
    width:34px;
    height:23px;
    border-radius:10px;
    font-weight:bold;
`

export default RecommendBox;
