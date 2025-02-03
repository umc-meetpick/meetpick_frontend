import React, { useState, useRef, useEffect } from "react";
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
  left?:string;
  top?:string;
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
  left,
  top,
}) => {
  // 드롭 다운 리스트가 열려있는지 닫혀있는지 나타내는 상태
  const [isOpen, setIsOpen] = useState(false);
  // 선택된 1차 옵션의 하위 옵션 리스트 (있을 경우에만 세팅된다.)
  const [subOptions, setSubOptions] = useState<string[] | null>(null);

  const [dropdownWidth, setDropdownWidth] = useState<string>("auto");

  // 버튼의 너비를 가져오기 위한 ref
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      // "운동 종류"이면 너비를 120px로, 아니면 버튼의 너비로 설정
      const newWidth = text === "운동 종류 ∨" ? "100px" : `${buttonRef.current.offsetWidth}px`;
      setDropdownWidth(newWidth);
    }
  }, [text]); // text가 변경될 때마다 다시 측정

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
          <DropdownList $width={dropdownWidth}>
            {(options as any[]).map((option, index) => (
              <DropdownItem key={index} onClick={() => handleOptionClick(option)}>
                {typeof option === "string" ? option : option.label}
                {typeof option !== "string" && option.subOptions && <ArrowIcon>&nbsp;&nbsp;&nbsp;›</ArrowIcon>}
              </DropdownItem>
            ))}
          </DropdownList>

          {subOptions && (
            <DropdownList2 $width="65px" $left={left} $top={top}>
              {subOptions.map((subOption, index) => (
                <DropdownItem2 key={index} onClick={() => handleSubOptionClick(subOption)}>
                  {subOption}
                </DropdownItem2>
              ))}
            </DropdownList2>
          )}
        </DropdownWrapper>
      )}
    </Container>
  );
};

export default DropdownButton;

const ArrowIcon = styled.span`
  font-size: 15px;
  color: #6C6C73;
  display:flex;
  justify-content:center;
  align-itmes:center;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  border: 1px solid none;
  height:auto;
  z-index:50;
`;

const Container = styled.div`
  position: relative;
  display: inline-block;
  z-index: 10; /* 필요시 값 조정 */
  overflow: visible; /* Swiper 내부에 있다면 필요 */
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
  margin-right: 5px;
  box-sizing: border-box;
  padding:0 15px;
  overflow:visible;

  &:hover {
    border-color: #007aff;
  }
`;

const DropdownList = styled.ul<{$width?:string; $top?: string; $left?: string }>`
  position:absolute;
  left: 0;
  margin-top:5px;
  margin-left:8px;
  padding: 0px;
  background: white;
  border: 1.5px solid #cecece;
  list-style: none;
  min-width: 50px; /* 최소 너비는 버튼 크기 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  top: ${({ $top }) => $top || "0px"};
  left: ${({ $left }) => $left || "0px"};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.27);
`;

const DropdownList2 = styled.ul<{$width : string; $top?: string; $left?: string }>`
  position:absolute;
  margin-top:5px;
  padding: 0px;
  background: white;
  border: 1.5px solid #cecece;
  list-style: none;
  width: 60px;
  //top: ${({ $top }) => `${$top}` || "0px"};
  top:0px;
  left: 63px; 
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.27); /* 드롭다운 전체에 그림자 추가 */

`;

const DropdownItem = styled.li`
  display:flex;
  justify-content:center;
  align-items:center;
  cursor: pointer;
  text-align:center;
  color:#6C6C73;
  font-size:10.5px;
  font-weight: 500;
  padding: 5px 3px;
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
  font-size:12px;
  font-weight: 500;
  padding: 4px 0;
  

  &:hover{
    background-color:#F5F5F5;
  }

`;