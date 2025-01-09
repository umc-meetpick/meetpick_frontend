import React from 'react';
import styled from 'styled-components';
import { IoChevronBackOutline } from "react-icons/io5";

const SetProfileNavbar = () =>{
    return(
        <Container>
            <IoChevronBackOutline />
            <div>프로필 작성</div>
        </Container>
    )
}
export default SetProfileNavbar

const Container = styled.div`
    width:393px;
    height:60px;
`;