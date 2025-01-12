import React, { useContext } from "react";
import styled from "styled-components";
import SetProfileNavbar from '../../components/BasicNavbar';
import ProgressBar from '../../components/ProgressBar';
import { ProfileInfoContext } from '../../context/profileInfoContext';
import ProfileSelectedBorder from "../../components/profileSelectedBorder";
import hobbyList from "../../assets/hobbyList";
import MoveNextRoundBtn from "../../components/MoveNextRoundBtn";

const SetHobby = () =>{
    const {nickname, image, studentNum, mbti, major, hobby, setHobby} = useContext(ProfileInfoContext);
    const handleChoose = (content:string) =>{
        if (hobby.includes(content)){
            setHobby(hobby.filter(h => h !== content));
        }else if(hobby.length<3){
            setHobby([... hobby, content])
        }
    };
    return(
        <>
            <SetProfileNavbar title={"프로필 작성"}/>
            <ProgressBar progress={85}/>
            <ProfileSelectedBorder input={[nickname,image,studentNum,mbti, major]}/>
            <Container>
                <Title>취미를 선택해주세요(3개까지)</Title>
                <HobbyWrapper>
                    {hobbyList.map((content,index)=>(
                        <Border 
                            key={index} 
                            $length={content.length} 
                            onClick={()=>handleChoose(content)}
                            $isSelected={hobby.includes(content)}
                        >
                            {content}
                        </Border>
                    ))
                    }
                </HobbyWrapper> 
                <MoveNextRoundBtn nextPage={"/setProfile/contect"} />
            </Container>
        </>
    )
}
export default SetHobby;

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
const HobbyWrapper = styled.div`
    width:100%;
    margin-top:30px;
    padding-left:15px;
    display:flex;
    flex-wrap: wrap;
    gap:10px;
`;
const Border = styled.button<{ $length: number, $isSelected:boolean}>`
    color: ${({$isSelected})=> $isSelected ? "#007AFF" : "black"};
    font-size:13px;
    font-weight:400;
    align-items: center;
    text-align:center;
    padding:0;
    width: ${({ $length }: { $length: number }) => ($length > 0 ? `${$length * 10 + 20}px` : "60px")};
    height:28px;
    border: ${({$isSelected})=> $isSelected ? "1px solid #007AFF" : "1px solid #CECECE"};
    background-color: #FFFFFF;
    border-radius:100px;
    &:focus {
        border: ${({$isSelected})=> $isSelected ? "1px solid #007AFF" : "1px solid #CECECE"};
        outline: none;
    }
`;