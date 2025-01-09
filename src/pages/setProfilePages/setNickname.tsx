import React from 'react';
import SetProfileNavbar from '../../components/SetProfileNavbar';
import ProgressBar from '../../components/ProgressBar';
import styled from 'styled-components';

const SetNickName = () => {
    return (
        <>
            <SetProfileNavbar/>
            <ProgressBar progress={14}/>
            <Container>
                <Title>
                    사용하고 싶은 닉네임을<br/>
                    입력해주세요!
                </Title>
                <SubInfo>공백 제외 한글, 영문 10자까지 가능</SubInfo>
            </Container>
        </>
    );
};

export default SetNickName;

const Container = styled.div`
    margin-top:100px;
    border:1px solid red;
    margin: 0 auto;
`;
const Title = styled.div`
    margin-top:60px;
    font-size:21px;
    font-weight:700;
    color:black;
    width:302px;
    height:23px;
    line-height:23px;
    margin-top:60px;
`;
const SubInfo = styled.div`
    margin-top:40px;
    width:300px;
    height:23px;
    font-size:14px;
    color:#838383;
`;