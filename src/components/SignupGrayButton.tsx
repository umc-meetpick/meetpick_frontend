import React from "react";
import styled from "styled-components";

interface ButtonProps {
  text: string; // 버튼에 표시될 텍스트
  width?: string; // 버튼의 너비
  $isSelected?: boolean; // 선택 상태
  onClick?: () => void; // 클릭 이벤트 핸들러
}

const SignupGrayButton: React.FC<ButtonProps> = ({ 
    text, 
    width = "100px", 
    $isSelected, 
    onClick,
}) => {
    return (
        <StyledButton style={{ width }} $isSelected={$isSelected} onClick={onClick}>
          {text}
        </StyledButton>
      );
};

export default SignupGrayButton;

const StyledButton = styled.button<{ $isSelected?: boolean }>`
  height: 40px;
  border: 2px solid ${({ $isSelected }) => ($isSelected ? "#34A3FD" : "#CECECE")}; /* 테두리 색상 */
  border-radius: 20px; /* 둥근 테두리 */
  font-size: 14px;
  color: ${({ $isSelected }) => ($isSelected ? "#34A3FD" : "#8B8B8B")}; /* 텍스트 색상 */
  background-color: white; /* 버튼 배경색 */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 10px; /* 좌우 여백 */
  margin-right: 10px;
  box-sizing: border-box;

  &:hover {
    border-color: #007AFF; /* 호버 시 테두리 색상 */
  }

`;
