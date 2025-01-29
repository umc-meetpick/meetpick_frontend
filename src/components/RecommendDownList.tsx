import React, { useState } from "react";
import styled from "styled-components";

interface DropdownButtonProps {
  text: string; // 버튼 텍스트
  height:string;
  width: string; // 버튼 너비
  //options는 일반 배열(단순 리스트) 또는 {label, subOptions} 형태의 배열(서브메뉴 지원) 둘 다 받을 수 있음
  options?: { label: string; subOptions?: string[] }[] | string[];
  color?:string;
  $isSelected?: boolean; // 선택된 버튼 여부
  onSelect?: (selected: string) => void; // 리스트 선택 시 이벤트
  onToggle?:(isOpen: boolean) => void; // 드롭다운 열림/닫힘 상태 감지하는 콜백 함수
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  text,
  height,
  width,
  options = [],
  $isSelected = false,
  color="#8B8B8B",
  onSelect,
  onToggle,
}) => {
  // 드롭 다운 리스트가 열려있는지 닫혀있는지 나타내는 상태
  const [isOpen, setIsOpen] = useState(false);
  // 선택된 1차 옵션의 하위 옵션 리스트 (있을 경우에만 세팅된다.)
  const [subOptions, setSubOptions] = useState<string[] | null>(null);

  // 버튼 클릭시 호출됨
  const toggleDropdown = () => {
    
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    //console.log("toggleDropdown 호출", isOpen);
    if(onToggle){
      onToggle(newIsOpen); // 상태 변경 시 콜백 호출
    }
  }
  // 첫 번째 메뉴 선택 시
  const handleOptionClick = (option: string | { label: string; subOptions?: string[] }) => {
    if (typeof option === "string") {
      if (onSelect) onSelect(option);
      setIsOpen(false);
    } 
    else {
      setSubOptions(option.subOptions || null);
    }
  };

  // 두 번째 서브 메뉴 선택 시
  const handleSubOptionClick = (subOption: string) => {
    if (onSelect) onSelect(subOption);
    setIsOpen(false); // 드롭 다운 닫기 
    setSubOptions(null); // 서브 메뉴 초기화
  };

  return (
    <Container>
      <StyledButton $color={color} $height = {height} style={{ width}} $isSelected={$isSelected} onClick={toggleDropdown} >
        {text}
      </StyledButton>
      {isOpen && options.length > 0 && (
        <DropdownWrapper>
          <DropdownList $width={width}>
            {(options as any[]).map((option, index) => (
              <DropdownItem key={index} onClick={() => handleOptionClick(option)}>
                {typeof option === "string" ? option : option.label}
                {typeof option !== "string" && option.subOptions && <ArrowIcon>›</ArrowIcon>}
              </DropdownItem>
            ))}
          </DropdownList>

          {subOptions && (
            <DropdownList $width="60px" style={{ left: "86px", top: "-82px" }}>
              {subOptions.map((subOption, index) => (
                <DropdownItem2 key={index} onClick={() => handleSubOptionClick(subOption)}>
                  {subOption}
                </DropdownItem2>
              ))}
            </DropdownList>
          )}
        </DropdownWrapper>
      )}
    </Container>
  );
};

export default DropdownButton;

const ArrowIcon = styled.span`
  font-size: 16px;
  color: #555;
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const Container = styled.div`
  position: relative;
  display: inline-block;
  z-index: 10; /* 필요시 값 조정 */
`;

const StyledButton = styled.button<{ $isSelected?: boolean; $color?:string; $height:string }>`
  height: ${({ $height }) => $height || "40px"}; /* 전달받은 height를 적용하고 기본값 설정 */
  border: 2px solid #CECECE;
  border-radius: 20px;
  font-size: 13px;
  color: ${({ $color }) => $color || "#8B8B8B"}; /* 전달받은 color를 적용 */
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 10px;
  box-sizing: border-box;
  padding:0;

  &:hover {
    border-color: #007aff;
  }
`;

const DropdownList = styled.ul<{$width : string}>`
  position: relative;
  left: 0;
  margin-top:5px;
  padding: 0px;
  background: white;
  border: 1.5px solid #cecece;
  list-style: none;
  width: ${({ $width }) => `calc(${Number($width.replace('px', '')) - 4}px)`};

  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.27); /* 드롭다운 전체에 그림자 추가 */
   
`;

const DropdownItem = styled.li`
  display:flex;
  justify-content:center;
  align-items:center;
  cursor: pointer;
  text-align:center;
  color:#6C6C73;
  font-size:13px;
  font-weight: 400;
  padding: 4px 0;
  &:hover{
    background-color:#F5F5F5;
  }
`;
const DropdownItem2 = styled.li`
  display:flex;
  justify-content:center;
  align-items:center;
  cursor: pointer;
  text-align:center;
  color:#6C6C73;
  font-size:13px;
  font-weight: 400;
  padding: 4px 0;
  z-index:1000000000000000000000;
  &:hover{
    background-color:#F5F5F5;
  }

`;