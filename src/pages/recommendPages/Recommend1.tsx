import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const Recommend = () => {
    return (
        <>
            <Top>
                <Title>혼밥 구제 MATE</Title>
                <BellIcon icon="ci:bell" width="24" height="24" />
            </Top>
            <Message>
                <Name>베티</Name>
                <Comment>님을 원하는 혼밥 메이트를 찾아보세요😉</Comment>
            </Message>
        </>
    );
};

export default Recommend;

const Top = styled.div`
    display: flex;
    justify-content: center; /* 중앙 정렬 */
    align-items: center; /* 수직 정렬 */
    position: relative; /* 아이콘의 절대 위치를 설정하기 위해 추가 */
    padding: 25px 20px; /* 여백 설정 */
    font-size: 17px;
    font-weight: bold;
`;

const Title = styled.p`
    font-weight: bold;
    font-size: 17px;
    color: #000;
    margin: 0; /* 여백 제거 */
`;

const BellIcon = styled(Icon)`
    position: absolute; /* 절대 위치 설정 */
    right: 20px; /* 오른쪽 여백 설정 */
    color: #000;
`;

const Message = styled.p`
    display:flex;
    padding-left:30px;
    font-size:14px;
    margin:5px;
`
const Name = styled.p`
    font-weight:bold;
    margin:5px 0;
`
const Comment = styled.p `
    margin:5px 0;

`