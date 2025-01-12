import React, { useState, useContext} from "react"
import SetProfileNavbar from '../../components/navbar/BasicNavbar';
import ProgressBar from '../../components/progressbar/ProgressBar';
import styled from "styled-components";
import MoveNextRoundBtn from "../../components/button/MoveNextRoundBtn";
import { ProfileInfoContext } from '../../context/profileInfoContext';
import ProfileSelectedBorder from "../../components/profileSelectedBorder";
import GrayBottomInput from "../../components/GrayBottomInput";

const SetStudentNum = () =>{
    const [inputValue, setInputValue] = useState("");
    const {nickname, image, studentNum, setStudentNum} = useContext(ProfileInfoContext);
    return(
        <>
            <SetProfileNavbar title={"프로필 작성"}/>
            <ProgressBar progress={40}/>
            <ProfileSelectedBorder input={[nickname,image]}/>
            <Container>
                <Title>학번을 입력해주세요</Title>
                <SubInfo>숫자만 입력해주세요! ex) 22학번 → 22</SubInfo>
                <GrayBottomInput value={inputValue || String(studentNum).slice(0, 2)} onChange={(e)=>{setInputValue(e.target.value)}}/>
                <MoveNextRoundBtn nextPage={"/setProfile/mbti"} onClick={()=>{setStudentNum(inputValue+"학번")}}/>
            </Container>
        </>
    )
}
export default SetStudentNum;

const Container = styled.div`
    margin-top:100px;
    margin: 0 auto;
    width:320px;
    height:calc(100vh - 240px);
`;
const Title = styled.div`
    font-size:21px;
    font-weight:700;
    color:black;
    width:302px;
    height:23px;
    line-height:23px;
`;
const SubInfo = styled.div`
    margin-top:20px;
    width:300px;
    height:23px;
    font-size:14px;
    color:#838383;
    margin-bottom:40px;
`;