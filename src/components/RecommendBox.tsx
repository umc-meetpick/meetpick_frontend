import  { useState, useEffect } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useLikeMatch, useDeleteLikeMatch } from "../apis/matchingRecommend/matchingHeart";


interface ButtonProps {
  profileImage:string;
  category: string;
  requestId: number;
  text1: string;
  text2: string;
  text3: string;
  $number1: string | number;
  $number2: string | number;
  $backgroundColor?: string;
  width?: string;
  color?: string;
  disabled?: boolean;
  detail1?: string;
  detail2?: string;
  detail3?: string;
  detail4?: string;
  detail5?: string;
  detail6?: string;
  onClick?: () => void;
  showHeart?:boolean;
}

const RecommendBox: React.FC<ButtonProps> = ({
  profileImage,
  category,
  requestId,
  text1,
  text2,
  text3,
  $number1,
  $number2,
  $backgroundColor = "#E3F2FD",
  width = "140px",
  color = "black",
  disabled = false,
  detail1, 
  detail2,
  detail3,
  detail4,
  detail5,
  detail6,
  showHeart,
}) => {
  const favoriteKey = `heart_${category}_${requestId}`;

  const likeMutation = useLikeMatch(); // 좋아요 요청 훅
  const deleteLikeMutation = useDeleteLikeMatch(); // 좋아요 취소 요청 훅

  const [isIconClicked, setIsIconClicked] = useState<boolean>(() => {
    const savedState = localStorage.getItem(favoriteKey);
    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    const savedState = localStorage.getItem(favoriteKey);
    if (savedState) {
      setIsIconClicked(JSON.parse(savedState));
    }
  }, [favoriteKey]);

  const handleIconClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("💖 하트 버튼 클릭됨! -> requestId =", requestId);
    
    
  
    const newState = !isIconClicked;
    setIsIconClicked(newState);
    localStorage.setItem(favoriteKey, JSON.stringify(newState));
  
    // ✅ localStorage 변경 이벤트 발생 → LikePage에도 반영되도록 함
    window.dispatchEvent(new Event("storage"));
  
    try {
      if (newState) {
        console.log("🟢 좋아요 요청 전송 중...");
        await likeMutation.mutateAsync({ requestId});
        console.log("✅ 좋아요 성공:", requestId);
      } else {
        console.log("🔴 좋아요 취소 요청 전송 중...");
        await deleteLikeMutation.mutateAsync({ requestId});
        console.log("🚨 좋아요 취소 성공:", requestId);
      }
    } catch (error) {
      console.error("❌ 좋아요 요청 실패:", error);
  
      window.dispatchEvent(new Event("storage"));
    }
  };
  
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    
  };

  return (
    <StyledButton
      $backgroundColor={$backgroundColor}
      $number1={$number1}
      $number2={$number2}
      width={width}
      color={color}
      disabled={disabled}
      $isExpanded={isExpanded}
    >
      <FirstLine>
        <PersonText>
          {$number1}/{$number2}명
        </PersonText>
        {showHeart ? (
          <StyledIcon
            icon={isIconClicked ? "si:heart-fill" : "si:heart-line"}
            width="20"
            height="20"
            $isClicked={isIconClicked}
            onClick={handleIconClick}
          />
        ) : 
        <StyledIcon
          icon="si:heart-fill"
          width="20"
          height="20"
          $isClicked={true}
      />}
      </FirstLine>
      <SecondLine>
        <StyledImage src={profileImage} alt="사용자 프로필" />
        <Nickname>{text1}</Nickname>
        <Keyword1>{text2}</Keyword1>
        <Keyword2>{text3}</Keyword2>
      </SecondLine>

      <FourthLine $isExpanded={isExpanded} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        toggleExpand();
      }}>
        <StyledBox>
          {detail1 && <Box>{detail1}</Box>}
          {detail2 && <Box>{detail2}</Box>}
          {detail3 && <Box>{detail3}</Box>}
          {detail4 && <Box>{detail4}</Box>}
          {detail5 && <Box>{detail5}</Box>}
          {detail6 && <Box>{detail6}</Box>}
        </StyledBox>
        <StyledArrowIcon
          icon={isExpanded ? "akar-icons:chevron-up" : "akar-icons:chevron-down"}
          width="20"
          height="10"
        />
      </FourthLine>
    </StyledButton>
  );
};


const StyledArrowIcon = styled(Icon)`
    align-self: center;
    color: #6C6C73;
    margin-top: 5px;
    cursor: pointer;
`;

const StyledButton = styled.button<{
  $backgroundColor: string;
  width: string;
  color: string;
  $number1:string|number;
  $number2:string|number;
  $isExpanded:boolean;
}>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  width: ${({ width }) => width};
  color: ${({ color }) => color};
  height: ${({ $isExpanded }) => ($isExpanded ? "auto" : "160px")}; /* 높이 자동 조절 */
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

const FourthLine = styled.div<{$isExpanded : boolean}>`
    display:flex;
    width :136px;
    height: ${({ $isExpanded }) => ($isExpanded ? "auto" : "48px")}; /* 높이 자동 조절 */
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
  gap:3px;
  justify-content:flex-start;
  overflow-y:hidden;
`
const Box = styled.div`
  border-radius: 100px;
  background: #78C2FE;
  font-family: "Pretendard Variable";
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  width:auto;
  padding:2px 8px;
  color:white;
  height:14px;
  display:flex;
  justify-content:center;
  align-items:center;
`

const StyledIcon = styled(Icon)<{$isClicked: boolean}>`
  cursor:pointer;
  color: ${({ $isClicked }) => ($isClicked ? "#FF3D40" : "#A5B0BB")};

  position: relative; /* 위치 속성 확인 */
`

const Keyword1 = styled.p`
  position:absolute;
  left:47px;
  color:#565656;
  top:20px;
  font-size:10.5px;
  font-weight: 400;
`

const Keyword2 = styled.p`
  position:absolute;
  left:47px;
  color:#565656;
  top:35px;
  font-size:10.5px;
  font-weight: 400;
`

const Nickname = styled.p`
  margin-left: 10px;
  font-weight: 600;
  font-size:14px;
  position:absolute;
  left:37px;
  top:-5px;
`
export default RecommendBox;
