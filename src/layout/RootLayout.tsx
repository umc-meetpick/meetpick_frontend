import React from 'react';
import {Outlet} from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from "../components/navbar/BottomNavBar";

const Main=styled.div`
    width:393px;
    height:100vh;
    height: calc(var(--vh, 1vh) * 100);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const RootLayout = () => {
    return (
        <Main>
            <Outlet/>
            <BottomNavBar/>
        </Main>
    );
};

export default RootLayout;
