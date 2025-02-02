import { useContext } from "react";
import styled from "styled-components";
import SetProfileNavbar from '../../components/navbar/BasicNavbar';
import ProgressBar from '../../components/progressbar/ProgressBar';
import { ProfileInfoContext } from '../../context/profileInfoContext';
import ProfileSelectedBorder from "../../components/profileSelectedBorder";
import ToggleList from "../../components/ToggleList";

const SetMajor = () =>{
    const {nickname, image, studentNum, mbti} = useContext(ProfileInfoContext);
    const stdnum = String(studentNum)+"학번";
    return(
        <Wrapper>
            <SetProfileNavbar title={"프로필 작성"}/>
            <ProgressBar progress={70}/>
            <ProfileSelectedBorder input={[nickname,image,stdnum,mbti]}/>
            <Container>
                <Title>전공을 선택해주세요</Title>
                <ToggleList button={true}/>
            </Container>
        </Wrapper>
    )
}
export default SetMajor;

const Wrapper = styled.div`
    width: 100%;
    min-height: calc(100vh - 100px); 
    font-family: "Pretendard Variable";
`;
const Container = styled.div`
    width:302px;
    min-height: calc(100vh - 300px);
    margin: 0 auto;
`;
const Title = styled.div`
    font-size:21px;
    font-weight:700;
    color:black;
    width:302px;
    height:23px;
    line-height:23px;
`;