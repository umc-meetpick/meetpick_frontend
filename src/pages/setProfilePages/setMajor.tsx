import React, { useContext } from "react";
import styled from "styled-components";
import SetProfileNavbar from '../../components/BasicNavbar';
import ProgressBar from '../../components/ProgressBar';
import { ProfileInfoContext } from '../../context/profileInfoContext';
import ProfileSelectedBorder from "../../components/profileSelectedBorder";
import ToggleList from "../../components/ToggleList";

const SetMajor = () =>{
    const {nickname, image, studentNum, mbti} = useContext(ProfileInfoContext);
    return(
        <Wrapper>
            <SetProfileNavbar title={"프로필 작성"}/>
            <ProgressBar progress={70}/>
            <ProfileSelectedBorder input={[nickname,image,studentNum,mbti]}/>
            <Container>
                <Title>전공을 선택해주세요</Title>
                <ToggleList/>
            </Container>
        </Wrapper>
    )
}
export default SetMajor;

const Wrapper = styled.div`
    width:100%;
    height:calc(100vh - 100px);
    overflow-y: auto;
`;
const Container = styled.div`
    width:302px;
    margin: 0 auto;
    position: relative;
`;
const Title = styled.div`
    font-size:21px;
    font-weight:700;
    color:black;
    width:302px;
    height:23px;
    line-height:23px;
`;