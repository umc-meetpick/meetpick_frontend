import React from "react";
import styled from "styled-components";

interface TextProps {
    text1?: string;
    text2?:string;
    text3?:string;
    text4?:string;
  }
  
  const RecommendBlueBox: React.FC<TextProps> = ({
    text1="null",
    text2,
    text3,
    text4=null
  }) => {
    return (
        <Wrapper>
            <StyledBox>
                {text1 && <Box>{text1}</Box>}
                {text2 && <Box>{text2}</Box>}
            </StyledBox>
            <StyledBox>
                {text3 && <Box>{text3}</Box>}
                {text4 && <Box>{text4}</Box>}
            </StyledBox>
        </Wrapper>
    );
  };
  

const Wrapper = styled.div` 
  display:flex;
`
const StyledBox = styled.div`
  
`
const Box = styled.div`
  border-radius: 100px;
  background: #78C2FE;
  font-family: "Pretendard Variable";
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  width:auto;
  padding:2px 8px;
  color:white;
  margin:3.5px;
  display:flex;
  justify-content:center;
  align-items:center;
  
`
export default RecommendBlueBox;