import React from "react";
import styled from "styled-components";

// 스타일드 컴포넌트 정의


const MeetPick = styled.p`
    color: transparent;
    font-family: "Playpen Sans", Helvetica, sans-serif;
    font-size: 20px;
    font-weight: 400;
    height: 24px;
    left: 0;
    letter-spacing: 0;
    line-height: 24px;
    top: 0;
    white-space: nowrap;
`;

const TextWrapper = styled.span`
    color: #000000;
    font-weight: 700;
`;

const Span = styled.span`
    color: #007aff;
    font-weight: 700;
`;

const TextWrapper2 = styled.span`
    color: #007aff;
    font-family: "Sansita One", Helvetica, sans-serif;
`;

export const MeetPickText = (): JSX.Element => {
    return (
        <MeetPick>
                <TextWrapper>Meet</TextWrapper>
                <Span>P</Span>
                <TextWrapper2>!</TextWrapper2>
                <Span>ck</Span>
        </MeetPick>
    );
};
