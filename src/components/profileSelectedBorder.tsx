import React from "react";
import styled from "styled-components";

interface SelectedProps {
    input: string; 
}

const ProfileSelectedBorder:React.FC<SelectedProps> = ({input}) =>{
    return(
        <Container>
            <Border length={input.length}>{input}</Border>
        </Container>
    );
}
export default ProfileSelectedBorder;

const Container = styled.div`
    width:310px;
    height:60px;
    margin:0 auto;
    display: flex;
    justify-content: flex-start; 
`;
const Border = styled.div<{ length: number }>`
    color:black;
    font-size:13px;
    font-weight:400;
    text-align:center;
    line-height:28px;
    width: ${({ length }: { length: number }) => (length > 0 ? `${length * 10 + 40}px` : "60px")};
    height:28px;
    border: 1px solid #1B98FF;
    background-color: #ECF6FF;
    border-radius:100px;
`;