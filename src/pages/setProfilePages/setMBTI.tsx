import React, { useState, useContext} from "react"
import SetProfileNavbar from '../../components/navbar/BasicNavbar';
import ProgressBar from '../../components/progressbar/ProgressBar';
import styled from "styled-components";
import MoveNextRoundBtn from "../../components/button/MoveNextRoundBtn";
import { ProfileInfoContext } from '../../context/profileInfoContext';
import ProfileSelectedBorder from "../../components/profileSelectedBorder";
import RadioWrapper from "../../components/RadioWrapper";

const SetMBTI = () =>{
    const {nickname, image, studentNum, mbti} = useContext(ProfileInfoContext);
    return(
        <>
            <SetProfileNavbar title={"프로필 작성"}/>
            <ProgressBar progress={55}/>
            <ProfileSelectedBorder input={[nickname,image,studentNum]}/>
            <Container>
                <Title>MBTI를 알려주세요!</Title>
                <RadioGrid>
                    <RadioWrapper title="E" explain="외향형" name="EI" left={true}/>
                    <RadioWrapper title="I" explain="내향형" name="EI"/>
                    <RadioWrapper title="S" explain="감각형" name="SN" left={true}/>
                    <RadioWrapper title="N" explain="직관형" name="SN"/>
                    <RadioWrapper title="T" explain="사고형" name="TF" left={true}/>
                    <RadioWrapper title="F" explain="감정형" name="TF"/>
                    <RadioWrapper title="J" explain="판단형" name="JP" left={true}/>
                    <RadioWrapper title="P" explain="인식형" name="JP"/>
                </RadioGrid>
                {mbti.length === 4 && 
                    <MbtiWrapper>
                        <Mbti>{mbti}</Mbti><Title> 메이트시군요!</Title>
                    </MbtiWrapper>
                }
                <MoveNextRoundBtn nextPage={"/setProfile/major"} />
            </Container>
        </>
    )
}
export default SetMBTI;

const Container = styled.div`
    margin-top:100px;
    margin: 0 auto;
    height:calc(100vh - 240px)
`;
const Title = styled.div`
    font-size:21px;
    font-weight:700;
    color:black;
    width:302px;
    height:23px;
    line-height:23px;
`;
const RadioGrid = styled.div`
    width:230px;
    height:289px;
    margin:0 auto;
    display:grid;
    grid-template-columns: repeat(2, 1fr); 
    grid-template-rows: repeat(4, auto); 
    gap:10px;
    margin-top:40px;
`;
const MbtiWrapper = styled.div`
    width:190px;
    height:23px;
    display:flex;
    text-align:center;
    margin: 40px auto;
`;
const Mbti = styled.div`
    font-size:21px;
    font-weight:700;
    color:#007AFF;
    height:23px;
    line-height:23px;
`;