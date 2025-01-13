import React, { useState } from "react";
import styled from "styled-components";
import BlueRadio from "./BlueRadio";

interface radioProps {
    title:string;
    explain:string;
    name:string;
    left?:boolean;
}

const RadioWrapper: React.FC<radioProps> = ({title, explain, name, left}) =>{
    if (left){
        return(
            <Wrapper $left={left}>
                <OptionWrapper>
                    <Title>{title}</Title>
                    <Explain>{explain}</Explain>
                </OptionWrapper>
                <BlueRadio 
                    title={title} 
                    name={name} 
                />
            </Wrapper>
        )
    }
    return(
        <Wrapper $left={false}>
            <BlueRadio 
                    title={title} 
                    name={name} 
            />
            <OptionWrapper>
                <Title>{title}</Title>
                <Explain>{explain}</Explain>
            </OptionWrapper>
        </Wrapper>
    )
}
export default RadioWrapper;

const Wrapper = styled.div<{$left:boolean}>`
    display:flex;
    align-items: center;  
    justify-content: ${({$left})=>$left ? "left" : "right"};
    gap:5px;
`;
const OptionWrapper = styled.div`
    width:45px;
    height:46px;
    display: flex;
    flex-direction: column;
    align-items: center;  
    justify-content: center;
    text-align: center;
`;
const Title = styled.div`
    font-size:21px;
    font-weight:700;
    color:black;
    width:302px;
    height:23px;
    line-height:23px;
`;
const Explain = styled.div`
    font-size:15px;
`;