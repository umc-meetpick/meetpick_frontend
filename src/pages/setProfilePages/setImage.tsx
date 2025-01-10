import React from "react"
import SetProfileNavbar from '../../components/SetProfileNavbar';
import ProgressBar from '../../components/ProgressBar';
import styled from "styled-components";
import MoveNextRoundBtn from "../../components/MoveNextRoundBtn";
import profile1 from "../../assets/profileImg/프로필1.png";
import profile2 from "../../assets/profileImg/프로필2.png";
import profile3 from "../../assets/profileImg/프로필3.png";

const SetImage = () =>{
    return(
        <>
            <SetProfileNavbar/>
            <ProgressBar progress={28}/>
            <Container>
                <Title>원하는 프로필을 선택하세요!</Title>
                <ImageWrapper>
                    <ProfileRound src={profile1} alt="프로필1"/>
                    <ProfileRound src={profile2} alt="프로필2"/>
                    <ProfileRound src={profile3} alt="프로필3"/>
                    <ProfileRound src={profile1} alt="프로필1"/>
                    <ProfileRound src={profile2} alt="프로필2"/>
                    <ProfileRound src={profile3} alt="프로필3"/>
                </ImageWrapper>
                <MoveNextRoundBtn nextPage={"/setProfile/studentNum"}/>
            </Container>
        </>
    )
}
export default SetImage

const Container = styled.div`
    margin-top:100px;
    margin: 0 auto;
    height:calc(100vh - 240px)
    border:1px solid red;
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
const ImageWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    grid-template-rows: repeat(2, auto); 
    gap:10px;
    margin-top:40px;
`;
const ProfileRound = styled.img`
    width:80px;
    height:80px;
    border:1px solid #CECECE;
    border-radius:100px;
`;