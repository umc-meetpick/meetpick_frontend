import React, { useState, useContext } from 'react';
import SetProfileNavbar from '../../components/navbar/BasicNavbar';
import ProgressBar from '../../components/progressbar/ProgressBar';
import styled from 'styled-components';
import GrayBottomInput from '../../components/GrayBottomInput';
import { PiWarningCircle } from "react-icons/pi";
import { FaRegCircleCheck } from "react-icons/fa6";
import MoveNextRoundBtn from "../../components/button/MoveNextRoundBtn"
import { ProfileInfoContext } from '../../context/profileInfoContext';

const SetNickName: React.FC = () => {
    const [inputValue, setInputValue] = useState("");
    const [btnClicked, setBtnClicked] =useState(false)
    const [isDupilicate, setIsDupilicate] = useState(false)
    const {nickname, setNickName} = useContext(ProfileInfoContext);
    const handleDupilicate = () =>{
        setBtnClicked(true)
        if(!isDupilicate){
            setNickName(inputValue);
        }
    }
    return (
        <>
            <SetProfileNavbar title={"프로필 작성"}/>
            <ProgressBar progress={14}/>
            <Container>
                <Title>
                    사용하고 싶은 닉네임을<br/>
                    입력해주세요!
                </Title>
                <SubInfo>공백 제외 한글, 영문 10자까지 가능</SubInfo>
                <GrayBottomInput
                    value={inputValue||nickname} 
                    onChange={(e)=>setInputValue(e.target.value)} 
                />
                <DupilicateBtn onClick={handleDupilicate}>중복확인</DupilicateBtn>
                {btnClicked && (
                    isDupilicate ? (
                        <Warning $isRed={isDupilicate}>
                            <PiWarningCircle color={"#DB1818"} style={{ marginTop: "5px"}}/>
                            <div>이미 존재하는 닉네임입니다.</div>
                        </Warning>
                    ):(
                        <Warning $isRed={isDupilicate}>
                            <FaRegCircleCheck color={"#007AFF"} style={{ marginTop: "5px"}}/>
                            <div>사용 가능한 닉네임입니다.</div>
                        </Warning>
                    )
                )}
                <MoveNextRoundBtn nextPage={"/setProfile/image"}/>
            </Container>
        </>
    );
};

export default SetNickName;

const Container = styled.div`
    margin-top:100px;
    margin: 0 auto;
    width:320px;
    height:calc(100vh - 240px);
`;
const Title = styled.div`
    margin-top:60px;
    font-size:21px;
    font-weight:700;
    color:black;
    width:302px;
    height:23px;
    line-height:23px;
`;
const SubInfo = styled.div`
    margin-top:40px;
    width:300px;
    height:23px;
    font-size:14px;
    color:#838383;
    margin-bottom:40px;
`;
const DupilicateBtn = styled.button`
    width:75px;
    height:28px;
    color:#838383;
    font-size:14px;
    font-weight:400;
    line-height:16.71px;
    border: 1px solid #E5E5E5;
    border-radius: 22px;
    background-color:white;
    padding:0px;
    position:relative;
    left:220px;
    top:-40px;
    &:focus {
        border: 1px solid #E5E5E5;
        outline: none;
    }
`;
const Warning = styled.div<{ $isRed?: boolean }>`
    margin-top:10px;
    display:flex;
    font-size:14px;
    width:200px;
    height:24px;
    line-height:24px;
    div{
        margin-left:5px;
        color:${({$isRed})=>($isRed ? "#DB1818" : "black")};
    }
`;