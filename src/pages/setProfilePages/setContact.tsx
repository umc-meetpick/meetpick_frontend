import React, { useState, useContext } from 'react';
import SetProfileNavbar from '../../components/BasicNavbar';
import ProgressBar from '../../components/ProgressBar';
import styled from 'styled-components';
import GrayBottomInput from '../../components/GrayBottomInput';
import MoveNextRoundBtn from "../../components/MoveNextRoundBtn"
import { ProfileInfoContext } from '../../context/profileInfoContext';
import ProfileSelectedBorder from '../../components/profileSelectedBorder';
import SelectToggle from '../../components/SelectToggle';

const SetContact= () => {
    const {nickname, image, studentNum, mbti, major, hobby, setContactType, setContact} = useContext(ProfileInfoContext);
    const [inputValue, setInputValue] = useState("");
    const options = ["카카오톡 ID", "오픈채팅 링크", "전화번호"]

    const handleSelectChange = (selectedOption: { value: string; label: string } | null)  => {
        if (selectedOption) {
            setContactType(selectedOption.value);
        }
    };
    return (
        <>
            <SetProfileNavbar title={"프로필 작성"}/>
            <ProgressBar progress={100}/>
            <ProfileSelectedBorder input={[nickname,image,studentNum,mbti, major, ...hobby]}/>
            <Container>
                <Title>
                    매칭 시 상대에게 전달할<br/>
                    연락수단을 작성해주세요!
                </Title>
                <SelectToggle options={options} onChange={handleSelectChange}/>
                <Space/>
                <GrayBottomInput
                    value={inputValue} 
                    onChange={(e)=>setInputValue(e.target.value)} 
                />
                <MoveNextRoundBtn nextPage={"/"} title="메이트 찾으러 가기" onClick={()=>{setContact(inputValue)}}/>
            </Container>
        </>
    );
};

export default SetContact;

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
    margin-top:30px;
    margin-bottom:60px;
`;
const Space = styled.div`
    height:80px;
`;