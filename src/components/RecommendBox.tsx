import React,{useState} from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import RecommendImage from "../assets/images/Recommend3.png";

interface ButtonProps {
  text1: string;
  text2:string;
  text3:string;
  number1:string;
  number2:string;
  $backgroundColor?: string;
  width?: string;
  color?: string;
  disabled?: boolean;
  detail1?:string;
  detail2?:string;
  detail3?:string;
  detail4?:string;
  onClick?: () => void;
}

const RecommendBox: React.FC<ButtonProps> = ({
  text1,
  text2,
  text3,
  number1,
  number2,
  $backgroundColor = "#E3F2FD", // 기본값 설정
  width = "140px", // 기본값 설정
  color = "black",
  disabled = false,
  detail1,
  detail2,
  detail3,
  detail4,
  onClick,
}) => {

  const [isIconClicked, setIsIconClicked] = useState(false); // 아이콘 클릭 상태 관리 

  const handleIconClick=() => {
    setIsIconClicked(!isIconClicked); // 클릭 시 상태 토글
    console.log("아이콘 클릭됨"); // 디버깅 로그
  }

  return (
    <StyledButton
      $backgroundColor={$backgroundColor}
      number1={number1}
      number2={number2}
      width={width}
      color={color}
      disabled={disabled}
      onClick = {disabled? undefined : onClick}
    >  
        <FirstLine>
            <PersonText>{number1}/{number2}명</PersonText>
            <StyledIcon 
            icon= {isIconClicked? "si:heart-fill": "si:heart-line"}
            width="20"
            height="20" 
            $isClicked = {isIconClicked}
            onClick = {handleIconClick}
            
            />
        </FirstLine>
        <SecondLine>
            <StyledImage src={RecommendImage} alt="추천 리스트 이미지" />
            <Nickname>{text1}</Nickname>
            <Keyword1>{text2}</Keyword1>
            <Keyword2>{text3}</Keyword2>
        </SecondLine>
    
        <FourthLine>
          <StyledBox>
                {detail1 && <Box>{detail1}</Box>}
                {detail2 && <Box>{detail2}</Box>}
                {detail3 && <Box>{detail3}</Box>}
                {detail4 && <Box>{detail4}</Box>}
          </StyledBox>
        </FourthLine>
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  $backgroundColor: string;
  width: string;
  color: string;
  number1:string;
  number2:string;
}>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  width: ${({ width }) => width};
  color: ${({ color }) => color};
  height: 160px;
  border: none;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
  padding: 7px; /* 버튼 내부 여백 */
`;

const FirstLine = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width: 100%; /* 부모 요소 너비 채우기 */
`
const SecondLine = styled.div`
    margin-top:5px;
    display:flex;
    position:relative;
    
`

const StyledImage = styled.img`
    width:39px;
    height:39px;
    border-radius: 100px;
    border: 1px solid #F1F1F1;
`
const PersonText = styled.div`
    background-color:#0096FF;
    width:33px;
    height:15px;
    border-radius:100px;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:11px;
    font-weight: 400;
    padding:2px 5px;
`

const FourthLine = styled.div`
    display:flex;
    width :136px;
    height:48px;
    background-color:rgba(255, 255, 255, 0.60);
    border-radius:10px;
    justify-content:center;
    margin-top:25px;
    padding:0 5px;
`

const StyledBox = styled.div`
  display:flex;
  max-width:136px;
  flex-wrap: wrap; /* 줄바꿈을 허용 */
  margin:4px;
  gap:5px;
  justify-content:flex-start;
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
  height:14px;
`

const StyledIcon = styled(Icon)<{$isClicked: boolean}>`
  cursor:pointer;
  color: ${({ $isClicked }) => ($isClicked ? "#FF3D40" : "#A5B0BB")};

  position: relative; /* 위치 속성 확인 */
`

const Keyword1 = styled.p`
  position:absolute;
  left:50px;
  color:#565656;
  top:20px;
  font-size:11px;
  font-weight: 400;
`

const Keyword2 = styled.p`
  position:absolute;
  left:50px;
  color:#565656;
  top:35px;
  font-size:11px;
  font-weight: 400;
`

const Nickname = styled.p`
  margin-left: 10px;
  font-weight: 600;
  font-size:14px;
  position:absolute;
  left:40px;
  top:-5px;
`
export default RecommendBox;