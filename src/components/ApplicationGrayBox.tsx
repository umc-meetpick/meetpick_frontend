import styled from "styled-components";

interface TextProps {
    text1 : string; // 제목 텍스트 
    text2 :string; // 세부 텍스트 
    width : string; // 박스 너비비
    color?:string; // 배경 색상 
}

const ApplicationGrayBox : React.FC<TextProps> = ({
    text1,
    text2,
    width,
    color="#F8F9FB",
}) => {
    return (
        <StyledBox width={width} color={color}>
            <Text1>{text1}</Text1>
            <Text2>{text2}</Text2>
        </StyledBox>
    );
};

const StyledBox = styled.div<{width: string; color: string }>`
    width: ${({width})=>width};
    color: ${({color})=>color};
    height:64px;
    border-radius: 10px;
    background: #F8F9FB;
    display: flex;
    flex-direction: column; /* 텍스트를 위아래로 배치 */
    justify-content: center;
    align-items: center;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1); /* 살짝 그림자 효과 */
    margin-bottom:17px;
`

// 제목 텍스트 스타일
const Text1 = styled.div`
    color: #000;
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 171.429% */
`;

// 세부 텍스트 스타일
const Text2 = styled.div`
    color: #000;
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 200% */
`;

export default ApplicationGrayBox;