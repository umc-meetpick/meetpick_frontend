import React from 'react';
import SetProfileNavbar from '../../components/SetProfileNavbar';
import ProgressBar from '../../components/ProgressBar';
import styled from 'styled-components';

const SetNickName = () => {
    return (
        <>
            <SetProfileNavbar/>
            <ProgressBar progress={20}/>
            <Container>
                <h1>닉네임 설정 페이지</h1>
            </Container>
        </>
    );
};

export default SetNickName;

const Container = styled.div`
`;