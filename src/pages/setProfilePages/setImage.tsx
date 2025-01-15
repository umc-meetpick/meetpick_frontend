import { useContext} from "react"
import SetProfileNavbar from '../../components/navbar/BasicNavbar';
import ProgressBar from '../../components/progressbar/ProgressBar';
import styled from "styled-components";
import MoveNextRoundBtn from "../../components/button/MoveNextRoundBtn";
import profile1 from "../../assets/profileImg/프로필1.png";
import profile2 from "../../assets/profileImg/프로필2.png";
import profile3 from "../../assets/profileImg/프로필3.png";
import { ProfileInfoContext } from '../../context/profileInfoContext';
import ProfileSelectedBorder from "../../components/profileSelectedBorder";

const SetImage = () =>{
    const {nickname, setImage, imgNum, setImgNum} = useContext(ProfileInfoContext);
    const handleSelected = (num:number, profile:string) =>{
        setImgNum(num);
        setImage(profile);
    }
    return(
        <>
            <SetProfileNavbar title={"프로필 작성"}/>
            <ProgressBar progress={28}/>
            <ProfileSelectedBorder input={[nickname]}/>
            <Container>
                <Title>원하는 프로필을 선택하세요!</Title>
                <ImageWrapper>
                    <ProfileRound src={profile1} alt="프로필1" $isSelected={1==imgNum} onClick={()=>handleSelected(1, profile1)}/>
                    <ProfileRound src={profile2} alt="프로필2" $isSelected={2==imgNum} onClick={()=>handleSelected(2, profile2)}/>
                    <ProfileRound src={profile3} alt="프로필3" $isSelected={3==imgNum} onClick={()=>handleSelected(3, profile3)}/>
                    <ProfileRound src={profile1} alt="프로필1" $isSelected={4==imgNum} onClick={()=>handleSelected(4, profile1)}/>
                    <ProfileRound src={profile2} alt="프로필2" $isSelected={5==imgNum} onClick={()=>handleSelected(5, profile2)}/>
                    <ProfileRound src={profile3} alt="프로필3" $isSelected={6==imgNum} onClick={()=>handleSelected(6, profile3)}/>
                </ImageWrapper>
            </Container>
            <MoveNextRoundBtn nextPage={"/setProfile/studentNum"}/>
        </>
    )
}
export default SetImage

const Container = styled.div`
    margin-top:100px;
    margin: 0 auto;
    width:320px;
    height:300px;
`;
const Title = styled.div`
    font-size:21px;
    font-weight:700;
    color:black;
    width:302px;
    height:23px;
    line-height:23px;
`;
const ImageWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    grid-template-rows: repeat(2, auto); 
    gap:10px;
    margin-top:40px;
`;
const ProfileRound = styled.img<{$isSelected: boolean}>`
    width:80px;
    height:80px;
    border:${({$isSelected}) => ($isSelected ? "1px solid #007AFF" : "1px solid #CECECE")};
    border-radius:100px;
`;