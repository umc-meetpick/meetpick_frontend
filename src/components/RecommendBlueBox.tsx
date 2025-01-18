import React from "react";
import styled from "styled-components";

interface TextProps {
    text1?: string;
    text2?:string;
    text3?:string;
    text4?:string;
  }
  
  const RecommendBlueBox: React.FC<TextProps> = ({
    text1,
    text2,
    text3,
    text4
  }) => {
    return (
        <StyledBox>
            <Box>{text1}</Box>
            <Box>{text2}</Box>
            <Box>{text3}</Box>
            <Box>{text4}</Box>
        </StyledBox>
    );
  };
  
const StyledBox = styled.div`
  display:flex;
`
const Box = styled.div`
  border-radius: 100px;
  background: #78C2FE;
  font-family: "Pretendard Variable";
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
`
export default RecommendBlueBox;