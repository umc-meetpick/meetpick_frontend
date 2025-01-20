import React from "react";
import styled from "styled-components";

interface AgreeItemProps {
  text: string;
  hasViewButton?: boolean;
  $isMain?: boolean; // 약관 전체 동의인지 여부
  checked: boolean; // 선택 여부
  onChange: () => void; // 선택 변경 핸들러
}

const AgreeItem: React.FC<AgreeItemProps> = ({ 
  text,
  hasViewButton = false,
  $isMain = false,
  checked,
  onChange,
}) => {
  return (
    <Container $isMain={$isMain}>
      <CheckBoxContainer>
        <CheckBoxButton 
          type="checkbox" 
          checked={checked} 
          onChange={onChange} 
        />
        <Text>{text}</Text>
      </CheckBoxContainer>
      {hasViewButton && <ViewButton>보기</ViewButton>}
    </Container>
  );
};

export default AgreeItem;

const Container = styled.div<{ $isMain?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: ${({ $isMain }) => ($isMain ? "2px solid #D9D9D9" : "none")};
  margin-bottom: ${({ $isMain }) => ($isMain ? "20px" : "0")};
`;

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CheckBoxButton = styled.input.attrs({ type: "checkbox" })`
  appearance: none; /* 기본 브라우저 스타일 제거 */
  width: 16px;
  height: 16px;
  border: 2px solid #1890ff; /* 파란 테두리 */
  border-radius: 50%; /* 원형 */
  background-color: white; /* 기본 배경색 흰색 */
  margin-right:6px;
  cursor: pointer;
  position: relative;

  &:checked::after {
    content: '';
    display: block;
    width: 9px; /* 내부 원 크기 */
    height: 9px;
    background-color: #1890ff; /* 내부 원 색상 */
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Text = styled.span` 
  font-size: 15.5px;
  color: #282828;
`;

const ViewButton = styled.a`
  font-size: 15px;
  color: #000000;
  cursor: pointer;
  margin-left: 15px;
  border-bottom: 1.5px solid #000000;
`;
