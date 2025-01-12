import React from "react";
import styled from "styled-components";

interface TitleProps {
  placeholder: string;
  value?: string; // 입력값
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 입력값 변경 핸들러
  hasButton?: boolean;
  buttonText?: string;
  $marginBottom?: number;
  onButtonClick?: () => void;
}

const SignupInput: React.FC<TitleProps> = ({
  placeholder,
  value,
  onChange,
  hasButton = false,
  buttonText,
  $marginBottom,
  onButtonClick,
}) => {
  return (
    <Container $marginBottom={$marginBottom}>
      <StyledInput
        placeholder={placeholder}
        value={value} // 상태를 입력값으로 연결
        onChange={onChange} // 입력값 변경 시 호출되는 핸들러
      />
      {hasButton && (
        <StyledButton onClick={onButtonClick}>
          {buttonText}
        </StyledButton>
      )}
    </Container>
  );
};

export default SignupInput;

const Container = styled.div<{ $marginBottom?: number }>`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 350px; /* 컨테이너 최대 너비 */
  border-bottom: 2px solid #CECECE;
  margin-bottom: ${({ $marginBottom }) => $marginBottom || 0}px;
`;

const StyledInput = styled.input`
  flex: 1; /* 남은 공간 채우기 */
  height: 48px;
  border: none;
  font-size: 17px;
  font-weight: 400;
  margin-right: 8px; /* 버튼과의 간격 */
  ::placeholder {
    color: #939395;
  }
  &:focus {
    outline: none;
  }
`;

const StyledButton = styled.button`
  padding: 6px 10px; /* 버튼 좌우 패딩 */
  border: 1px solid #CECECE;
  border-radius: 20px;
  background-color: white;
  color: #333; /* 버튼 텍스트 색상 */
  font-size: 12px;
  cursor: pointer;

  &:hover {
    border-color: #939395;
  }

  &:active {
    opacity: 0.8;
  }
`;
