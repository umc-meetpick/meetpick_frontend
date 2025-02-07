import React from "react";
import styled from "styled-components";

interface ButtonProps {
  text: string; // 버튼에 표시될 텍스트
  width?: string; // 버튼의 너비
}

const ApplicationGrayButton: React.FC<ButtonProps> = ({ 
    text, 
    width = "68px", 
}) => {
    return (
        <StyledButton style={{ width }}>
          {text}
        </StyledButton>
      );
};

export default ApplicationGrayButton;

const StyledButton = styled.button`
  height: 30px;
  border: 2px solid #CECECE;
  border-radius: 20px; /* 둥근 테두리 */
  font-size: 13px;
  color: black;
  background-color: white; /* 버튼 배경색 */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 12px; /* 좌우 여백 */
  font-family: "Pretendard Variable";
  box-sizing: border-box;
`;
