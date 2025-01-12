import React from 'react';
import {Outlet} from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from "../components/navbar/BottomNavBar";

const Main = styled.div`
    width: 393px;
    height: calc(var(--vh, 1vh) * 100); /* 전체 화면 */
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    overflow: hidden; /* 전체 화면에서 스크롤 겹침 방지 */
`;

const Content = styled.div`
    flex: 1; /* 남은 공간을 채움 */
    overflow-y: auto; /* 세로 스크롤 활성화 */
`;

const RootLayout = () => {
    return (
        <Main>
            <Content>
                <Outlet />
            </Content>
            <BottomNavBar />
        </Main>
    );
};


export default RootLayout;