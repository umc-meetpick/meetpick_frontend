import React from "react";
import styled from "styled-components";

interface ButtonProps {
  text: string;
  $backgroundColor?: string;
  width?: string;
  color?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const ModifyButton: React.FC<ButtonProps> = ({
  text,
  $backgroundColor = "#E3F2FD", // 기본값 설정
  width = "140px", // 기본값 설정
  color = "black",
  disabled = false,
  onClick,
}) => {
  return (
    <StyledButton
      $backgroundColor={$backgroundColor}
      width={width}
      color={color}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >
      <ButtonText>{text}</ButtonText>
      <Arrow>›</Arrow>
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  $backgroundColor: string;
  width: string;
  color: string;
}>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  width: ${({ width }) => width};
  color: ${({ color }) => color};
  height: 40px;
  border: none;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
  margin-bottom: 14px;
  display: flex;
  justify-content: space-between; /* 텍스트와 화살표 사이 간격 */
  align-items: center; /* 수직 가운데 정렬 */
  padding: 0 10px; /* 버튼 내부 여백 */
  font-weight:400;
`;

const ButtonText = styled.span`
  flex-grow: 1; /* 텍스트 영역이 가변적으로 늘어나도록 설정 */
  text-align: left;
`;

const Arrow = styled.span`  
  font-size: 18px;
  margin-bottom:5px;
`;

export default ModifyButton;
