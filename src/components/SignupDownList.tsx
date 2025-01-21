import React, { useState } from "react";
import styled from "styled-components";

interface DropdownButtonProps {
  text: string; // 버튼 텍스트
  height:string;
  width: string; // 버튼 너비
  options?: string[]; // 드롭다운 옵션 리스트
  color?:string;
  $isSelected?: boolean; // 선택된 버튼 여부
  onSelect?: (selected: string) => void; // 리스트 선택 시 이벤트
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  text,
  height,
  width,
  options = [],
  $isSelected = false,
  color="#8B8B8B",
  onSelect,
}) => {
  // 드롭 다운 리스트가 열려있는지 닫혀있는지 나타내는 상태
  const [isOpen, setIsOpen] = useState(false);

  // 버튼 클릭시 호출됨
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  // 드롭 다운 리스트 항목 클릭시 호출됨
  const handleOptionClick = (option: string) => {
    if (onSelect) onSelect(option); // 선택된 항목을 onSelect 함수에 전달
    setIsOpen(false); // 선택 후 드롭다운 닫기
  };

  return (
    <Container>
      <StyledButton $color={color} $height = {height} style={{ width}} $isSelected={$isSelected} onClick={toggleDropdown} >
        {text}
      </StyledButton>
      {isOpen && options.length > 0 && (
        <DropdownList $width ={width}>
          {options.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </Container>
  );
};

export default DropdownButton;

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledButton = styled.button<{ $isSelected?: boolean; $color?:string; $height:string }>`
  height: ${({ $height }) => $height || "40px"}; /* 전달받은 height를 적용하고 기본값 설정 */
  border: 2px solid #CECECE;
  border-radius: 20px;
  font-size: 14px;
  color: ${({ $color }) => $color || "#8B8B8B"}; /* 전달받은 color를 적용 */
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 10px;
  box-sizing: border-box;

  &:hover {
    border-color: #007aff;
  }
`;

const DropdownList = styled.ul<{$width : string}>`
  position: absolute;
  left: 0;
  margin-top:5px;
  padding: 0px;
  background: white;
  border: 1.5px solid #cecece;
  list-style: none;
  z-index: 1;
  width: ${({ $width }) => `calc(${Number($width.replace('px', '')) - 4}px)`};

  max-height: 100px; /* 리스트의 최대 높이를 설정 */
  overflow-y: scroll; /* 내용이 많을 경우 스크롤 활성화 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.27); /* 드롭다운 전체에 그림자 추가 */
  
`;

const DropdownItem = styled.li`
  display:flex;
  justify-content:center;
  align-items:center;
  height: 32px;
  cursor: pointer;
  text-align:center;
  color:black;
  font-size:13px;

  &:hover{
    background-color:#F5F5F5;
  }

`;
