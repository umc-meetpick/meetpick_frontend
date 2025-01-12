import React from "react";
import styled from "styled-components";

interface SelectedProps {
    input: string[];
}

const ProfileSelectedBorder:React.FC<SelectedProps> = ({input}) =>{
    // const calculateWidth = (text: string) => {
    //     const canvas = document.createElement('canvas');
    //     const context = canvas.getContext('2d');
    //     if (context) {
    //       context.font = "13px Arial"; // 적용할 글꼴과 크기 설정
    //       return Math.max(context.measureText(text).width, 60); // 최소 너비 60px
    //     }
    //     return 60;
    //   };
    return(
        <Container>
            {input.map((item, index) => {
                const isImage = item.endsWith(".png");
                return isImage ? (
                    <ImgBorder key={index} src={item} alt={`image-${index}`} />
                ) : (
                    <Border key={index} $length={item.length}>
                        {item}
                    </Border>
                );
            })}
        </Container>
    );
}
export default ProfileSelectedBorder;

const Container = styled.div`
    width:310px;
    height:30px;
    margin:0 auto;
    display: flex;
    flex-wrap: nowrap;
    overflow-x:auto;
    overflow-y: hidden;
    justify-content: flex-start; 
    margin-bottom: 30px;
    gap:10px;
    &::-webkit-scrollbar {
    display: none;
}
`;
const Border = styled.div<{ $length: number}>`
    color:black;
    font-size:13px;
    font-weight:400;
    text-align:center;
    line-height:28px;
    width: ${({ $length }: { $length: number }) => ($length > 0 ? `${$length*13}px` : "60px")};
    height:28px;
    border: 1px solid #1B98FF;
    background-color: #ECF6FF;
    border-radius:100px;
    white-space: nowrap;
    padding: 0 10px;
`;
const ImgBorder = styled.img`
    width:28px;
    height:28px;
    border: 1px solid #1B98FF;
    border-radius:100px;
`;