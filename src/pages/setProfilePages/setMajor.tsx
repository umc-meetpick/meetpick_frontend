import React, { useContext } from "react";
import styled from "styled-components";
import SetProfileNavbar from '../../components/BasicNavbar';
import ProgressBar from '../../components/ProgressBar';
import MoveNextRoundBtn from "../../components/MoveNextRoundBtn";
import { ProfileInfoContext } from '../../context/profileInfoContext';
import ProfileSelectedBorder from "../../components/profileSelectedBorder";

const SetMajor = () =>{
    const {nickname, image, studentNum, mbti, setMajor} = useContext(ProfileInfoContext);
    return(
        <>
            <SetProfileNavbar title={"프로필 작성"}/>
            <ProgressBar progress={40}/>
            <ProfileSelectedBorder input={[nickname,image,studentNum,mbti]}/>
            <Container>
                <Title>전공을 선택해주세요</Title>
                <MoveNextRoundBtn nextPage={"/setProfile/hobby"}/>
            </Container>
        </>
    )
}
export default SetMajor;

const Container = styled.div`
    margin-top:100px;
    margin: 0 auto;
    height:calc(100vh - 240px)
    border:1px solid red;
`;
const Title = styled.div`
    font-size:21px;
    font-weight:700;
    color:black;
    width:302px;
    height:23px;
    line-height:23px;
`;