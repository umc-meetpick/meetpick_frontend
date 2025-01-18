import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import RecommendImage1 from "../assets/images/Recommend1.png";
import RecommendBlueBox from "./RecommendBlueBox";


interface ButtonProps {
  text1: string;
  text2:string;
  number1:string;
  number2:string;
  $backgroundColor?: string;
  width?: string;
  color?: string;
  disabled?: boolean;
  onClick?: () => void;
  detail1?:string;
  detail2?:string;
  detail3?:string;
  detail4?:string;
}

const RecommendBox: React.FC<ButtonProps> = ({
  text1,
  text2,
  number1,
  number2,
  $backgroundColor = "#E3F2FD", // 기본값 설정
  width = "140px", // 기본값 설정
  color = "black",
  disabled = false,
  onClick,
  detail1,
  detail2,
  detail3,
  detail4,
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
            <ButtonText>{text1}</ButtonText>
            <PersonText>{number1}/{number2}</PersonText>
        </FirstLine>
        <SecondLine>
            <StyledImage src={RecommendImage1} alt="추천 리스트 이미지" />
        </SecondLine>
        <ThirdLine>
          {text2}
        </ThirdLine>
        <FourthLine>
          <StyledBox>
                {detail1 && <Box>{detail1}</Box>}
                {detail2 && <Box>{detail2}</Box>}
                {detail3 && <Box>{detail3}</Box>}
                {detail4 && <Box>{detail4}</Box>}
          </StyledBox>
        </FourthLine>
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
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`;

const ButtonText = styled.span`
  display:flex;
  justify-content:center;
  font-weight:bold;
  font-size:13px;
  color:#5D5D5D;
`;

const FirstLine = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width: 100%; /* 부모 요소 너비 채우기 */
`
const SecondLine = styled.div`
    margin-top:5px;
`

const ThirdLine = styled.p`
  display:flex;
  justify-content:center;
  font-size:10px;
  color:#5D5D5D;
  margin:3px 0 7px 0;
`

const StyledImage = styled.img`
    width:39px;
    height:39px;
    border: 1px solid #CECECE;
    border-radius:50%;
`
const PersonText = styled.div`
    background-color:#D1ECFF;
    width:34px;
    height:23px;
    border-radius:10px;
    color:#454545;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:10px;
`

const FourthLine = styled.div`
    display:flex;
    width :136px;
    height:48px;
    background-color:rgba(255, 255, 255, 0.60);
    border-radius:10px;
    justify-content:center;
`

const StyledBox = styled.div`
  display:flex;
  max-width:136px;
  flex-wrap: wrap; /* 줄바꿈을 허용 */
  margin:4px;
  gap:5px;
`
const Box = styled.div`
  border-radius: 100px;
  background: #78C2FE;
  font-family: "Pretendard Variable";
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  width:auto;
  padding:2px 7px;
  color:white;

  display:flex;
  justify-content:center;
  align-items:center;
  
`

export default RecommendBox;
